import { Column, Model, Table, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { PlanVersion } from './plan-version.entity';
import { PerformanceIndicator } from './performance-indicator.entity';

@Table({ tableName: 'IndicateurPSDs', updatedAt: false, createdAt: false })
export class IndicateurPSDs extends Model<IndicateurPSDs> {
  @BelongsTo(() => PerformanceIndicator)
  performanceIndicator: PerformanceIndicator;

  @ForeignKey(() => PerformanceIndicator)
  @Column({ field: 'Id_IndicateurDePerformance' })
  indicateursDePerformanceId: number; // jointure avwc performance indicator PerformanceIndicator

  @BelongsTo(() => PlanVersion)
  planVersion: PlanVersion;

  @ForeignKey(() => PlanVersion)
  @Column({ field: 'Id_Version' })
  versionId: number; // jointure avec version

  @Column({ field: 'ValeurPSD', type: DataType.TEXT })
  valeurPSD: string;
}
