import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './users.schema';
import { CommitteeSchema } from '../committees/committees.schema';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        MongooseModule.forFeature([
            { name: 'User', schema: UsersSchema },
            { name: 'Committee', schema: CommitteeSchema },
        ]),
    ],
})
export class UsersModule {}
