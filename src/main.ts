import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Enable CORS (Cross-Origin Resource Sharing)
   * Allows frontend applications to access this API from different origins
   */
  app.enableCors({
    origin: [
      'http://localhost:5173', // Development frontend (Vite)
      'https://testtechniquefront.netlify.app', // Production frontend (Netlify)
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Allow cookies and Authorization headers
  });

  /**
   * Swagger API documentation setup
   * Provides an interactive interface for testing and exploring API endpoints
   */
  const config = new DocumentBuilder()
    .setTitle('Project Management API')
    .setDescription('API for managing projects, tasks, tenants, and comments.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  /**
   * Start the NestJS server
   */
  await app.listen(3000);
  console.log(`Server is running at: http://localhost:3000`);
  console.log(`Swagger UI available at: http://localhost:3000/api`);
}

bootstrap();
