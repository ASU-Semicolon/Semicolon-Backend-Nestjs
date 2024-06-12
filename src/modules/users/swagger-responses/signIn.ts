import { GenericResponse } from 'src/dto/generic-response.dto';
import { SignInResultDto } from '../dto/outbound/signIn-result.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SignInResponse implements GenericResponse<SignInResultDto> {
    @ApiProperty({
        description: 'The data returned from the sign in request',
        type: SignInResultDto,
    })
    data: SignInResultDto;
}
