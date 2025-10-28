import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly service: CommentsService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les commentaires' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un commentaire par ID' })
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un commentaire' })
  create(@Body() data: Partial<Comment>) {
    return this.service.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un commentaire' })
  update(@Param('id') id: number, @Body() data: Partial<Comment>) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un commentaire' })
  remove(@Param('id') id: number) {
    return this.service.delete(id);
  }

  @Get('task/:taskId')
  @ApiOperation({ summary: 'Récupérer les commentaires d’une tâche' })
  findByTask(@Param('taskId') taskId: number) {
    return this.service.findByTask(taskId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Récupérer les commentaires d’un utilisateur' })
  findByUser(@Param('userId') userId: number) {
    return this.service.findByUser(userId);
  }
}
