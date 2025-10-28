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

  async findAll(): Promise<Task[]> {
    return this.repo.find({ relations: ['project', 'assignedTo', 'createdBy', 'comments'] });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.repo.findOne({ where: { id }, relations: ['project', 'assignedTo', 'createdBy', 'comments'] });
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    return task;
  }

  async create(data: Partial<Task>): Promise<Task> {
    const task = this.repo.create(data);
    return this.repo.save(task);
  }

  async update(id: number, data: Partial<Task>): Promise<Task> {
    const task = await this.repo.preload({ id, ...data });
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    return this.repo.save(task);
  }

  async delete(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Task ${id} not found`);
  }

  async findByProject(projectId: number): Promise<Task[]> {
    return this.repo.find({
      where: { project: { id: projectId } },
      relations: ['project', 'assignedTo', 'createdBy', 'comments'],
    });
  }

  async findByUser(userId: number): Promise<Task[]> {
    return this.repo.find({
      where: [{ assignedTo: { id: userId } }, { createdBy: { id: userId } }],
      relations: ['project', 'assignedTo', 'createdBy', 'comments'],
    });
  }
}
