import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PerformanceIndicator, IndicateurPSDs, Contrat, Structure, OperationalObjective, PlanActions } from '../entity';
import { IndicateurPSDsService } from './indicateur-PSDs.service';
import { PlanVersionService } from './plan-version.service';
import { UserService } from './user.service';
import { MailService } from 'src/utils/mails/services/mails.service';

@Injectable()
export class PerformanceIndicatorService {
  constructor(
    @Inject('PERFORMANCE_INDICATOR_REPOSITORY')
    private readonly performanceIndicatorRepository: typeof PerformanceIndicator,
    private readonly indicateurPSDsService: IndicateurPSDsService,
    private readonly planVersionService: PlanVersionService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
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
    indicateursDePerformance: string;
    year: string;
    projectName: string;
    result: string;
    objectifOperationnelId: number;
    contratId: number;
    structureId: number;
    observation: string;
    id?: number;
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
    return this.performanceIndicatorRepository.findAll<PerformanceIndicator>({
      include: [
        { model: Contrat, required: false },
        { model: Structure, required: false },
        { model: OperationalObjective, required: false },
        { model: PlanActions, required: false },
        { model: IndicateurPSDs, required: false },
      ],
      raw: true,
      nest: true,
    });
  }

  getPerformanceIndicatorsByObjectifOperationnelId(objectifOperationnelId: number) {
    return this.performanceIndicatorRepository.findAll<PerformanceIndicator>({
      where: { objectifOperationnelId },
      include: [
        { model: Contrat, required: false },
        { model: Structure, required: false },
        { model: OperationalObjective, required: false },
        { model: PlanActions, required: false },
        { model: IndicateurPSDs, required: false },
      ],
      raw: true,
      nest: true,
    });
  }

  async getPerformanceIndicatorById(id: number) {
    return await this.performanceIndicatorRepository.findOne<PerformanceIndicator>({
      where: { id },
      include: [
        { model: Contrat, required: false },
        { model: Structure, required: false },
        { model: OperationalObjective, required: false },
        { model: PlanActions, required: false },
        { model: IndicateurPSDs, required: false },
      ],
      raw: true,
      nest: true,
    });
  }

  async updatePerformanceIndicator(id: number, data: any) {
    const performanceIndicator = await this.getPerformanceIndicatorById(id);
    if (!performanceIndicator) {
      throw new HttpException('PERFORMANCE_INDICATOR_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return await this.performanceIndicatorRepository.update(data, { where: { id } });
  }

  async assignPerformanceIndicatorStructure(id: number, structureId: number) {
    const user = await this.userService.findByStructureId(structureId);
    if (!user) {
      throw new HttpException('STRUCTURE_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    const performanceIndicatorObject = await this.performanceIndicatorRepository.update(
      { structureId },
      { where: { id } },
    );

    const url = process.env.UI_URL;

    this.mailService.assignPerformanceIndicatorStructure({
      url,
      fullName: user.name,
      email: user.email,
    });
    return performanceIndicatorObject;
  }

  async getPerformanceIndicatorObject(data: {
    indicateursDePerformance: string;
    year: string;
    projectName: string;
    result: string;
    objectifOperationnelId: number;
    contratId: number;
    structureId: number;
    observation: string;
    id?: number;
  }) {
    !data.id && delete data.id;
    !data.contratId && delete data.contratId;
    !data.structureId && delete data.structureId;
    !data.objectifOperationnelId && delete data.objectifOperationnelId;
    return data;
  }
}
