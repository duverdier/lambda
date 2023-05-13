import { IsNotEmpty, IsEnum, NotEquals } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TypeStructure } from '../utils/enums/type-structure.enum';

export class RoleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TypeStructure)
  @NotEquals(TypeStructure[TypeStructure.ROOT])
  roles: string;
}
