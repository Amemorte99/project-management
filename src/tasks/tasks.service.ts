import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../users/user.entity';
import { Project } from '../projects/project.entity';
import { Tenant } from '../tenant/tenant.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private readonly repo: Repository<Task>) {}

  findAll(): Promise<Task[]> {
    return this.repo.find({ relations: ['assignedTo', 'createdBy', 'project', 'tenant'] });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.repo.findOne({
      where: { id },
      relations: ['assignedTo', 'createdBy', 'project', 'tenant', 'comments'],
    });
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    return task;
  }

  async create(data: CreateTaskDto): Promise<Task> {
    const assignedTo = await this.repo.manager.findOne(User, { where: { id: data.assignedToId } });
    if (!assignedTo) throw new NotFoundException(`User ${data.assignedToId} not found`);

    const createdBy = await this.repo.manager.findOne(User, { where: { id: data.createdById } });
    if (!createdBy) throw new NotFoundException(`User ${data.createdById} not found`);

    const project = await this.repo.manager.findOne(Project, { where: { id: data.projectId } });
    if (!project) throw new NotFoundException(`Project ${data.projectId} not found`);

    const tenant = await this.repo.manager.findOne(Tenant, { where: { id: data.tenantId } });
    if (!tenant) throw new NotFoundException(`Tenant ${data.tenantId} not found`);

    const task = this.repo.create({
      title: data.title,
      description: data.description,
      status: data.status ?? 'TODO',
      assignedTo,
      createdBy,
      project,
      tenant,
    });

    return this.repo.save(task);
  }

  async update(id: number, data: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);

    if (data.assignedToId) {
      const assignedTo = await this.repo.manager.findOne(User, { where: { id: data.assignedToId } });
      if (!assignedTo) throw new NotFoundException(`User ${data.assignedToId} not found`);
      task.assignedTo = assignedTo;
    }

    if (data.title !== undefined) task.title = data.title;
    if (data.description !== undefined) task.description = data.description;
    if (data.status !== undefined) task.status = data.status;

    return this.repo.save(task);
  }

  async delete(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Task ${id} not found`);
  }
}
