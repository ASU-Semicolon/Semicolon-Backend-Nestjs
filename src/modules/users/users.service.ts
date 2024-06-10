import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import User from './types/user';
import { CreateUserDto } from './dto/inbound/create-user.dto';

@Injectable()
export class UsersService {
    private logger = new Logger('UsersService');

    constructor(@InjectModel('User') private usersModel: Model<User>) {}

    async createUser(user: CreateUserDto) {
        const createdUser = (await this.usersModel.create(user)).populate(
            'committee',
        );
        return createdUser;
    }

    async getUsers(id?: string, season?: string): Promise<User[]> {
        let filter: FilterQuery<User> = {};

        if (id) {
            const user = await this.usersModel
                .findById(id)
                .populate('committee')
                .lean();
            if (!user) {
                throw new NotFoundException('User not found');
            }
            return [user];
        }

        /**
         * Season coming from the query string
         * and used to filter users by season.
         */
        if (season) {
            filter.season = season;
        }

        const result = await this.usersModel
            .find(filter)
            .populate('committee')
            .lean();

        this.logger.debug(result);
        return result;
    }

    async updateUser(targetUserId: string, update: Partial<User>) {
        const user = await this.usersModel
            .findByIdAndUpdate(targetUserId, update, { new: true })
            .populate('committee')
            .lean();

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async deleteUser(targetUserId: string) {
        let user = await this.usersModel.findByIdAndDelete(targetUserId).lean();
        if (!user) {
            throw NotFoundException;
        }
        return user;
    }
}
