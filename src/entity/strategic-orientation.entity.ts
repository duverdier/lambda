import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Orientations_Strategiques' })
export class StrategicOrientation extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_OrientationStrategique',
  })
  id: number;

  @Column({ field: 'OrientationStrategique' })
  label: string;
}
