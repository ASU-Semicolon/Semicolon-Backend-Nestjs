import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumberString, Length } from 'class-validator';

export class SeasonDto {
    @SeasonDecorator()
    @IsOptional()
    season: string;
}

/**
 * Decorator to contain common validators for season field rather than repeating them in many places.
 * The decorator doesn't contain IsOptional() decorator, so you need to add it manually if needed.
 * @param inQuery This is used to change the description of the field based on the location where season resides @default true
 */
export function SeasonDecorator(inQuery = true) {
    let description = inQuery
        ? 'Season to filter the entity based on. If not passed all entities without filtering are returned'
        : 'Season where the entity belongs to';
    return applyDecorators(
        ApiProperty({
            description,
            example: '2024',
            required: !inQuery,
        }),
        IsNumberString(),
        Length(4, 4, {
            message: 'season must be 4 characters long. For example: 2024',
        }),
    );
}
