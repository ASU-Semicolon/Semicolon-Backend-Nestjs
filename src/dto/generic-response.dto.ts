import { ApiProperty } from '@nestjs/swagger';

export class GenericResponse<T> {
    @ApiProperty()
    data: T;
}
