import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }
async findByUsername(username: string): Promise<User | undefined> {
  const user = await this.repo.findOne({ where: { username } });
  return user ?? undefined; // <-- transforme null en undefined
}


    async create(userData: Partial<User>): Promise<User> {
    if (!userData.username || !userData.password) {
        throw new BadRequestException('Username and password are required');
    }
    userData.password = await bcrypt.hash(userData.password, 10);
    const user = this.repo.create(userData);
    return this.repo.save(user);
    }


  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
}
