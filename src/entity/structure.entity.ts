import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Direction' })
export class Structure extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: 'IDStructure',
  })
  id: number;

  @Column({ field: 'TypeStructure' })
  typeStructure: string;

  @Column({ field: 'StructureName' })
  structureName: string;
}
