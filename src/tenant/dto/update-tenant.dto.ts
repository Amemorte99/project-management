import { ApiProperty } from '@nestjs/swagger';

export class UpdateTenantDto {
  @ApiProperty({ example: 'Tenant Beta', description: 'New name of the tenant', required: false })
  name?: string;

  @ApiProperty({ example: 'Updated description', description: 'New description', required: false })
  description?: string;
}