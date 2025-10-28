import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

    async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.repo.findOne({ where: { username } });
    return user ?? undefined;
    }


  create(userData: Partial<User>) {
    const user = this.repo.create(userData);
    return this.repo.save(user);
  }
}
