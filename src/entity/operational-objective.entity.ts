import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Objectifs_Operationnels' })
export class OperationalObjective extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_ObjectifOperationnel',
  })
  id: number;

  @Column({ field: 'ObjectifOperationnel' })
  label: string;
}
