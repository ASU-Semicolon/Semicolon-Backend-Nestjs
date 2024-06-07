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

export class UpdateUserDto {
    @ApiProperty({
        description: 'Email of the user',
        type: String,
        required: false,
    })
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiProperty({
        description: 'Username of the user',
        type: String,
        required: false,
    })
    @IsString()
    @MinLength(4)
    @IsOptional()
    username: string;

    @ApiProperty({
        description: 'Password of the user',
        type: String,
        required: false,
    })
    @MinLength(8)
    @IsOptional()
    password: string;

    @ApiProperty({
        description: 'Phone number of the user',
        type: String,
        required: false,
    })
    @IsPhoneNumber('EG')
    @IsOptional()
    phone: string;

    @ApiProperty({
        description: 'Id of the committee that the user belongs to.',
        type: String,
        required: false,
    })
    @IsMongoId()
    @IsOptional()
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
        required: false,
    })
    @IsEnum(['admin', 'hr', 'member'])
    @IsOptional()
    role: 'admin' | 'hr' | 'member';
}
