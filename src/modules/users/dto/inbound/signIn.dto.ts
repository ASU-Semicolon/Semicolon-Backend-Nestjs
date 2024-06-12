import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, MinLength } from 'class-validator';

export class SignInDto {
    @ApiProperty({
        description: 'Phone number of the user',
        type: String,
        required: true,
        example: '01234567890',
    })
    @IsPhoneNumber('EG')
    phone: string;

    @ApiProperty({
        description: 'Password of the user',
        type: String,
        example: 'password123',
        required: true,
    })
    @MinLength(8)
    password: string;
}
