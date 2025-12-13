import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
    create(createArticleDto: CreateArticleDto) {
        return 'This action adds a new article';
    }

    findAll() {
        return `This action returns all articles`;
    }

    findOne(id: string) {
        return `This action returns a #${id} article`;
    }

    update(id: string, updateArticleDto: UpdateArticleDto) {
        return `This action updates a #${id} article`;
    }

    remove(id: string) {
        return `This action removes a #${id} article`;
    }
}
