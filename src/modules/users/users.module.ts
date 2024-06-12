import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './users.schema';
import { CommitteeSchema } from '../committees/committees.schema';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    controllers: [UsersController],
    providers: [UsersService, AuthService],
    exports: [UsersService],
    imports: [
        MongooseModule.forFeature([
            { name: 'User', schema: UsersSchema },
            { name: 'Committee', schema: CommitteeSchema },
        ]),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '7d',
                algorithm: 'HS256',
            },
        }),
    ],
})
export class UsersModule {}
