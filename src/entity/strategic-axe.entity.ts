import { Column, Model, Table, HasOne } from 'sequelize-typescript';
import { StrategicObjective } from './strategic-objective.entity';

@Table({ tableName: 'Axes_Strategiques', updatedAt: false, createdAt: false })
export class StrategicAxe extends Model<StrategicAxe> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_AxeStrategique',
  })
  id: number;

  @Column({ field: 'AxeStrategique' })
  label: string;

  @HasOne(() => StrategicObjective)
  strategicObjectives: StrategicObjective[];
}
