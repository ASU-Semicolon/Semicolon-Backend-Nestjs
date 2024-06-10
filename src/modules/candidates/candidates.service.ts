import { InjectModel } from '@nestjs/mongoose';
import { Candidate } from './types/candidate';
import { FilterQuery, Model } from 'mongoose';
import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { Enums } from 'src/types/enums';

export class CandidatesService {
    private logger = new Logger('CandidatesService');

    constructor(
        @InjectModel('Candidate') private candidateModel: Model<Candidate>,
    ) {}

    async createCandidate(
        candidate: Omit<Candidate, 'evaluation' | 'acceptance_status'>,
    ) {
        this.logger.debug(
            `Creating candidate with data ${JSON.stringify(candidate, null, 4)}`,
        );
        const createdCandidate = this.candidateModel.create(candidate);
        return createdCandidate;
    }

    async getCandidates(
        type?: Enums.CandidateType,
        id?: string,
        event?: string,
    ) {
        let filter: FilterQuery<Candidate> = {};

        if (id) {
            /**
             * In this case the user asks for a specific candidate.
             */
            this.logger.debug(`Getting candidate with id ${id}`);
            let candidate = [
                await this.candidateModel
                    .findById(id)
                    .populate({
                        path: 'evaluation.interviewer',
                        populate: {
                            path: 'committee',
                        },
                    })
                    .lean(),
            ];
            if (candidate.length === 0) {
                throw new NotFoundException('Candidate not found');
            }
            this.logger.debug(
                `Candidate found: ${JSON.stringify(candidate, null, 4)}`,
            );
            return candidate;
        }

        if (event && type) {
            /**
             * In this case the user asks for all candidates in a specific event.
             */
            this.logger.debug(`Getting all candidates in event ${event}`);
            filter = {
                event,
                type,
            };
        }

        return await this.candidateModel
            .find(filter)
            .populate({
                path: 'evaluation.interviewer',
                populate: {
                    path: 'committee',
                },
            })
            .lean();
    }

    async updateCandidate(id: string, candidate: Partial<Candidate>) {
        return await this.candidateModel
            .findByIdAndUpdate(id, candidate, {
                new: true,
            })
            .populate({
                path: 'evaluation.interviewer',
                populate: {
                    path: 'committee',
                },
            })
            .lean();
    }

    async deleteCandidate(id: string) {
        return await this.candidateModel.findByIdAndDelete(id).lean();
    }
}
