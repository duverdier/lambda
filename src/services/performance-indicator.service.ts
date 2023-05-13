import { Inject, Injectable } from '@nestjs/common';
import { PerformanceIndicator, IndicateurPSDs } from '../entity';
import { IndicateurPSDsService } from './indicateur-PSDs.service';
import { PlanVersionService } from './plan-version.service';

@Injectable()
export class PerformanceIndicatorService {
  constructor(
    @Inject('PERFORMANCE_INDICATOR_REPOSITORY')
    private readonly performanceIndicatorRepository: typeof PerformanceIndicator,
    private readonly indicateurPSDsService: IndicateurPSDsService,
    private readonly planVersionService: PlanVersionService,
  ) {}
  async createPerformanceIndicatorWithIndicatorPSDAndVersionsPSD(
    id: number,
    performanceIndicator: {
      indicateursDePerformance: string;
      year: string;
      objectifOperationnelId: number;
      contratId: number;
      structureId: number;
      observation: string;
      projectName: string;
      result: string;
    },
  ) {
    const planVersionCreated = await this.planVersionService.createPlanVersion({
      dateCreated: new Date().toISOString(),
      name: `V${new Date().getFullYear()}`,
    });
    const performanceIndicatorCreated = await this.performanceIndicatorRepository.create<PerformanceIndicator>(
      performanceIndicator,
    );
    return await this.indicateurPSDsService.createIndicateurPSDs({
      indicateursDePerformanceId: performanceIndicatorCreated.id,
      versionId: planVersionCreated.id,
      valeurPSD: performanceIndicator.indicateursDePerformance,
    } as IndicateurPSDs);
  }

  async createPerformanceIndicator(performanceIndicator: {
    id: number;
    indicateursDePerformance: string;
    year: string;
    projectName: string;
    result: string;
    objectifOperationnelId: number;
    contratId: number;
    structureId: number;
    observation: string;
  }) {
    try {
      const {
        id,
        indicateursDePerformance,
        year,
        projectName,
        result,
        objectifOperationnelId,
        contratId,
        structureId,
        observation,
      } = performanceIndicator;
      const performanceIndicatorObject = await this.getPerformanceIndicatorObject({
        indicateursDePerformance,
        year: `${year}`,
        objectifOperationnelId,
        contratId: contratId,
        structureId: structureId,
        observation,
        projectName,
        result,
      });
      return await this.createPerformanceIndicatorWithIndicatorPSDAndVersionsPSD(id, performanceIndicatorObject);
    } catch (error) {
      console.log('error: ', error);
    }
  }

  getPerformanceIndicators() {
    return this.performanceIndicatorRepository.findAll<PerformanceIndicator>();
  }

  async getPerformanceIndicatorById(id: number) {
    return await this.performanceIndicatorRepository.findOne<PerformanceIndicator>({
      where: { id },
      raw: true,
      nest: true,
    });
  }

  async updatePerformanceIndicator(id: number, data: any) {
    return await this.performanceIndicatorRepository.update(data, { where: { id } });
  }

  async getPerformanceIndicatorObject(data: any) {
    !data.id && delete data.id;
    !data.contratId && delete data.contratId;
    !data.structureId && delete data.structureId;
    !data.objectifOperationnelId && delete data.objectifOperationnelId;
    return data;
  }
}
