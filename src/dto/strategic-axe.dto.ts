import { IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class StrategicAxeDto {
  @ApiProperty()
  @IsNotEmpty()
  label: string;
}

export class UpdateStrategicAxeDto extends PartialType(StrategicAxeDto) {}
