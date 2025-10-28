import { ApiProperty } from '@nestjs/swagger';

export class ProjectDto {
  @ApiProperty({ example: 1, description: 'ID du projet' })
  id?: number;

  @ApiProperty({ example: 'Projet Alpha', description: 'Nom du projet' })
  name: string;

  @ApiProperty({ example: 123, description: 'ID du propriétaire' })
  ownerId: number;

  @ApiProperty({ example: 1, description: 'ID du tenant' })
  tenantId: number;
}
