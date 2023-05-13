import { IsEnum, IsNotEmpty, NotEquals, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TypeStructure } from '../utils/enums/type-structure.enum';

export class StructureDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsEnum(TypeStructure)
  @NotEquals(TypeStructure[TypeStructure.CONTROLLEUR])
  typeStructure: string;

  @IsNotEmpty()
  @ApiProperty()
  structureName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  roleId: number;
}
