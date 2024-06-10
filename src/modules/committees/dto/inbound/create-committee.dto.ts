import {
    ArrayMinSize,
    IsArray,
    IsEnum,
    IsOptional,
    IsString,
    IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Enums } from 'src/types/enums';

export class CreateCommitteeDto {
    @ApiProperty({
        description: 'Committee title',
        type: String,
        example: 'Advanced web',
        required: true,
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: 'Committee description',
        type: String,
        required: true,
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: 'Committee cover image',
        example: 'https://image.com',
        type: String,
        required: true,
    })
    @IsUrl()
    image: string;

    @ApiProperty({
        description: 'Brief about the committee - a short description',
        type: String,
        required: true,
    })
    @IsString()
    brief: string;

    @ApiProperty({
        description: 'List of heads of the committee',
        type: Array<String>,
        example: ['ahmed', 'mohamed'],
        required: true,
    })
    @IsArray()
    @IsString({
        each: true,
    })
    @ArrayMinSize(1)
    heads: string[];

    @ApiProperty({
        description: 'The director of the committee',
        required: true,
    })
    @IsString()
    director: string;

    @ApiProperty({
        description: 'The vice director of the committee',
        required: true,
    })
    @IsString()
    @IsOptional()
    vice_director?: string;

    @ApiProperty({
        description: 'The sector that the committee belongs to',
        enum: Enums.Sector,
        required: true,
    })
    @IsString()
    @IsEnum(Enums.Sector)
    sector: Enums.Sector;
}
