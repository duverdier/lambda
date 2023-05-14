import { Inject, Injectable } from '@nestjs/common';
import { OperationalObjective } from '../entity/operational-objective.entity';

@Injectable()
export class OperationalObjectiveService {
  constructor(
    @Inject('OPERATIONAl_OBJECTIVE_REPOSITORY')
    private readonly operationalObjectiveServiceRepository: typeof OperationalObjective,
  ) {}

  async createOperationalObjective(operationalObjective: { label: string; orientationStrategiqueId: number }) {
    const { label, orientationStrategiqueId } = operationalObjective;
    const operationalObjectiveObject = await this.getOperationalObjectiveObject({
      label,
      orientationStrategiqueId,
    });
    return await this.operationalObjectiveServiceRepository.create<OperationalObjective>(operationalObjectiveObject);
  }

  getOperationalObjectives() {
    return this.operationalObjectiveServiceRepository.findAll<OperationalObjective>();
  }

  async getOperationalObjectiveById(id: number) {
    return await this.operationalObjectiveServiceRepository.findOne<OperationalObjective>({
      where: { id },
      raw: true,
      nest: true,
    });
  }

  async updateStrategicOrientation(id: number, data: any) {
    return await this.operationalObjectiveServiceRepository.update(data, { where: { id } });
  }

  async getOperationalObjectiveObject(data: any) {
    !data.orientationStrategiqueId && delete data.orientationStrategiqueId;
    return data;
  }
}
