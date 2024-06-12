import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import User from './types/user';
import { CreateUserDto } from './dto/inbound/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    private logger = new Logger('UsersService');

    constructor(@InjectModel('User') private usersModel: Model<User>) {}

    async createUser(user: CreateUserDto) {
        /**
         * Hash the user password before store it into the database
         */
        let hashedPassword = await bcrypt.hash(
            user.password,
            parseInt(process.env.SALT_ROUNDS),
        );
        user = {
            ...user,
            password: hashedPassword,
        };

        const createdUser = (await this.usersModel.create(user)).populate(
            'committee',
        );

        return createdUser;
    }

    async getUsers(filter: FilterQuery<User>): Promise<User[]> {
        this.logger.debug(
            `Getting users with filter ${JSON.stringify(filter, null, 4)}`,
        );

        const result = await this.usersModel
            .find(filter)
            .populate('committee')
            .lean();

        return result;
    }

    async updateUser(targetUserId: string, update: Partial<User>) {
        this.logger.debug(`Updating user with id ${targetUserId}`);
        const user = await this.usersModel
            .findByIdAndUpdate(targetUserId, update, { new: true })
            .populate('committee')
            .lean();

        if (!user) {
            this.logger.debug(`User not found`);
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async deleteUser(targetUserId: string) {
        this.logger.debug(`Deleting user with id ${targetUserId}`);
        let user = await this.usersModel.findByIdAndDelete(targetUserId).lean();

        if (!user) {
            this.logger.debug(`User not found`);
            throw NotFoundException;
        }

        return user;
    }
}
