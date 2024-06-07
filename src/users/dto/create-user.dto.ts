import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsEmail,
    IsEnum,
    IsMongoId,
    IsOptional,
    IsPhoneNumber,
    IsString,
    MinLength,
} from 'class-validator';
import mongoose from 'mongoose';

export class CreateUserDto {
    @ApiProperty({
        description: 'Email of the user',
        type: String,
        required: true,
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Username of the user',
        type: String,
        required: true,
    })
    @IsString()
    @MinLength(4)
    username: string;

    @ApiProperty({
        description: 'Password of the user',
        type: String,
        required: true,
    })
    @MinLength(8)
    password: string;

    @ApiProperty({
        description: 'Phone number of the user',
        type: String,
        required: true,
    })
    @IsPhoneNumber('EG')
    phone: string;

    @ApiProperty({
        description: 'Id of the committee that the user belongs to.',
        type: String,
        required: true,
    })
    @IsMongoId()
    committee: mongoose.Types.ObjectId;

    @ApiProperty({
        description: "Status of user's account",
        type: Boolean,
        required: false,
        default: false,
    })
    @IsBoolean()
    @IsOptional()
    active: boolean;

    @ApiProperty({
        description: 'Role of the user',
        enum: ['admin', 'hr', 'member'],
        required: true,
    })
    @IsEnum(['admin', 'hr', 'member'])
    role: 'admin' | 'hr' | 'member';
}
