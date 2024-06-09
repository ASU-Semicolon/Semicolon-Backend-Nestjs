import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../dto/outbound/user.dto';
import { GenericResponse } from 'src/dto/generic-response.dto';

export class MultipleUserResponse implements GenericResponse<UserDto[]> {
    @ApiProperty({
        type: [UserDto],
    })
    data: UserDto[];
}
