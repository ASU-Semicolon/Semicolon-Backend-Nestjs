import { Logger } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance, Transform } from 'class-transformer';
import { CommitteeDto } from 'src/modules/committees/dto/outbound/committee.dto';

export class UserDto {
    constructor() {}
    @ApiProperty({
        description: 'User ID',
        example: '5f8f1b3b9b3f3b001f2e4b3d',
    })
    @Expose({
        name: '_id',
    })
    @Transform(({ obj }) => obj._id.toString()) // This is a workaround to get the id as a string.
    Id: string;

    @ApiProperty({
        description: 'Email of the user',
        example: 'test@email.com',
        type: String,
    })
    @Expose({
        name: 'email',
    })
    Email: string;

    @ApiProperty({
        description: 'Username of the user',
        example: 'testUser',
        type: String,
    })
    @Expose({
        name: 'username',
    })
    Username: string;

    @ApiProperty({
        description: 'Phone number of the user',
        type: String,
        example: '01234567890',
    })
    @Expose({
        name: 'phone',
    })
    Phone: string;

    @ApiProperty({
        description: 'The committee that the user belongs to.',
        type: CommitteeDto,
    })
    @Expose({
        name: 'committee',
    })
    @Transform(({ value }) =>
        plainToInstance(CommitteeDto, value, { excludeExtraneousValues: true }),
    )
    Committee: CommitteeDto;

    @ApiProperty({
        description: "Status of user's account",
        type: Boolean,
        example: true,
    })
    @Expose({
        name: 'active',
    })
    Active: boolean;

    @ApiProperty({
        description: 'Role of the user',
        enum: ['admin', 'hr', 'member'],
        example: 'admin',
    })
    @Expose({
        name: 'role',
    })
    Role: 'admin' | 'hr' | 'member';

    @ApiProperty({
        description: 'The season in which the user was created.',
        example: '2024',
    })
    @Expose({
        name: 'season',
    })
    Season: string;
}
