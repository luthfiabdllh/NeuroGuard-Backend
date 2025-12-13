import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const expressApp = express();

const createNestServer = async (expressInstance) => {
    const app = await NestFactory.create(
        AppModule,
        new ExpressAdapter(expressInstance),
    );

    const config = new DocumentBuilder()
        .setTitle('NeuroGuard API')
        .setDescription('The NeuroGuard Stroke Prediction API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    // Enable CORS
    app.enableCors();

    await app.init();
};

createNestServer(expressApp);

export default expressApp;
