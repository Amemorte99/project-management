import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly repo: Repository<Task>,
  ) {}

  // Retrieve all tasks with relations
  async findAll(): Promise<Task[]> {
    return this.repo.find({ relations: ['project', 'assignedTo', 'createdBy', 'comments'] });
  }

  // Retrieve a single task by ID with relations
  async findOne(id: number): Promise<Task> {
    const task = await this.repo.findOne({ 
      where: { id }, 
      relations: ['project', 'assignedTo', 'createdBy', 'comments'] 
    });
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    return task;
  }

  // Update a task by ID
  async update(id: number, data: Partial<Task>): Promise<Task> {
    const task = await this.repo.preload({ id, ...data });
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    return this.repo.save(task);
  }

  // Delete a task by ID
  async delete(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Task ${id} not found`);
  }

  // Find tasks by project ID
  async findByProject(projectId: number): Promise<Task[]> {
    return this.repo.find({
      where: { project: { id: projectId } },
      relations: ['project', 'assignedTo', 'createdBy', 'comments'],
    });
  }

  // Find tasks by user (assigned or created)
  async findByUser(userId: number): Promise<Task[]> {
    return this.repo.find({
      where: [{ assignedTo: { id: userId } }, { createdBy: { id: userId } }],
      relations: ['project', 'assignedTo', 'createdBy', 'comments'],
    });
  }

  // Find tasks by project and tenant (multi-tenant filtering)
  async findAllByProject(projectId: number, tenantId: number): Promise<Task[]> {
    return this.repo.find({ 
      where: { project: { id: projectId, tenant: { id: tenantId } } },
      relations: ['assignedTo', 'createdBy', 'comments']
    });
  }

  // Create a task linked to a project and tenant
async create(data: Partial<Task>, tenantId?: number) {
  if (!tenantId) throw new Error('Tenant ID is required to create a task');
  const task = this.repo.create({ ...data });
  task.project = { id: data.project?.id, tenant: { id: tenantId } } as any;
  return this.repo.save(task);
}


}
