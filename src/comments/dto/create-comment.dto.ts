import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'This is a comment', description: 'Content of the comment' })
  content: string;

  @ApiProperty({ example: 1, description: 'ID of the author user' })
  authorId: number;

  @ApiProperty({ example: 1, description: 'ID of the task' })
  taskId: number;
}
