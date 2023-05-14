import { Column, Model, Table, HasOne, BelongsTo, ForeignKey, DataType } from 'sequelize-typescript';
import { StrategicOrientation } from './strategic-orientation.entity';
import { StrategicAxe } from './strategic-axe.entity';
import { OperationalObjective } from './operational-objective.entity';

@Table({ tableName: 'Objectifs_Strategiques', updatedAt: false, createdAt: false })
export class StrategicObjective extends Model<StrategicObjective> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_ObjectifStrategique',
  })
  id: number;

  @Column({ field: 'NumeroObjectifStrategique' })
  numero: string;

  @Column({ field: 'ObjectifStrategique', type: DataType.TEXT })
  label: string;

  @BelongsTo(() => StrategicAxe)
  strategicAxe: StrategicAxe;

  @ForeignKey(() => StrategicAxe)
  @Column({ field: 'Id_AxeStrategique' })
  axeStrategiqueId?: number; //jointure avec strategic-axe

  @HasOne(() => StrategicOrientation)
  strategicOrientations: StrategicOrientation[];

  @HasOne(() => OperationalObjective)
  operationalObjectives: OperationalObjective[];
}
