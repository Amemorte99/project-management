import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly repo: Repository<Comment>,
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.repo.find({ relations: ['author', 'task'] });
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.repo.findOne({ where: { id }, relations: ['author', 'task'] });
    if (!comment) throw new NotFoundException(`Comment ${id} not found`);
    return comment;
  }

  async create(data: Partial<Comment>): Promise<Comment> {
    const comment = this.repo.create(data);
    return this.repo.save(comment);
  }

  async update(id: number, data: Partial<Comment>): Promise<Comment> {
    const comment = await this.repo.preload({ id, ...data });
    if (!comment) throw new NotFoundException(`Comment ${id} not found`);
    return this.repo.save(comment);
  }

  async delete(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Comment ${id} not found`);
  }

  async findByTask(taskId: number): Promise<Comment[]> {
    return this.repo.find({ where: { task: { id: taskId } }, relations: ['author', 'task'] });
  }

  async findByUser(userId: number): Promise<Comment[]> {
    return this.repo.find({ where: { author: { id: userId } }, relations: ['author', 'task'] });
  }
}
