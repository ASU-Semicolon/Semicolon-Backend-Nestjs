import { ApiProperty } from '@nestjs/swagger';
import {
    IsOptional,
    IsNumberString,
    MaxLength,
    MinLength,
    Length,
} from 'class-validator';

export class YearFilterDto {
    @ApiProperty({
        description:
            'Season to filter the entity based on. If not passed all entities without filtering are returned',
        example: '2024',
        required: false,
    })
    @IsNumberString()
    @Length(4, 4)
    @IsOptional()
    year: string;
}
