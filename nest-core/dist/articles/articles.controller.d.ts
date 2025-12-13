import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    create(createArticleDto: CreateArticleDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateArticleDto: UpdateArticleDto): string;
    remove(id: string): string;
}
