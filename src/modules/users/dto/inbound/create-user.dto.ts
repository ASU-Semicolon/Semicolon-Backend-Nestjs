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
        example: 'test@email.com',
        type: String,
        required: true,
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Username of the user',
        example: 'testuser',
        type: String,
        required: true,
    })
    @IsString()
    @MinLength(3)
    username: string;

    @ApiProperty({
        description: 'Password of the user',
        type: String,
        required: true,
        example: 'password123',
    })
    @MinLength(8)
    password: string;

    @ApiProperty({
        description: 'Phone number of the user',
        type: String,
        required: true,
        example: '01234567890',
    })
    @IsPhoneNumber('EG')
    phone: string;

    @ApiProperty({
        description: 'Id of the committee that the user belongs to.',
        type: String,
        required: true,
        example: '60f7b3b3b5f7f0001f000001',
    })
    @IsMongoId()
    committee: mongoose.Types.ObjectId;

    @ApiProperty({
        description: "Status of user's account",
        type: Boolean,
        required: false,
        default: false,
        example: true,
    })
    @IsBoolean()
    @IsOptional()
    active: boolean;

    @ApiProperty({
        description: 'Role of the user',
        enum: ['admin', 'hr', 'member'],
        required: true,
        example: 'admin',
    })
    @IsEnum(['admin', 'hr', 'member'])
    role: 'admin' | 'hr' | 'member';
}
