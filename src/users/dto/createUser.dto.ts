import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe' })
  username: string;

  @ApiProperty({ example: 'strongpassword' })
  password: string;

  @ApiProperty({ example: 1, description: 'Tenant ID' })
  tenantId: number;
}