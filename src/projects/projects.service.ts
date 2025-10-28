import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { Tenant } from '../tenant/tenant.entity';
import { User } from '../users/user.entity';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/createProjectDto.dto';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Project) private readonly repo: Repository<Project>) {}

  findAll(): Promise<Project[]> {
    return this.repo.find({ relations: ['owner', 'tasks', 'tenant'] });
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.repo.findOne({ where: { id }, relations: ['owner', 'tasks', 'tenant'] });
    if (!project) throw new NotFoundException(`Project ${id} not found`);
    return project;
  }

  async create(data: CreateProjectDto): Promise<Project> {
    const owner = await this.repo.manager.findOne(User, { where: { id: data.ownerId } });
    if (!owner) throw new NotFoundException(`Owner ${data.ownerId} not found`);

    const tenant = await this.repo.manager.findOne(Tenant, { where: { id: data.tenantId } });
    if (!tenant) throw new NotFoundException(`Tenant ${data.tenantId} not found`);

    const project = this.repo.create({
      name: data.name,
      description: data.description,
      owner,
      tenant,
    });

    return this.repo.save(project);
  }

  async update(id: number, data: UpdateProjectDto): Promise<Project> {
    const project = await this.repo.findOne({ where: { id }, relations: ['owner', 'tenant'] });
    if (!project) throw new NotFoundException(`Project ${id} not found`);

    if (data.ownerId) {
      const owner = await this.repo.manager.findOne(User, { where: { id: data.ownerId } });
      if (!owner) throw new NotFoundException(`Owner ${data.ownerId} not found`);
      project.owner = owner;
    }

    if (data.tenantId) {
      const tenant = await this.repo.manager.findOne(Tenant, { where: { id: data.tenantId } });
      if (!tenant) throw new NotFoundException(`Tenant ${data.tenantId} not found`);
      project.tenant = tenant;
    }

    if (data.name !== undefined) project.name = data.name;
    if (data.description !== undefined) project.description = data.description;

    return this.repo.save(project);
  }

  async delete(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Project ${id} not found`);
  }
}
