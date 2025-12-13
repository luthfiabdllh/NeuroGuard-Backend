import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

// Cache the server instance
let server: any;

const bootstrap = async () => {
    const expressApp = express();
    const app = await NestFactory.create(
        AppModule,
        new ExpressAdapter(expressApp),
    );
    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
        .setTitle('NeuroGuard API')
        .setDescription('The NeuroGuard Stroke Prediction API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    app.enableCors();
    await app.init();
    return expressApp;
};

export default async (req, res) => {
    if (!server) {
        server = await bootstrap();
    }
    return server(req, res);
};
