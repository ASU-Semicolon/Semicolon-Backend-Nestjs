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

    async getCommittees(id?: string, season?: string): Promise<Committee[]> {
        let filter: FilterQuery<Committee> = {};

        if (id) {
            return [await this.committeesModel.findById(id).lean()];
        }

        /**
         * Season coming from the query string
         * and used to filter committees by season.
         */
        if (season) {
            this.logger.debug(`Getting all committees in season ${season}`);
            filter.season = season;
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
