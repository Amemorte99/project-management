import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/createProjectDto.dto';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly service: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all projects' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a project by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a project' })
  create(@Body() data: CreateProjectDto) {
    return this.service.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a project' })
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateProjectDto) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
