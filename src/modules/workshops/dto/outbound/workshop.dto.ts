import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance, Transform } from 'class-transformer';

import { CommitteeDto } from 'src/modules/committees/dto/outbound/committee.dto';
import { UserDto } from 'src/modules/users/dto/outbound/user.dto';
import { Enums } from 'src/types/enums';

export class WorkshopDto {
    @ApiProperty({
        type: String,
        example: '614b2b6a3f9c5d4c6b8ce7b1',
        description: 'The Id of the workshop',
        required: false,
    })
    @Expose({
        name: '_id',
    })
    @Transform(({ obj }) => obj._id.toString())
    Id: string;
    @ApiProperty({
        type: String,
        example: 'Frontend workshop',
        description: 'The title of the workshop',
        required: false,
    })
    @Expose({
        name: 'title',
    })
    Title: string;

    @ApiProperty({
        type: String,
        example: 'Learn how to build a frontend application',
        description: 'The description of the workshop',
        required: false,
    })
    @Expose({
        name: 'description',
    })
    Description: string;

    @ApiProperty({
        type: Number,
        example: 10,
        description: 'The duration of the workshop in sessions',
        required: false,
    })
    @Expose({
        name: 'duration_in_sessions',
    })
    Duration_in_sessions: number;

    @ApiProperty({
        type: Number,
        example: 2,
        description: 'The number of sessions per week',
        required: false,
    })
    @Expose({
        name: 'sessions_per_week',
    })
    Sessions_per_week: number;

    @ApiProperty({
        type: String,
        example: '2024-01-01T00:00:00.000Z',
        description: 'The start date of the workshop',
        required: false,
    })
    @Expose({
        name: 'start_date',
    })
    Start_date: string;

    @ApiProperty({
        type: String,
        example: 'Abdo Basha, Cairo, Egypt',
        description: 'The location of the workshop',
        required: false,
    })
    @Expose({
        name: 'location',
    })
    Location: string;

    @ApiProperty({
        type: CommitteeDto,
        description:
            'The Id of the committee that is responsible for the workshop',
        required: false,
    })
    @Expose({
        name: 'committee',
    })
    @Transform(({ value }) =>
        plainToInstance(CommitteeDto, value, { excludeExtraneousValues: true }),
    )
    Committee: CommitteeDto;

    @ApiProperty({
        type: String,
        example: Enums.WorkshopState.NOT_STARTED,
        description: 'The state of the workshop',
        required: false,
    })
    @Expose({
        name: 'state',
    })
    State: Enums.WorkshopState;

    @ApiProperty({
        type: UserDto,
        description: 'The Id of the instructor of the workshop',
        required: false,
    })
    @Expose({
        name: 'instructor',
    })
    @Transform(({ value }) =>
        plainToInstance(UserDto, value, { excludeExtraneousValues: true }),
    )
    Instructor: UserDto;

    @ApiProperty({
        type: [String],
        example: ['JavaScript', 'React'],
        description: 'The prerequisites of the workshop',
        required: false,
    })
    @Expose({
        name: 'prerequisites',
    })
    Prerequisites: string[];

    @ApiProperty({
        type: String,
        example: '2024',
        description: 'Season that this workshop belongs to.',
        required: false,
    })
    @Expose({
        name: 'season',
    })
    Season: string;
}
