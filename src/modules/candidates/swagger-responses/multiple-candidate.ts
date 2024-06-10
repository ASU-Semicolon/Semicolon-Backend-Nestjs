import { GenericResponse } from 'src/dto/generic-response.dto';
import { CandidateDto } from '../dto/outbound/candidate.dto';
import { ApiProperty } from '@nestjs/swagger';

export class MultipleCandidateResponse
    implements GenericResponse<CandidateDto[]>
{
    @ApiProperty({
        description: 'The candidate has been successfully created.',
        type: [CandidateDto],
    })
    data: CandidateDto[];
}
