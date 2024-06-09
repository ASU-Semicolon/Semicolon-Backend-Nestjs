import { ApiProperty } from '@nestjs/swagger';
import { GenericResponse } from 'src/dto/generic-response.dto';
import { CommitteeDto } from '../dto/outbound/committee.dto';

export class MultipleCommitteeResponse
    implements GenericResponse<CommitteeDto[]>
{
    @ApiProperty({ type: [CommitteeDto] })
    data: CommitteeDto[];
}
