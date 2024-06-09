import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class IdDto {
    @ApiProperty({
        type: String,
        description: 'Id of the target entity',
        example: '5f8f1b3b9b3f3b001f2e4b3d',
        required: true,
    })
    @IsMongoId()
    id: string;
}
