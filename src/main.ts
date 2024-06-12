import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['debug', 'warn'],
        cors: true,
    });

    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
        .setTitle("Semicolon's API")
        .setDescription(
            "API to manage Semicolon's members, workshops, committees, and more",
        )
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    await app.listen(process.env.PORT);
}
bootstrap();
