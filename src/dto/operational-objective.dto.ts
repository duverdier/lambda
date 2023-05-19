import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class OperationalObjectiveDto {
  @IsNotEmpty()
  @ApiProperty()
  label: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumberString()
  orientationStrategiqueId: number;
}

export class UpdateOperationalObjectiveDto extends PartialType(OperationalObjectiveDto) {}
