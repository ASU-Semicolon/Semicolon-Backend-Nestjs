import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance, Transform } from 'class-transformer';
import { EvaluationDto } from './evaluation.dto';
import { Enums } from 'src/types/enums';

export class CandidateDto {
    @ApiProperty()
    @Expose({
        name: '_id',
    })
    @Transform((value) => value.obj._id.toString()) // This is a workaround to get the id as a string.
    Id: string;

    @ApiProperty({
        example: 'Mohamed',
    })
    @Expose({
        name: 'name',
    })
    Name: string;

    @ApiProperty({
        example: 'Engineering',
    })
    @Expose({
        name: 'college',
    })
    College: string;

    @ApiProperty({
        example: 'workshops 2024',
    })
    @Expose({
        name: 'event',
    })
    Event: string;

    @ApiProperty({
        example: 'test@gmial.com',
    })
    @Expose({
        name: 'email',
    })
    Email: string;

    @ApiProperty({
        example: '01234567890',
    })
    @Expose({
        name: 'phone',
    })
    Phone: string;

    @ApiProperty({
        example: 'web development',
    })
    @Expose({
        name: 'first_preference',
    })
    FirstPreference: string;

    @ApiProperty({
        example: 'I love web development',
    })
    @Expose({
        name: 'first_preference_reason',
    })
    FirstPreferenceReason: string;

    @ApiProperty({
        example: 'data science',
    })
    @Expose({
        name: 'second_preference',
    })
    SecondPreference: string;

    @ApiProperty({
        example: 'I love data science',
    })
    @Expose({
        name: 'second_preference_reason',
    })
    SecondPreferenceReason: string;

    @ApiProperty({
        example: 'I have experience in web development',
    })
    @Expose({
        name: 'previous_experience',
    })
    PreviousExperience: string;

    @ApiProperty({
        example: 'Senior 1 (4th year)',
    })
    @Expose({
        name: 'academic_year',
    })
    AcademicYear: string;

    @ApiProperty({
        example: 'accepted',
    })
    @Expose({
        name: 'acceptance_status',
    })
    AcceptanceStatus: string;

    @ApiProperty({
        example: 'member',
        enum: Enums.CandidateType,
    })
    @Expose({
        name: 'type',
    })
    Type: Enums.CandidateStatus;

    @ApiProperty({
        type: EvaluationDto,
    })
    @Transform(({ value }) =>
        plainToInstance(EvaluationDto, value, {
            excludeExtraneousValues: true,
        }),
    )
    @Expose({
        name: 'evaluation',
    })
    Evaluation: EvaluationDto;
}
