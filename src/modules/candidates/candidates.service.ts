import { InjectModel } from '@nestjs/mongoose';
import { Candidate } from './types/candidate';
import { FilterQuery, Model } from 'mongoose';
import { Logger, NotFoundException } from '@nestjs/common';
import { Enums } from 'src/types/enums';
import { UpdateCandidateDto } from './dto/inbound/update-candidate.dto';
import { Evaluation } from './types/evaluation';

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

        if (type) {
            /**
             * In this case the user asks for candidates of a specific type.
             * This is a main entry point to the `filter`, if not provided
             *  the filter will be empty and all candidates will be returned.
             * So even if the user provides `event` only the filter will be empty.
             */
            filter.type = type;

            /**
             * If the user also provides an event.
             * The filter will be updated to include the event,
             * only if the type was provided.
             */
            if (event) {
                filter.event = event;
            }
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

    async updateCandidate(
        id: string,
        candidate: UpdateCandidateDto,
        initiator: string,
    ) {
        if (candidate?.evaluation?.notes) {
            const evaluation: Evaluation = {
                notes: candidate.evaluation.notes,
                interviewer: initiator,
                date: new Date(),
            };
            candidate.evaluation =
                evaluation as UpdateCandidateDto['evaluation'];
        }
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
