import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PlanVersion } from '../entity/plan-version.entity';

@Injectable()
export class PlanVersionService {
  constructor(
    @Inject('PLAN_VERSION_REPOSITORY')
    private readonly planVersionRepository: typeof PlanVersion,
  ) {}

  async createPlanVersion(planVersion: { dateCreated: string; name: string; dateEnd?: string }) {
    return await this.planVersionRepository.create<PlanVersion>(planVersion);
  }

  getPlanVerisons() {
    return this.planVersionRepository.findAll<PlanVersion>();
  }

  async getPlanVersionById(id: number) {
    return await this.planVersionRepository.findOne<PlanVersion>({
      where: { id },
      raw: true,
      nest: true,
    });
  }

  async updatePlanVersion(id: number, data: PlanVersion) {
    await this.verifyPlanVersion(id);
    return await this.planVersionRepository.update(data, { where: { id } });
  }

  async updateDateEndPlanVersion(id: number, dateEnd: string) {
    await this.verifyPlanVersion(id);
    return await this.planVersionRepository.update({ dateEnd }, { where: { id } });
  }

  private async verifyPlanVersion(id: number) {
    const planVersion = await this.getPlanVersionById(id);
    if (!planVersion) {
      throw new HttpException('PLAN_ACTION_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }
}
