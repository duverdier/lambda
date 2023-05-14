import { Column, Model, Table, HasOne } from 'sequelize-typescript';
import { PerformanceIndicator } from './performance-indicator.entity';

@Table({ tableName: 'Contrats', updatedAt: false, createdAt: false })
export class Contrat extends Model<Contrat> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_Contrat',
  })
  id: number;

  @Column({ field: 'Contrat' })
  label: string;

  @HasOne(() => PerformanceIndicator)
  performanceIndicators: PerformanceIndicator[];
}
