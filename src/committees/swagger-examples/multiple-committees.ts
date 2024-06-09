import { ApiProperty } from '@nestjs/swagger';
import { GenericResponse } from 'src/interceptors/transform.interceptor';
import { CommitteeDto } from '../dto/committee.dto';

export class MultipleCommitteeResponse
    implements GenericResponse<CommitteeDto[]>
{
    @ApiProperty({ type: [CommitteeDto] })
    data: CommitteeDto[];
}
