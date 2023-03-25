import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Direction', updatedAt: false, createdAt: false })
export class Structure extends Model<Structure> {
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
