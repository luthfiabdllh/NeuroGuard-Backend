import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';
import { PredictionsModule } from './predictions/predictions.module';
import { RemindersModule } from './reminders/reminders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    PrismaModule,
    ArticlesModule,
    PredictionsModule,
    RemindersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
