import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'VersionPSD' })
export class PlanVersion extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: 'Idversion',
  })
  id: number;

  @Column({ field: 'nom' })
  name: string;

  @Column
  DateCreated: string;

  @Column
  DateEnd: string;
}
