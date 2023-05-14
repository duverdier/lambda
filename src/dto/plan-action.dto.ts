import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PlanActionDto {
  @ApiProperty()
  action: string;

  @ApiProperty()
  livrable: string;

  @ApiProperty()
  dateEcheance: string;

  @ApiProperty()
  statusAction: string;

  @ApiProperty()
  observation: string;

  @ApiProperty()
  difficulte: string;

  @ApiProperty()
  decisionsDirectionGenerale: string;

  @ApiProperty()
  decisionsStructure: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  performanceIndicatorId: number;
}
