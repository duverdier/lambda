import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Contrat' })
export class Contrat extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_Contrat',
  })
  id: number;

  @Column
  label: string;
}
