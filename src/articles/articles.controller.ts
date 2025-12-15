import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common'; // Added UseGuards, Request
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('saved/all') // Changed path to avoid conflict with :id if purely 'saved' might be ambiguous, though 'saved' is strict string. Let's use 'saved/all' or just 'saved' but place it before :id
    @ApiOperation({ summary: 'Get all saved articles for current user' })
    findAllSaved(@Request() req) {
        return this.articlesService.findAllSaved(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post(':id/save')
    @ApiOperation({ summary: 'Save an article' })
    saveArticle(@Param('id') id: string, @Request() req) {
        return this.articlesService.saveArticle(req.user.userId, id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(':id/save')
    @ApiOperation({ summary: 'Unsave an article' })
    unsaveArticle(@Param('id') id: string, @Request() req) {
        return this.articlesService.unsaveArticle(req.user.userId, id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get(':id/is-saved')
    @ApiOperation({ summary: 'Check if article is saved' })
    checkIsSaved(@Param('id') id: string, @Request() req) {
        return this.articlesService.checkIsSaved(req.user.userId, id);
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
