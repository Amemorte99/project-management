import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly service: TasksService) {}

  // Get all tasks
  @Get()
  @ApiOperation({ summary: 'Retrieve all tasks' })
  findAll() {
    return this.service.findAll();
  }

  // Get a task by its ID
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a task by ID' })
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  // Create a new task
  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  create(@Body() data: Partial<Task>) {
    return this.service.create(data, data.project?.tenant?.id);
  }

  // Update an existing task
  @Put(':id')
  @ApiOperation({ summary: 'Update a task' })
  update(@Param('id') id: number, @Body() data: Partial<Task>) {
    return this.service.update(id, data);
  }

  // Delete a task
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  remove(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
