import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new article' })
    create(@Body() createArticleDto: CreateArticleDto) {
        return this.articlesService.create(createArticleDto);
    }

    @Get()
    @ApiOperation({ summary: 'List all articles' })
    findAll() {
        return this.articlesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get article details' })
    findOne(@Param('id') id: string) {
        return this.articlesService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update an article' })
    update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
        return this.articlesService.update(id, updateArticleDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an article' })
    remove(@Param('id') id: string) {
        return this.articlesService.remove(id);
    }
}
