import { InjectModel } from '@nestjs/mongoose';
import { Committee } from './types/committee';
import { FilterQuery, Model } from 'mongoose';
import { CreateCommitteeDto } from './dto/inbound/create-committee.dto';
import { UpdateCommitteeDto } from './dto/inbound/update-committee.dto';
import { Logger } from '@nestjs/common';

export class CommitteesService {
    private logger = new Logger('committees');
    constructor(
        @InjectModel('Committee') private committeesModel: Model<Committee>,
    ) {}

    async createCommittee(committee: CreateCommitteeDto) {
        return await this.committeesModel.create(committee);
    }

    async getCommittees(id?: string, year?: string): Promise<Committee[]> {
        let filter: FilterQuery<Committee> = {};

        if (id) {
            return [await this.committeesModel.findById(id).lean()];
        }

        /**
         * Year coming from the query string
         * and used to filter committees by season.
         */
        if (year) {
            this.logger.debug(`Getting all committees in year ${year}`);
            filter = {
                createdAt: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                },
            };
        }

        return await this.committeesModel.find(filter).lean();
    }

    async updateCommittee(
        targetCommitteeId: string,
        update: UpdateCommitteeDto,
    ) {
        return await this.committeesModel.findByIdAndUpdate(
            targetCommitteeId,
            update,
            {
                new: true,
            },
        );
    }

    async deleteCommittee(targetCommitteeId: string) {
        return await this.committeesModel.findByIdAndDelete(targetCommitteeId);
    }
}
