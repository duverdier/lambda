import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PerformanceIndicatorDto {
  @ApiProperty()
  @IsNotEmpty()
  indicateursDePerformance: string;

  @ApiProperty()
  year: string;

  @ApiProperty()
  projectName: string;

  @ApiProperty()
  result: string;

  @ApiProperty()
  @IsNumberString()
  objectifOperationnelId: number;

  @ApiProperty()
  @IsNumberString()
  contratId: number;

  @ApiProperty()
  @IsNumberString()
  structureId: number;

  @ApiProperty()
  observation: string;
}
