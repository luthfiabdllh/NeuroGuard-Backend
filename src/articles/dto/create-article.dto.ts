import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateArticleDto {
    @ApiProperty({ example: 'Understanding Stroke', description: 'Title of the article' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'Stroke is a medical emergency...', description: 'Content of the article' })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({ example: 'uuid-of-category', description: 'Category ID' })
    @IsString()
    @IsUUID()
    category_id: string;

    @ApiPropertyOptional({ example: 'https://example.com/image.jpg', description: 'Cover image URL' })
    @IsString()
    @IsOptional()
    image_url?: string;
}
