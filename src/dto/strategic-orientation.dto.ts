import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class StrategicOrientationDto {
  @IsNotEmpty()
  @ApiProperty()
  label: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumberString()
  objectifStrategiqueId: number;
}

export class UpdateStrategicOrientationDto extends PartialType(StrategicOrientationDto) {}
