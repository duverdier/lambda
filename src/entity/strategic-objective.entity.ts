import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Objectifs_Strategiques' })
export class StrategicObjective extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_ObjectifStrategique',
  })
  id: number;

  @Column({ field: 'NumeroObjectifStrategique' })
  numero: string;

  @Column({ field: 'ObjectifStrategique' })
  label: string;
}
