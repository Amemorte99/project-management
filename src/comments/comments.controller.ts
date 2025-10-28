import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly service: CommentsService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all comments' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a comment by ID' })
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a comment' })
  create(@Body() data: Partial<Comment>) {
    return this.service.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a comment' })
  update(@Param('id') id: number, @Body() data: Partial<Comment>) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment' })
  remove(@Param('id') id: number) {
    return this.service.delete(id);
  }

  @Get('task/:taskId')
  @ApiOperation({ summary: 'Retrieve comments for a specific task' })
  findByTask(@Param('taskId') taskId: number) {
    return this.service.findByTask(taskId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Retrieve comments by a specific user' })
  findByUser(@Param('userId') userId: number) {
    return this.service.findByUser(userId);
  }
}
