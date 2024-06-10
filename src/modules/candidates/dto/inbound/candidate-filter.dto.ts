import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { EventDto } from 'src/dto/event.dto';
import { Enums } from 'src/types/enums';

/**
 * The filter for the candidates.
 */
export class CandidateFilterDto extends EventDto {
    @ApiProperty({
        description: 'The type of the candidate.',
        example: 'member',
        type: String,
        enum: Enums.CandidateType,
        required: false,
    })
    @IsEnum(Enums.CandidateType)
    @IsOptional()
    type: Enums.CandidateType;
}
