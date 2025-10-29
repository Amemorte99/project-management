import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Enable Cross-Origin Resource Sharing (CORS)
   * Allows requests from your frontend app (local or production)
   */
  app.enableCors({
    origin: [
      'http://localhost:5173', // Frontend in development (Vite)
      'https://testtechniquefront.netlify.app', // Frontend in production (Netlify)
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Allow cookies or authorization headers
  });

  /**
   *  Swagger API Documentation setup
   * Provides an interactive UI to test and explore API endpoints
   */
  const config = new DocumentBuilder()
    .setTitle('Project Management API')
    .setDescription('API for managing projects, tasks, and comments.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  /**
   *  Start the server
   */
  await app.listen(3000);
  console.log(` Application running at: http://localhost:3000`);
  console.log(` Swagger UI available at: http://localhost:3000/api`);
}

bootstrap();
