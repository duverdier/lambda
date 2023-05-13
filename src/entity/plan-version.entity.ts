import { Column, Model, Table, HasOne } from 'sequelize-typescript';
import { IndicateurPSDs } from './indicateur-PSDs.entity';

@Table({ tableName: 'VersionPSD', updatedAt: false, createdAt: false })
export class PlanVersion extends Model<PlanVersion> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_Version',
  })
  id: number;

  @Column({ field: 'nom' })
  name: string;

  @Column({ field: 'DateCreated' })
  dateCreated: string;

  @Column({ field: 'DateEnd' })
  dateEnd: string;

  @HasOne(() => IndicateurPSDs)
  indicateurPSDs: IndicateurPSDs[];
}
