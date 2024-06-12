import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { Expose, plainToInstance, Transform } from 'class-transformer';

export class SignInResultDto {
    @ApiProperty({ type: UserDto })
    @Expose({
        name: 'user',
    })
    @Transform(({ value }) =>
        plainToInstance(UserDto, value, { excludeExtraneousValues: true }),
    )
    User: UserDto;

    @ApiProperty({
        type: String,
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    })
    @Expose({
        name: 'token',
    })
    Token: string;
}
