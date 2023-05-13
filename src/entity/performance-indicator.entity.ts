import { Column, Model, Table, HasOne, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { PlanActions } from './plan_actions.entity';
import { Structure } from './structure.entity';
import { Contrat } from './contrat.entity';
import { OperationalObjective } from './operational-objective.entity';
import { IndicateurPSDs } from './indicateur-PSDs.entity';

@Table({ tableName: 'Indicateurs_De_Performances', updatedAt: false, createdAt: false })
export class PerformanceIndicator extends Model<PerformanceIndicator> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_IndicateursDePerformance',
  })
  id: number;

  @Column({ field: 'IndicateursDePerformance', type: DataType.TEXT })
  indicateursDePerformance: string;

  @Column({ field: 'Annee' })
  year: string;

  @Column({ field: 'NomProjetSpecial' })
  projectName: string;

  @Column({ field: 'Resultat', type: DataType.TEXT })
  result: string;

  @BelongsTo(() => OperationalObjective)
  operationalObjective: OperationalObjective;

  @ForeignKey(() => OperationalObjective)
  @Column({ field: 'Id_ObjectifOperationnel' })
  objectifOperationnelId: number; //jointure avec operational-objective

  @BelongsTo(() => Contrat)
  contrat: Contrat;

  @ForeignKey(() => Contrat)
  @Column({ field: 'Id_Contrat' })
  contratId: number; //jointure avec contrat

  @BelongsTo(() => Structure)
  structure: Structure;

  @ForeignKey(() => Structure)
  @Column({ field: 'Id_Structure' })
  structureId: number; // jointure avec structure

  @Column({ field: 'Observation', type: DataType.TEXT })
  observation: string;

  @HasOne(() => PlanActions)
  planActions: PlanActions[];

  @HasOne(() => IndicateurPSDs)
  indicateurPSDs: IndicateurPSDs[];
}
