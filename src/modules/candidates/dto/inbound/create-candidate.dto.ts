import { Enums } from 'src/types/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsPhoneNumber, IsString } from 'class-validator';
import { Candidate } from '../../types/candidate';

export class CreateCandidateDto
    implements Omit<Candidate, 'evaluation' | 'acceptance_status'>
{
    @ApiProperty({
        description: 'Name of the candidate.',
        example: 'Mohamed Ali',
        type: String,
        required: true,
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'College of the candidate.',
        example: 'Faculty of Engineering',
        type: String,
        required: true,
    })
    @IsString()
    college: string;

    @ApiProperty({
        description: 'The event where the candidate is applying for.',
        example: Enums.Event.RECRUITMENT_24,
        enum: Enums.Event,
        required: true,
    })
    @IsString()
    event: string;

    @ApiProperty({
        description: 'Email of the candidate.',
        example: 'Mohamed@email.com',
        type: String,
        required: true,
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Phone number of the candidate.',
        example: '01000000000',
        type: String,
        required: true,
    })
    @IsPhoneNumber('EG')
    phone: string;

    @ApiProperty({
        description: 'First preference of the candidate.',
        example: 'Frontend',
        type: String,
        required: true,
    })
    @IsString()
    first_preference: string;

    @ApiProperty({
        description: 'Reason for the first preference of the candidate.',
        example: 'I have experience in frontend development.',
        type: String,
        required: true,
    })
    @IsString()
    first_preference_reason: string;

    @ApiProperty({
        description: 'Second preference of the candidate.',
        example: 'Backend',
        type: String,
        required: true,
    })
    @IsString()
    second_preference: string;

    @ApiProperty({
        description: 'Reason for the second preference of the candidate.',
        example: 'I have experience in backend development.',
        type: String,
        required: true,
    })
    @IsString()
    second_preference_reason: string;

    @ApiProperty({
        description: 'Previous experience of the candidate.',
        example: 'I have worked on multiple projects.',
        type: String,
        required: true,
    })
    @IsString()
    previous_experience: string;

    @ApiProperty({
        description: 'Academic year of the candidate.',
        example: 'Senior 1 (4th year)',
        enum: Enums.AcademicYear,
        required: true,
    })
    @IsEnum(Enums.AcademicYear)
    academic_year: string;

    @ApiProperty({
        description: 'Evaluation of the candidate.',
        example: 'member',
        enum: Enums.CandidateType,
        required: true,
    })
    type: Enums.CandidateType;
}
