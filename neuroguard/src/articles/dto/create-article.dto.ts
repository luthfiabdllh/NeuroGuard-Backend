import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateArticleDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsUUID()
    category_id: string;

    @IsString()
    @IsOptional()
    image_url?: string;
}
