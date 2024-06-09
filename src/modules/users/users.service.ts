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

    async getUsers(id?: string, year?: string): Promise<User[]> {
        let filter: FilterQuery<User> = {};

        if (id) {
            const user = (await this.usersModel.findById(id))
                .populated('committee')
                .lean();
            if (!user) {
                throw NotFoundException;
            }
            return user;
        }

        /**
         * Year coming from the query string
         * and used to filter users by season.
         */
        if (year) {
            filter = {
                createdAt: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                },
            };
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
            throw NotFoundException;
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
