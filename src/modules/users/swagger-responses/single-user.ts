import { GenericResponse } from 'src/dto/generic-response.dto';
import { UserDto } from '../dto/outbound/user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SingleUserResponse implements GenericResponse<UserDto> {
    @ApiProperty()
    data: UserDto;
}
