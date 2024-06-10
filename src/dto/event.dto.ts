import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

/**
 * The name of the event where this entity related to.
 */
export class EventDto {
    @ApiProperty({
        description: 'The name of the event where this entity related to.',
        example: 'recruitment 2024',
        type: String,
        required: false,
    })
    @IsString()
    @IsOptional()
    event: string;
}
