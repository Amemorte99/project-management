import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  findAll(): Promise<User[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un utilisateur par ID' })
  findOne(@Param('id') id: number): Promise<User> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un utilisateur' })
  create(@Body() data: Partial<User>): Promise<User> {
    return this.service.create(data);
  }
}
