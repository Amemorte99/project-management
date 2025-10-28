import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({ example: 'Implement login', description: 'Title of the task', required: false })
  title?: string;

  @ApiProperty({ example: 'Implement login using JWT', description: 'Detailed description of the task', required: false })
  description?: string;

  @ApiProperty({ example: 'IN_PROGRESS', description: 'Status of the task', required: false })
  status?: string;

  @ApiProperty({ example: 1, description: 'User ID assigned to the task', required: false })
  assignedToId?: number;
}