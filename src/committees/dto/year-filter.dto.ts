import { ApiProperty } from '@nestjs/swagger';
import { Length, IsString, IsOptional } from 'class-validator';

export class YearFilterDto {
    @ApiProperty({
        description:
            'Season to filter the entity based on. If not passed all entities without filtering are returned',
        example: '2024',
        required: false,
    })
    @IsString()
    @Length(4)
    @IsOptional()
    year: string;
}
