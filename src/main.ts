import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- Enable CORS ---
  app.enableCors({
    origin: [
      'http://localhost:5173', // frontend en développement (Vite)
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // autoriser les cookies si nécessaire
  });

  // --- Swagger setup ---
  const config = new DocumentBuilder()
    .setTitle('Project Management API')
    .setDescription('API pour gérer les projets, tâches et commentaires')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`Application running on: http://localhost:3000`);
  console.log(`Swagger UI available on: http://localhost:3000/api`);
}

bootstrap();
