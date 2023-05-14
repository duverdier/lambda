import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  roleId: number;

  @ApiProperty()
  @IsNotEmpty()
  typeF: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  structureId: number;
}
