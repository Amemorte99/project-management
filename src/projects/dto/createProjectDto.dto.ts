import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'Projet Alpha' })
  name: string;

  @ApiProperty({ example: 1, description: 'ID of owner user' })
  ownerId: number;

  @ApiProperty({ example: 1, description: 'ID of tenant' })
  tenantId: number;

  @ApiProperty({ example: 'Optional description', required: false })
  description?: string;
}