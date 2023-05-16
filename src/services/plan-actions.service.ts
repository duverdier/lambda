import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PlanActions } from '../entity/plan_actions.entity';
import { PerformanceIndicator } from '../entity/performance-indicator.entity';
import { PlanActionDto } from '../dto/plan-action.dto';
import { Op } from 'sequelize';

@Injectable()
export class PlanActionService {
  constructor(
    @Inject('PLAN_ACTION_REPOSITORY')
    private readonly planActionsRepository: typeof PlanActions,
  ) {}

  async createPlanAction(planActionDto: PlanActionDto) {
    return await this.planActionsRepository.create<PlanActions>(planActionDto);
  }

  getPlanAction() {
    return this.planActionsRepository.findAll<PlanActions>({
      include: [{ model: PerformanceIndicator, required: false }],
      raw: true,
      nest: true,
    });
  }

  async getPlanActionById(id: number) {
    return await this.planActionsRepository.findOne<PlanActions>({
      where: { id },
      include: [{ model: PerformanceIndicator, required: false }],
      raw: true,
      nest: true,
    });
  }

  async getPlanActionByIdAndIndicateursDePerformanceId(id: number, performanceIndicatorId: number) {
    return await this.planActionsRepository.findOne<PlanActions>({
      where: {
        [Op.and]: [{ id }, { performanceIndicatorId }],
      },
      include: [{ model: PerformanceIndicator, required: false }],
      raw: true,
      nest: true,
    });
  }

  async updatePlanAction(id: number, data: PlanActionDto) {
    const planAction = await this.getPlanActionById(id);
    if (!planAction) {
      throw new HttpException('PLAN_ACTION_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return await this.planActionsRepository.update(data, { where: { id } });
  }
}
