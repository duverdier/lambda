import { Column, HasOne, Model, Table } from 'sequelize-typescript';
import { Structure } from './structure.entity';

@Table({ tableName: 'Roles', updatedAt: false, createdAt: false })
export class Role extends Model<Role> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_Role',
  })
  id: number;

  @Column({ field: 'Roles' })
  roles: string;

  @HasOne(() => Structure)
  structures: Structure[];
}
