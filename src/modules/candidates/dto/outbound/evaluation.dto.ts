import { ApiProperty } from '@nestjs/swagger';
import {
    Expose,
    plainToClass,
    plainToInstance,
    Transform,
} from 'class-transformer';
import { UserDto } from 'src/modules/users/dto/outbound/user.dto';

@Expose()
export class OutboundNoteDto {
    @ApiProperty({
        description: 'Note to evaluate the candidate.',
        type: String,
        example: 'The candidate is enthusiastic.',
    })
    @Expose()
    note: string;

    @ApiProperty({
        description: 'Rating of the candidate in this particular criteria.',
        type: Number,
        example: 5,
        required: true,
    })
    @Expose()
    rating: number;
}

export class OutboundEvaluationNotesDto {
    @ApiProperty({
        description: 'Note to evaluate the candidate in terms of commitment.',
        type: OutboundNoteDto,
    })
    @Transform(({ value }) =>
        plainToInstance(OutboundNoteDto, value, {
            excludeExtraneousValues: true,
        }),
    )
    @Expose()
    commitment: OutboundNoteDto;

    @ApiProperty({
        description: 'Note to evaluate the candidate in terms of teamwork.',
        type: OutboundNoteDto,
    })
    @Transform(({ value }) =>
        plainToInstance(OutboundNoteDto, value, {
            excludeExtraneousValues: true,
        }),
    )
    @Expose()
    teamwork: OutboundNoteDto;

    @ApiProperty({
        description:
            'Note to evaluate the candidate in terms of time management.',
        type: OutboundNoteDto,
    })
    @Transform(({ value }) =>
        plainToInstance(OutboundNoteDto, value, {
            excludeExtraneousValues: true,
        }),
    )
    @Expose()
    'time management': OutboundNoteDto;

    @ApiProperty({
        description:
            'Note to evaluate the candidate in terms of communication skills.',
        type: OutboundNoteDto,
    })
    @Transform(({ value }) =>
        plainToInstance(OutboundNoteDto, value, {
            excludeExtraneousValues: true,
        }),
    )
    @Expose()
    'communication skills': OutboundNoteDto;

    @ApiProperty({
        description: 'Note to evaluate the candidate in terms of flexibility.',
        type: OutboundNoteDto,
    })
    @Transform(({ value }) =>
        plainToInstance(OutboundNoteDto, value, {
            excludeExtraneousValues: true,
        }),
    )
    @Expose()
    flexibility: OutboundNoteDto;

    @ApiProperty({
        description: 'Note to evaluate the candidate in terms of ethics.',
        type: OutboundNoteDto,
    })
    @Transform(({ value }) =>
        plainToInstance(OutboundNoteDto, value, {
            excludeExtraneousValues: true,
        }),
    )
    @Expose()
    ethics: OutboundNoteDto;

    @ApiProperty({
        description: 'Note to evaluate the candidate in terms of leadership.',
        type: OutboundNoteDto,
    })
    @Transform(({ value }) =>
        plainToInstance(OutboundNoteDto, value, {
            excludeExtraneousValues: true,
        }),
    )
    @Expose()
    leadership: OutboundNoteDto;

    @ApiProperty({
        description:
            'Note to evaluate the candidate in terms of stress management.',
        type: OutboundNoteDto,
    })
    @Transform(({ value }) =>
        plainToInstance(OutboundNoteDto, value, {
            excludeExtraneousValues: true,
        }),
    )
    @Expose()
    'stress management': OutboundNoteDto;

    @ApiProperty({
        description:
            'Note to evaluate the candidate in terms of problem solving.',
        type: OutboundNoteDto,
    })
    @Transform(({ value }) =>
        plainToInstance(OutboundNoteDto, value, {
            excludeExtraneousValues: true,
        }),
    )
    @Expose()
    'problem solving': OutboundNoteDto;

    @ApiProperty({
        description:
            'Note to evaluate the candidate in terms of eager to learn.',
        type: OutboundNoteDto,
    })
    @Transform(({ value }) =>
        plainToInstance(OutboundNoteDto, value, {
            excludeExtraneousValues: true,
        }),
    )
    @Expose()
    'eager to learn': OutboundNoteDto;
}

export class EvaluationDto {
    @ApiProperty({
        description: 'Notes of the evaluation.',
        type: OutboundEvaluationNotesDto,
    })
    @Expose({
        name: 'notes',
    })
    @Transform(({ value }) =>
        plainToClass(OutboundEvaluationNotesDto, value, {
            excludeExtraneousValues: true,
        }),
    )
    Notes: OutboundEvaluationNotesDto;

    @ApiProperty({
        description: 'Interviewer who conducted the evaluation.',
        type: UserDto,
    })
    @Expose({
        name: 'interviewer',
    })
    @Transform(({ value }) =>
        plainToClass(UserDto, value, {
            excludeExtraneousValues: true,
        }),
    )
    Interviewer: UserDto;

    @ApiProperty({
        description: 'Date of the evaluation.',
        type: String,
        example: '2021-07-01T00:00:00.000Z',
    })
    @Expose({
        name: 'date',
    })
    Date: string;
}
