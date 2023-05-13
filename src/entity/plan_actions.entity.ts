import { Column, HasOne, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Pourcentage } from './pourcentage.entity';
import { PerformanceIndicator } from './performance-indicator.entity';

@Table({ tableName: 'Plan_Actions', updatedAt: false, createdAt: false })
export class PlanActions extends Model<PlanActions> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_Action',
  })
  id: number;

  @BelongsTo(() => PerformanceIndicator)
  performanceIndicator: PerformanceIndicator;

  @ForeignKey(() => PerformanceIndicator)
  @Column({ field: 'Id_IndicateursDePerformance' })
  performanceIndicatorId: number; // jointure avec performance indicator

  @Column({ field: 'Action' })
  action: string;

  @Column({ field: 'Livrable' })
  livrable: string;

  @Column({ field: 'DateEcheance' })
  dateEcheance: string;

  @Column({ field: 'StatusAction' })
  statusAction: string;

  @Column({ field: 'Observation' })
  observation: string;

  @Column({ field: 'Difficulte' })
  difficulte: string;

  @Column({ field: 'DecisionsDirectionGenerale' })
  decisionsDirectionGenerale: string;

  @Column({ field: 'DecisionsStructure' })
  decisionsStructure: string;

  @HasOne(() => Pourcentage)
  pourcentages: Pourcentage[];
}
