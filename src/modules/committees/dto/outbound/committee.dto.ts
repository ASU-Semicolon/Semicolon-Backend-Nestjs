import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Enums } from 'src/types/enums';

/**
 * This is the shape of committee returned
 * to the client across the app
 */
export class CommitteeDto {
    @ApiProperty({
        example: '5f8f1b3b9b3f3b001f2e4b3d',
    })
    @Expose({
        name: '_id',
    })
    @Transform(({ obj }) => obj._id.toString()) // This is a workaround to get the id as a string.
    Id: string;

    @ApiProperty({
        example: 'Web development committee',
    })
    @Expose({
        name: 'title',
    })
    Title: string; // Rename `title` into `Title`

    @ApiProperty({
        example: 'This is a description',
    })
    @Expose({
        name: 'description',
    })
    Description: string;

    @ApiProperty({
        example: 'https://example.com/image.jpg',
    })
    @Expose({
        name: 'image',
    })
    Image: string;

    @ApiProperty({
        example: 'This is a brief',
    })
    @Expose({
        name: 'brief',
    })
    Brief: string;

    @ApiProperty({
        example: ['Ahmed', 'Mohamed', 'Ali'],
    })
    @Expose({
        name: 'heads',
    })
    Heads: string[];

    @ApiProperty({
        example: 'Ahmed',
        default: 'Ahmed',
    })
    @Expose({
        name: 'director',
    })
    Director: string;

    @ApiProperty({
        example: 'Mohamed',
    })
    @Expose({
        name: 'vice_director',
    })
    Vice_Director: string;

    @ApiProperty({
        example: 'web development',
        type: String,
    })
    @Expose({
        name: 'sector',
    })
    Sector: Enums.Sector;

    @ApiProperty({
        example: '2024',
        type: String,
    })
    @Expose({
        name: 'season',
    })
    Season: string;
}
