import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PlanStrategiqueDto {
  @ApiProperty()
  Contrat: string;

  @ApiProperty()
  @IsNumberString()
  contratId: number;

  @ApiProperty()
  TypeStructure: string;

  @ApiProperty()
  StructureName: string;

  @ApiProperty()
  @IsNumberString()
  structureId: number;

  @ApiProperty()
  AxeStrategique: string;

  @ApiProperty()
  @IsNumberString()
  axeStrategiqueId: number;

  @ApiProperty()
  @IsNumberString()
  strategicObjectiveId: number;

  @ApiProperty()
  NumeroObjectifStrategique: string;

  @ApiProperty()
  ObjectifStrategique: string;

  @ApiProperty()
  @IsNumberString()
  strategicOrientationId: number;

  @ApiProperty()
  OrientationStrategique: string;

  @ApiProperty()
  ObjectifOperationnel: string;

  @ApiProperty()
  @IsNumberString()
  objectifOperationnelId: number; //

  @ApiProperty()
  @IsNotEmpty()
  IndicateursDePerformance: string;

  @ApiProperty()
  @IsNotEmpty()
  Annee: string;

  @ApiProperty()
  @IsNotEmpty()
  NomProjetSpecial: string;

  @ApiProperty()
  @IsNotEmpty()
  Resultat: string;

  @ApiProperty()
  @IsNotEmpty()
  Observation: string;
}
