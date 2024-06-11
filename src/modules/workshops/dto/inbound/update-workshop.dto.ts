import { ApiProperty } from '@nestjs/swagger';
import {
    IsDateString,
    IsEnum,
    IsInt,
    IsMongoId,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator';
import { SeasonDecorator } from 'src/dto/season.dto';
import { Enums } from 'src/types/enums';

export class UpdateWorkshopDto {
    @ApiProperty({
        type: String,
        example: 'Frontend workshop',
        description: 'The title of the workshop',
        required: false,
    })
    @IsString()
    @IsOptional()
    title: string;

    @ApiProperty({
        type: String,
        example: 'Learn how to build a frontend application',
        description: 'The description of the workshop',
        required: false,
    })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({
        type: Number,
        example: 10,
        description: 'The duration of the workshop in sessions',
        required: false,
    })
    @IsInt()
    @Min(2)
    @Max(30)
    @IsOptional()
    duration_in_sessions: number;

    @ApiProperty({
        type: Number,
        example: 2,
        description: 'The number of sessions per week',
        required: false,
    })
    @IsInt()
    @Min(1)
    @Max(7) // If you are a psycho, you can have 7 sessions per week
    @IsOptional()
    sessions_per_week: number;

    @ApiProperty({
        type: String,
        example: '2024-01-01T00:00:00.000Z',
        description: 'The start date of the workshop',
        required: false,
    })
    @IsDateString()
    @IsOptional()
    start_date: string;

    @ApiProperty({
        type: String,
        example: 'Abdo Basha, Cairo, Egypt',
        description: 'The location of the workshop',
        required: false,
    })
    @IsString()
    @IsOptional()
    location: string;

    @ApiProperty({
        type: String,
        example: '6165f4f7d1a8e7a7e6b1e4f5',
        description:
            'The Id of the committee that is responsible for the workshop',
        required: false,
    })
    @IsMongoId()
    @IsOptional()
    committee: string;

    @ApiProperty({
        type: String,
        example: Enums.WorkshopState.NOT_STARTED,
        description: 'The state of the workshop',
        required: false,
    })
    @IsEnum(Enums.WorkshopState)
    @IsOptional()
    state: Enums.WorkshopState;

    @ApiProperty({
        type: String,
        example: '6165f4f7d1a8e7a7e6b1e4f5',
        description: 'The Id of the instructor of the workshop',
        required: false,
    })
    @IsMongoId()
    @IsOptional()
    instructor: string;

    @ApiProperty({
        type: [String],
        example: ['JavaScript', 'React'],
        description: 'The prerequisites of the workshop',
        required: false,
    })
    @IsString({
        each: true,
    })
    @IsOptional()
    prerequisites: string[];

    @SeasonDecorator(false)
    @IsOptional()
    season: string;
}
