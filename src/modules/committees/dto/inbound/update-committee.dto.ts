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

export class UpdateCommitteeDto {
    @ApiProperty({
        description: 'Committee title',
        type: String,
        example: 'Advanced web',
        required: false,
    })
    @IsString()
    @IsOptional()
    title: string;

    @ApiProperty({
        description: 'Committee description',
        type: String,
        required: false,
    })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({
        description: 'Committee cover image',
        example: 'https://image.com',
        type: String,
        required: false,
    })
    @IsUrl()
    @IsOptional()
    image: string;

    @ApiProperty({
        description: 'Brief about the committee - a short description',
        type: String,
        required: false,
    })
    @IsString()
    @IsOptional()
    brief: string;

    @ApiProperty({
        description: 'List of heads of the committee',
        type: Array<String>,
        example: ['ahmed', 'mohamed'],
        required: false,
    })
    @IsArray()
    @IsString({
        each: false,
    })
    @ArrayMinSize(1)
    @IsOptional()
    heads: string[];

    @ApiProperty({
        description: 'The director of the committee',
        required: false,
    })
    @IsString()
    @IsOptional()
    director: string;

    @ApiProperty({
        description: 'The vice director of the committee',
        required: false,
    })
    @IsString()
    @IsOptional()
    vice_director?: string;

    @ApiProperty({
        description: 'The sector that the committee belongs to',
        enum: Enums.Sector,
        required: false,
    })
    @IsString()
    @IsOptional()
    @IsEnum(Enums.Sector)
    sector: Enums.Sector;
}
