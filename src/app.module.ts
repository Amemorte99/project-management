import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { CommentsModule } from './comments/comments.module';
import { User } from './users/user.entity';
import { Project } from './projects/project.entity';
import { Task } from './tasks/task.entity';
import { Comment } from './comments/comment.entity';
import { Tenant } from './tenant/tenant.entity';

@Module({
  imports: [
    // Load environment variables globally
    ConfigModule.forRoot({ isGlobal: true }),

    // Database configuration (MySQL for local, PostgreSQL for Render)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const dbType = config.get<string>('DB_TYPE');

        // If DATABASE_URL exists → use PostgreSQL (Render environment)
        if (dbType === 'postgres' || config.get<string>('DATABASE_URL')) {
            return {
              type: 'postgres',
              url: config.get<string>('DATABASE_URL'),
              ssl: { rejectUnauthorized: false }, // important pour Render
              entities: [User, Project, Task, Comment, Tenant],
              synchronize: true,
            };
        }
     // Otherwise → use MySQL (local development environment)
        return {
          type: 'mysql',
          host: config.get<string>('DB_HOST'),
          port: parseInt(config.get<string>('DB_PORT') || '3306', 10),
          username: config.get<string>('DB_USER'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          entities: [User, Project, Task, Comment, Tenant],
          synchronize: true, // Automatically sync entities (disable in production)
        };
      },
    }),

    // Application modules
    UsersModule,
    ProjectsModule,
    TasksModule,
    CommentsModule,
  ],
})
export class AppModule {}
