import { GenericResponse } from 'src/dto/generic-response.dto';
import { WorkshopDto } from '../dto/outbound/workshop.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SingleWorkshopResponse implements GenericResponse<WorkshopDto> {
    @ApiProperty({
        type: WorkshopDto,
        description: 'The workshop that was found',
    })
    data: WorkshopDto;
}
