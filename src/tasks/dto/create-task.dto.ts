import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Implement login', description: 'Title of the task' })
  title: string;

  @ApiProperty({ example: 'Implement login using JWT', description: 'Detailed description of the task', required: false })
  description?: string;

  @ApiProperty({ example: 'TODO', description: 'Status of the task', required: false })
  status?: string;

  @ApiProperty({ example: 1, description: 'User ID assigned to the task' })
  assignedToId: number;

  @ApiProperty({ example: 1, description: 'User ID who created the task' })
  createdById: number;

  @ApiProperty({ example: 1, description: 'Project ID to which the task belongs' })
  projectId: number;

  @ApiProperty({ example: 1, description: 'Tenant ID' })
  tenantId: number;
}