import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly repo: Repository<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.repo.find({ relations: ['owner', 'tasks'] });
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.repo.findOne({ where: { id }, relations: ['owner', 'tasks'] });
    if (!project) throw new NotFoundException(`Project ${id} not found`);
    return project;
  }

  async create(data: Partial<Project>): Promise<Project> {
    const project = this.repo.create(data);
    return this.repo.save(project);
  }

 async update(id: number, data: Partial<Project>): Promise<Project> {
  const project = await this.repo.preload({ id, ...data });
  if (!project) throw new NotFoundException(`Project ${id} not found`);
  return this.repo.save(project); // ✅ Gère owner, tenantId, etc.
}


  async delete(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Project ${id} not found`);
  }

  async findAllByTenant(tenantId: number): Promise<Project[]> {
    return this.repo.find({
      where: { tenantId },
      relations: ['owner', 'tasks'],
    });
  }

  async findAllByOwner(ownerId: number): Promise<Project[]> {
    return this.repo.find({
      where: { owner: { id: ownerId } },
      relations: ['owner', 'tasks'],
    });
  }
}
