import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

/**
 * This Dto is used to fetch constants from the application.
 */
export class ConstantDto {
    @ApiProperty({
        description: 'The type of the constant to fetch.',
        enum: [
            'sectors',
            'events',
            'workshop-states',
            'academic-years',
            'candidate-status',
            'workshop-tracks',
        ],
        required: true,
    })
    @IsEnum([
        'sectors',
        'events',
        'workshop-states',
        'academic-years',
        'candidate-status',
        'workshop-tracks',
    ])
    type: string;
}
