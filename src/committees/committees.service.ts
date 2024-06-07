import { InjectModel } from '@nestjs/mongoose';
import { Committee } from './types/committee';
import { FilterQuery, Model } from 'mongoose';
import { CreateCommitteeDto } from './dto/create-committee.dto';
import { UpdateCommitteeDto } from './dto/update-committee.dto';

export class CommitteesService {
    constructor(
        @InjectModel('committees') private committeesModel: Model<Committee>,
    ) {}

    async createCommittee(committee: CreateCommitteeDto) {
        return await this.committeesModel.create(committee);
    }

    async getCommittees(id?: string, year?: string): Promise<Committee[]> {
        let filter: FilterQuery<Committee> = {};

        if (id) {
            return [await this.committeesModel.findById(id)];
        }

        /**
         * Year coming from the query string
         * and used to filter committees by season.
         */
        if (year) {
            filter = {
                created_at: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                },
            };
        }

        return await this.committeesModel.find(filter);
    }

    async updateCommittee(
        targetCommitteeId: string,
        update: Partial<Committee>,
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
