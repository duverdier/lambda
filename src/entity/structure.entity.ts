import { Column, HasOne, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.entity';
import { PerformanceIndicator } from './performance-indicator.entity';
import { Role } from './role.entity';

@Table({ tableName: 'Structures', updatedAt: false, createdAt: false })
export class Structure extends Model<Structure> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_Structure',
  })
  id: number;

  @Column({ field: 'TypeStructure' })
  typeStructure: string;

  @Column({ field: 'StructureName' })
  structureName: string;

  @BelongsTo(() => Role)
  role: Role;

  @ForeignKey(() => Role)
  @Column({ field: 'Id_Role' })
  roleId?: number;

  @HasOne(() => User)
  users: User[];

  @HasOne(() => PerformanceIndicator)
  performanceIndicators: PerformanceIndicator[];
}
