import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsInt,
    IsOptional,
    Max,
    Min,
    IsDateString,
    IsMongoId,
    IsObject,
} from 'class-validator';

export class NoteDto {
    @ApiProperty({
        description: 'Note to evaluate the candidate.',
        type: String,
        example: 'The candidate is enthusiastic.',
        required: false,
    })
    @IsString()
    note: string;

    @ApiProperty({
        description: 'Rating of the candidate in this particular criteria.',
        type: Number,
        example: 5,
        required: true,
    })
    @IsInt()
    @Max(5)
    @Min(1)
    @IsOptional()
    rating: number;
}

export class EvaluationNotesDto {
    @ApiProperty({
        description: 'Note to evaluate the candidate in terms of commitment.',
        type: NoteDto,
        required: false,
    })
    @IsOptional()
    commitment: NoteDto;

    @ApiProperty({
        description: 'Note to evaluate the candidate in terms of teamwork.',
        type: NoteDto,
        required: false,
    })
    @IsOptional()
    teamwork: NoteDto;

    @ApiProperty({
        description:
            'Note to evaluate the candidate in terms of time management.',
        type: NoteDto,
        required: false,
    })
    @IsOptional()
    'time management': NoteDto;

    @ApiProperty({
        description:
            'Note to evaluate the candidate in terms of communication skills.',
        type: NoteDto,
        required: false,
    })
    @IsOptional()
    'communication skills': NoteDto;

    @ApiProperty({
        description: 'Note to evaluate the candidate in terms of flexibility.',
        type: NoteDto,
        required: false,
    })
    @IsOptional()
    flexibility: NoteDto;

    @ApiProperty({
        description: 'Note to evaluate the candidate in terms of ethics.',
        type: NoteDto,
        required: false,
    })
    @IsOptional()
    ethics: NoteDto;

    @ApiProperty({
        description: 'Note to evaluate the candidate in terms of leadership.',
        type: NoteDto,
        required: false,
    })
    @IsOptional()
    leadership: NoteDto;

    @ApiProperty({
        description:
            'Note to evaluate the candidate in terms of stress management.',
        type: NoteDto,
        required: false,
    })
    @IsOptional()
    'stress management': NoteDto;

    @ApiProperty({
        description:
            'Note to evaluate the candidate in terms of problem solving.',
        type: NoteDto,
        required: false,
    })
    @IsOptional()
    'problem solving': NoteDto;

    @ApiProperty({
        description:
            'Note to evaluate the candidate in terms of eager to learn.',
        type: NoteDto,
        required: false,
    })
    @IsOptional()
    'eager to learn': NoteDto;
}

export class CandidateEvaluationDto {
    @ApiProperty({
        description: 'Evaluation notes of the candidate.',
        type: EvaluationNotesDto,
        required: true,
    })
    @IsObject()
    notes: EvaluationNotesDto;

    @ApiProperty({
        description: 'Id of the interviewer.',
        example: '5f4e3f3b7f3a2b001f2f3b3b',
        type: String,
        required: true,
    })
    @IsMongoId()
    interviewer: string;

    @ApiProperty({
        description: 'Date of the evaluation.',
        example: '2020-08-31T00:00:00.000Z',
        type: String,
        required: true,
    })
    @IsDateString()
    date: string;
}
