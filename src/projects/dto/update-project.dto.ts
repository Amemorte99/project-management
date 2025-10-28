import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto {
  @ApiProperty({ example: 'Updated Project Name', required: false })
  name?: string;

  @ApiProperty({ example: 2, description: 'Owner user ID', required: false })
  ownerId?: number;

  @ApiProperty({ example: 2, description: 'Tenant ID', required: false })
  tenantId?: number;

  @ApiProperty({ example: 'Optional updated description', required: false })
  description?: string;
}