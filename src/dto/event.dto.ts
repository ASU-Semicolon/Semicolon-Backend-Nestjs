import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Enums } from 'src/types/enums';

/**
 * The name of the event where this entity related to.
 */
export class EventDto {
    @ApiProperty({
        description: 'The name of the event where this entity related to.',
        example: Enums.Event.RECRUITMENT_24,
        enum: Enums.Event,
        required: false,
    })
    @IsString()
    @IsOptional()
    event: string;
}
