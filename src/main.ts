import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({}));

    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
        .setTitle("Semicolon's API")
        .setDescription(
            "API to manage Semicolon's members, workshops, committees, and more",
        )
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    await app.listen(process.env.PORT);
}
bootstrap();
