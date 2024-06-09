import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance, Transform } from 'class-transformer';
import { CommitteeDto } from 'src/modules/committees/dto/outbound/committee.dto';

export class UserDto {
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
        description: 'Password of the user',
        type: String,
        example: 'password123',
    })
    @Expose({
        name: 'password',
    })
    Password: string;

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
        description: 'Id of the committee that the user belongs to.',
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
        description: 'Date of user creation',
        type: Date,
    })
    @Expose({
        name: 'createdAt',
    })
    CreatedAt: Date;

    @ApiProperty({
        description: 'Date of user last update',
        type: String,
    })
    @Expose({
        name: 'updatedAt',
    })
    UpdatedAt: String;
}
