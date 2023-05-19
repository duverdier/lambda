import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class StrategicObjectiveDto {
  @IsNotEmpty()
  @ApiProperty()
  numero: string;

  @IsNotEmpty()
  @ApiProperty()
  label: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumberString()
  axeStrategiqueId: number;
}

export class UpdateStrategicObjectiveDto extends PartialType(StrategicObjectiveDto) {}
