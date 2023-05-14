import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Structure } from './structure.entity';

@Table({ tableName: 'Point_focaux', updatedAt: false, createdAt: false })
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_PointFocal',
  })
  id: number;

  @Column({ field: 'Nom' })
  name: string;

  @Column({ field: 'Numero' })
  phoneNumber: string;

  @Column
  password: string;

  @Column
  email: string;

  @Column({ field: 'TypeF' })
  typeF: string;

  @BelongsTo(() => Structure)
  structure: Structure;

  @ForeignKey(() => Structure)
  @Column({ field: 'Id_Structure' })
  structureId?: number;
}
