import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumberString, Length } from 'class-validator';

export class SeasonDto {
    @ApiProperty({
        description:
            'Season to filter the entity based on. If not passed all entities without filtering are returned',
        example: '2024',
        required: false,
    })
    @IsNumberString()
    @Length(4, 4, {
        message: 'season must be 4 characters long. For example: 2024',
    })
    @IsOptional()
    season: string;
}
