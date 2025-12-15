import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
    constructor(private prisma: PrismaService) { }

    create(createArticleDto: CreateArticleDto) {
        return this.prisma.article.create({
            data: createArticleDto,
        });
    }

    findAll() {
        return this.prisma.article.findMany({
            include: { category: true },
        });
    }

    findOne(id: string) {
        return this.prisma.article.findUnique({
            where: { id },
            include: { category: true },
        });
    }

    update(id: string, updateArticleDto: UpdateArticleDto) {
        return this.prisma.article.update({
            where: { id },
            data: updateArticleDto,
        });
    }

    remove(id: string) {
        return this.prisma.article.delete({
            where: { id },
        });
    }

    async saveArticle(userId: string, articleId: string) {
        // Check if already saved to avoid duplicates (optional, or rely on unique constraints if any)
        const existing = await this.prisma.userSavedArticle.findFirst({
            where: {
                user_id: userId,
                article_id: articleId,
            },
        });

        if (existing) {
            return existing;
        }

        return this.prisma.userSavedArticle.create({
            data: {
                user_id: userId,
                article_id: articleId,
            },
        });
    }

    async unsaveArticle(userId: string, articleId: string) {
        // Find the record first
        const savedRecord = await this.prisma.userSavedArticle.findFirst({
            where: {
                user_id: userId,
                article_id: articleId,
            },
        });

        if (!savedRecord) {
            return { count: 0 }; // Or throw error
        }

        return this.prisma.userSavedArticle.delete({
            where: { id: savedRecord.id },
        });
    }

    async findAllSaved(userId: string) {
        return this.prisma.userSavedArticle.findMany({
            where: { user_id: userId },
            include: {
                article: {
                    include: { category: true }
                }
            },
            orderBy: { saved_at: 'desc' }
        });
    }

    async checkIsSaved(userId: string, articleId: string) {
        const count = await this.prisma.userSavedArticle.count({
            where: {
                user_id: userId,
                article_id: articleId,
            }
        });
        return { isSaved: count > 0 };
    }
}
