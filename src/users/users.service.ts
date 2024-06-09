import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import User from './types/user';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel('users') private usersModel: Model<User>) {}

    async createUser(user: CreateUserDto) {
        return (await this.usersModel.create(user)).populate('committee');
    }

    async getUsers(id?: string, year?: string): Promise<User[]> {
        let filter: FilterQuery<User> = {};

        if (id) {
            const user = (await this.usersModel.findById(id)).populated(
                'committee',
            );
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

        return await this.usersModel.find({ filter }).populate('committee');
    }

    async updateUser(targetUserId: string, update: Partial<User>) {
        const user = await this.usersModel
            .findByIdAndUpdate(targetUserId, update, { new: true })
            .populate('committee');

        if (!user) {
            throw NotFoundException;
        }

        return user;
    }

    async deleteUser(targetUserId: string) {
        let user = await this.usersModel.findByIdAndDelete(targetUserId);
        if (!user) {
            throw NotFoundException;
        }
        return user;
    }
}
