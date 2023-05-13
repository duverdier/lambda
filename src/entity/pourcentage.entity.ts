import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { PlanActions } from './plan_actions.entity';

@Table({ tableName: 'Pourcentages', updatedAt: false, createdAt: false })
export class Pourcentage extends Model<Pourcentage> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_Pourcentage',
  })
  id: number;

  @Column({ field: 'Pourcentage' })
  pourcentage: string;

  @Column({ field: 'Action' })
  action: string;

  @BelongsTo(() => PlanActions)
  PlanAction: PlanActions;

  @ForeignKey(() => PlanActions)
  @Column({ field: 'Id_PlanAction' })
  planActionId?: number; // jointure avec plan-actions

  @Column({ field: 'DateCreated' })
  dateCreated: string;
}
