import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Axes_Strategiques' })
export class StrategicAxe extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_Contrat',
  })
  id: number;

  @Column({ field: 'AxeStrategique' })
  label: string;
}
