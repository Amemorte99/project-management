import { Module } from '@nestjs/common';
import { Comment } from './comments/comment.entity';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { CommentsModule } from './comments/comments.module';
import { Project } from './projects/project.entity';
import { Task } from './tasks/task.entity';
import { User } from './users/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Tenant } from './tenant/tenant.entity';

@Module({
  imports: [
   ConfigModule.forRoot({ isGlobal: true }),
   TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'mysql',
    host: config.get<string>('DB_HOST'),
    port: parseInt(config.get<string>('DB_PORT') || '3306', 10),
    username: config.get<string>('DB_USER'),
    password: config.get<string>('DB_PASSWORD'),
    database: config.get<string>('DB_NAME'),
    entities: [User, Project, Task, Comment,Tenant],
    synchronize: true,
  }),
}),

    UsersModule,
    ProjectsModule,
    TasksModule,
    CommentsModule,
  ],
})
export class AppModule {}
