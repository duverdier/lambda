import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import sequelize from 'sequelize';
import { Role } from '../entity';
import { PlanStrategiqueDto } from '../dto/plan-strategique.dto';
import { StrategicAxeService } from './strategic-axe.service';
import { StrategicObjectiveService } from './strategic-objective.service';
import { OperationalObjectiveService } from './operational-objective.service';
import { StrategicOrientationService } from './strategic-orientation.service';
import { PerformanceIndicatorService } from './performance-indicator.service';
import { StructureService } from './structure.service';
import { ContratService } from './contrat.service';

@Injectable()
export class PlanStrategiqueService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private readonly roleRepository: typeof Role,
    private readonly strategicAxeService: StrategicAxeService,
    private readonly strategicObjectiveService: StrategicObjectiveService,
    private readonly operationalObjectiveService: OperationalObjectiveService,
    private readonly strategicOrientationService: StrategicOrientationService,
    private readonly performanceIndicatorService: PerformanceIndicatorService,
    private readonly contratService: ContratService,
    private readonly structureService: StructureService,
  ) {}

  async getViewPlanStrategique() {
    try {
      return await this.roleRepository.sequelize.query(`SELECT * FROM PlanStrategique`, {
        type: sequelize.QueryTypes.SELECT,
        raw: true,
      });
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async postPlanStrategique(planStrategiqueDto: PlanStrategiqueDto) {
    try {
      const {
        Contrat,
        TypeStructure,
        StructureName,
        AxeStrategique,
        NumeroObjectifStrategique,
        ObjectifStrategique,
        OrientationStrategique,
        ObjectifOperationnel,
        IndicateursDePerformance,
        Annee,
        NomProjetSpecial,
        Resultat,
        Observation,
        structureId,
        contratId,
        axeStrategiqueId,
        strategicObjectiveId,
        strategicOrientationId,
        objectifOperationnelId,
      } = planStrategiqueDto;

      const contratCreated = await this.getContrat(Contrat, contratId);
      const structureCreated = await this.getStructure({
        typeStructure: TypeStructure,
        structureName: StructureName,
        structureId,
      });
      const strategicAxeCreated = await this.getAxeStrategique(AxeStrategique, axeStrategiqueId);
      const strategicObjectiveCreated = await this.getStrategicObjective({
        numero: NumeroObjectifStrategique,
        label: ObjectifStrategique,
        axeStrategiqueId: strategicAxeCreated.id,
        strategicObjectiveId,
      });
      const strategicOrientationCreated = await this.getStrategicOrientationService({
        label: OrientationStrategique,
        objectifStrategiqueId: strategicObjectiveCreated.id,
        strategicOrientationId,
      });
      const operationalObjectiveCreated = await this.getOperationalObjective({
        label: ObjectifOperationnel,
        orientationStrategiqueId: strategicOrientationCreated.id,
        objectifOperationnelId,
      });
      const performanceIndicator = await this.performanceIndicatorService.createPerformanceIndicator({
        indicateursDePerformance: IndicateursDePerformance,
        year: Annee,
        projectName: NomProjetSpecial,
        result: Resultat,
        observation: Observation,
        contratId: contratCreated.id,
        objectifOperationnelId: operationalObjectiveCreated.id,
        structureId: structureCreated.id,
      });
      return {
        ...contratCreated,
        ...structureCreated,
        ...strategicAxeCreated,
        ...strategicObjectiveCreated,
        ...strategicOrientationCreated,
        ...operationalObjectiveCreated,
        ...performanceIndicator,
      };
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async getContrat(Contrat: string, contratId: number) {
    const contrat = Contrat
      ? await this.contratService.createContrat({ label: Contrat })
      : await this.contratService.getContratById(contratId);
    if (!contrat) {
      throw new HttpException('Information concernant le contrat inexistant !', HttpStatus.NOT_FOUND);
    }
    return contrat;
  }
  async getStructure(args: { typeStructure: string; structureName: string; structureId: number }) {
    const { typeStructure, structureName, structureId } = args;
    const structure =
      typeStructure || structureName
        ? await this.structureService.createStructureFile({ typeStructure, structureName })
        : await this.structureService.getStructureById(structureId);
    if (!structure) {
      throw new HttpException('Information concernant le structure inexistant !', HttpStatus.NOT_FOUND);
    }
    return structure;
  }

  async getAxeStrategique(label: string, axeStrategiqueId: number) {
    const axeStrategique = label
      ? await this.strategicAxeService.createStrategicAxe({ label })
      : await this.strategicAxeService.getStrategicAxeById(axeStrategiqueId);
    if (!axeStrategique) {
      throw new HttpException("Information concernant l'axe strategique inexistant !", HttpStatus.NOT_FOUND);
    }
    return axeStrategique;
  }

  async getStrategicObjective(args: {
    numero: string;
    label: string;
    axeStrategiqueId: number;
    strategicObjectiveId: number;
  }) {
    const { numero, label, axeStrategiqueId, strategicObjectiveId } = args;
    const strategicObjective =
      numero || label || axeStrategiqueId
        ? await this.strategicObjectiveService.createStrategicObjectiveWithAxeStrategiqueId({
            numero,
            label,
            axeStrategiqueId,
          })
        : await this.strategicObjectiveService.getStrategicObjectiveById(strategicObjectiveId);
    if (!strategicObjective) {
      throw new HttpException('Information concernant le objectif stratégique inexistant !', HttpStatus.NOT_FOUND);
    }
    return strategicObjective;
  }

  async getStrategicOrientationService(args: {
    label: string;
    objectifStrategiqueId: number;
    strategicOrientationId: number;
  }) {
    const { label, objectifStrategiqueId, strategicOrientationId } = args;
    const strategicOrientation =
      label || objectifStrategiqueId
        ? await this.strategicOrientationService.createStrategicOrientation({
            label,
            objectifStrategiqueId,
          })
        : await this.strategicOrientationService.getStrategicOrientationById(strategicOrientationId);
    if (!strategicOrientation) {
      throw new HttpException('Information concernant le orientation stratégique inexistant !', HttpStatus.NOT_FOUND);
    }
    return strategicOrientation;
  }

  async getOperationalObjective(args: {
    label: string;
    orientationStrategiqueId: number;
    objectifOperationnelId: number;
  }) {
    const { label, orientationStrategiqueId, objectifOperationnelId } = args;

    const operationalObjective =
      label || orientationStrategiqueId
        ? await this.operationalObjectiveService.createOperationalObjective({
            label,
            orientationStrategiqueId,
          })
        : await this.operationalObjectiveService.getOperationalObjectiveById(objectifOperationnelId);

    if (!operationalObjective) {
      throw new HttpException('Information concernant le objectif opérationnel inexistant !', HttpStatus.NOT_FOUND);
    }
    return operationalObjective;
  }
}
