import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './tenant.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Injectable()
export class TenantsService {
  constructor(@InjectRepository(Tenant) private readonly repo: Repository<Tenant>) {}

  findAll(): Promise<Tenant[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Tenant> {
    const tenant = await this.repo.findOne({ where: { id } });
    if (!tenant) throw new NotFoundException(`Tenant ${id} not found`);
    return tenant;
  }

  create(data: CreateTenantDto): Promise<Tenant> {
    const tenant = this.repo.create(data);
    return this.repo.save(tenant);
  }

  async update(id: number, data: UpdateTenantDto): Promise<Tenant> {
    const tenant = await this.repo.preload({ id, ...data });
    if (!tenant) throw new NotFoundException(`Tenant ${id} not found`);
    return this.repo.save(tenant);
  }

  async delete(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Tenant ${id} not found`);
  }
}
