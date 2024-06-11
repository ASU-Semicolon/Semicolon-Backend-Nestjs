import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Workshop } from './types/workshop';
import { Logger } from '@nestjs/common';
import { CreateWorkshopDto } from './dto/inbound/create-workshop.dto';
import { UpdateWorkshopDto } from './dto/inbound/update-workshop.dto';

export class WorkshopsService {
    private logger = new Logger('WorkshopsService');
    constructor(
        @InjectModel('Workshop') private workshopModel: Model<Workshop>,
    ) {}

    async createWorkshop(workshop: CreateWorkshopDto) {
        this.logger.log('Creating a new workshop');
        return await this.workshopModel.create(workshop);
    }

    async getWorkshops(id?: string, season?: string): Promise<Workshop[]> {
        let filter: FilterQuery<Workshop> = {};

        if (id) {
            this.logger.log(`Getting workshop with id ${id}`);
            /**
             * In this case the user asks for a single workshop.
             */
            return [
                await this.workshopModel
                    .findById(id)
                    .populate('instructor committee')
                    .lean(),
            ];
        }

        if (season) {
            this.logger.log(`Getting all workshops in season ${season}`);
            /**
             * In this case the user asks for all workshops in a specific season.
             */
            filter.season = season;
        }

        return await this.workshopModel
            .find(filter)
            .populate('instructor committee')
            .lean();
    }

    async updateWorkshop(id: string, update: UpdateWorkshopDto) {
        this.logger.log(`Updating workshop with id ${id}`);
        return await this.workshopModel.findByIdAndUpdate(id, update, {
            new: true,
        });
    }

    async deleteWorkshop(id: string) {
        this.logger.log(`Deleting workshop with id ${id}`);
        return await this.workshopModel.findByIdAndDelete(id);
    }
}
