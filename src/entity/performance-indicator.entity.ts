import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'KPIs' })
export class PerformanceIndicator extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_IndicateursDePerformance',
  })
  id: number;

  @Column({ field: 'IndicateursDePerformance' })
  IndicateursDePerformance: string;

  @Column({ field: 'annee' })
  year: string;

  @Column({ field: 'NomProjetSpecial' })
  projectName: string;

  @Column({ field: 'Resultat' })
  result: string;
}
