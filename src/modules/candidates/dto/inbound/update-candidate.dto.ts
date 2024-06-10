import { Enums } from 'src/types/enums';
import { CandidateEvaluationDto } from './candidate-evaluation.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsEnum,
    IsOptional,
    IsPhoneNumber,
    IsString,
} from 'class-validator';
import { Candidate } from '../../types/candidate';

export class UpdateCandidateDto implements Partial<Candidate> {
    @ApiProperty({
        description: 'First preference of the candidate.',
        example: 'Frontend',
        type: String,
        required: false,
    })
    @IsString()
    @IsOptional()
    first_preference?: string;

    @ApiProperty({
        description: 'Reason for the first preference of the candidate.',
        example: 'I have experience in frontend development.',
        type: String,
        required: false,
    })
    @IsString()
    @IsOptional()
    first_preference_reason?: string;

    @ApiProperty({
        description: 'Second preference of the candidate.',
        example: 'Backend',
        type: String,
        required: false,
    })
    @IsOptional()
    @IsString()
    second_preference?: string;

    @ApiProperty({
        description: 'Reason for the second preference of the candidate.',
        example: 'I have experience in backend development.',
        type: String,
        required: false,
    })
    @IsOptional()
    @IsString()
    second_preference_reason?: string;

    @ApiProperty({
        description: 'Previous experience of the candidate.',
        example: 'I have worked on multiple projects.',
        type: String,
        required: false,
    })
    @IsOptional()
    @IsString()
    previous_experience?: string;

    @ApiProperty({
        description: 'Acceptance status of the candidate.',
        example: 'pending',
        enum: Enums.CandidateStatus,
        required: false,
    })
    @IsOptional()
    @IsEnum(Enums.CandidateStatus)
    acceptance_status?: Enums.CandidateStatus;

    @ApiProperty({
        description: 'Evaluation of the candidate.',
        example: 'member',
        enum: Enums.CandidateType,
        required: false,
    })
    @IsOptional()
    type?: Enums.CandidateType;

    @ApiProperty({
        description: 'Evaluation of the candidate.',
        type: CandidateEvaluationDto,
        required: false,
    })
    @IsOptional()
    evaluation?: CandidateEvaluationDto;
}
