import { GenericResponse } from 'src/dto/generic-response.dto';
import { CommitteeDto } from '../dto/committee.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SingleCommitteeResponse implements GenericResponse<CommitteeDto> {
    @ApiProperty()
    data: CommitteeDto;
}
