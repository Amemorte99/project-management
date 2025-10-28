import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProjectDto } from './dto/ProjectDto.dto';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly service: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les projets' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un projet par ID' })
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un projet' })
  create(@Body() data: ProjectDto) {
    return this.service.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un projet' })
  update(@Param('id') id: number, @Body() data: Partial<ProjectDto>) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un projet' })
  remove(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
