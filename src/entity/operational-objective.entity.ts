import { Column, Model, Table, HasOne, BelongsTo, ForeignKey, DataType } from 'sequelize-typescript';
import { PerformanceIndicator } from './performance-indicator.entity';
import { StrategicObjective } from './strategic-objective.entity';

@Table({ tableName: 'Objectifs_Operationnels', updatedAt: false, createdAt: false })
export class OperationalObjective extends Model<OperationalObjective> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_ObjectifOperationnel',
  })
  id: number;

  @Column({ field: 'ObjectifOperationnel', type: DataType.TEXT })
  label: string;

  @BelongsTo(() => StrategicObjective)
  strategicObjective: StrategicObjective;

  @ForeignKey(() => StrategicObjective)
  @Column({ field: 'Id_OrientationStrategique' })
  orientationStrategiqueId: number; //jointure avec strategic-objective

  @HasOne(() => PerformanceIndicator)
  performanceIndicators: PerformanceIndicator[];
}
