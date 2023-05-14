import { Column, Model, Table, BelongsTo, ForeignKey, DataType } from 'sequelize-typescript';
import { StrategicObjective } from './strategic-objective.entity';

@Table({ tableName: 'Orientations_Strategiques', updatedAt: false, createdAt: false })
export class StrategicOrientation extends Model<StrategicOrientation> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_OrientationStrategique',
  })
  id: number;

  @Column({ field: 'OrientationStrategique', type: DataType.TEXT })
  label: string;

  @BelongsTo(() => StrategicObjective)
  strategicObjective: StrategicObjective;

  @ForeignKey(() => StrategicObjective)
  @Column({ field: 'Id_ObjectifStrategique' })
  objectifStrategiqueId?: number; // jointure avec strategic-objective
}
