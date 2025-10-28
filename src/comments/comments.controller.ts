import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a comment' })
  create(@Body() data: CreateCommentDto) {
    return this.service.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a comment' })
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateCommentDto) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }

  @Get('task/:taskId')
  @ApiOperation({ summary: 'Retrieve comments for a specific task' })
  findByTask(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.service.findByTask(taskId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Retrieve comments by a specific user' })
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.service.findByUser(userId);
  }
}
