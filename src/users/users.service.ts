import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/createUser.dto';
import { Tenant } from '../tenant/tenant.entity';

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


async create(data: CreateUserDto): Promise<User> {
  // Find tenant
  const tenant = await this.repo.manager.findOne(Tenant, { where: { id: data.tenantId } });
  if (!tenant) throw new NotFoundException(`Tenant ${data.tenantId} not found`);

  // Optional: hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = this.repo.create({
    username: data.username,
    password: hashedPassword,
    tenant,
  });

  return this.repo.save(user);
}


}
