import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto {
  @ApiProperty({ example: 'Tenant Alpha', description: 'Name of the tenant' })
  name: string;

  @ApiProperty({ example: 'Optional description', description: 'Tenant description', required: false })
  description?: string;
}