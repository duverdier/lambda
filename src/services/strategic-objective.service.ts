import { Inject, Injectable } from '@nestjs/common';
import { StrategicObjective } from '../entity/strategic-objective.entity';

@Injectable()
export class StrategicObjectiveService {
  constructor(
    @Inject('STRATEGIC_OBJECTIVE_REPOSITORY')
    private readonly strategicObjectiveRepository: typeof StrategicObjective,
  ) {}

  createStrategicObjective(strategicObjective: StrategicObjective) {
    return this.strategicObjectiveRepository.create<StrategicObjective>(strategicObjective);
  }

  async createStrategicObjectiveWithAxeStrategiqueId(strategicObjective: {
    numero: string;
    label: string;
    axeStrategiqueId: number;
  }) {
    try {
      const { numero, label, axeStrategiqueId } = strategicObjective;
      const strategicObjectiveObject = await this.getStrategicObjectiveObject({ numero, label, axeStrategiqueId });
      return await this.strategicObjectiveRepository.create<StrategicObjective>(strategicObjectiveObject);
    } catch (error) {
      console.log('error: ', error);
    }
  }

  getStrategicObjectives() {
    return this.strategicObjectiveRepository.findAll<StrategicObjective>();
  }

  async getStrategicObjectiveById(id: number) {
    return await this.strategicObjectiveRepository.findOne<StrategicObjective>({
      where: { id },
      raw: true,
      nest: true,
    });
  }

  async updateStrategicObjective(id: number, data: any) {
    return await this.strategicObjectiveRepository.update(data, { where: { id } });
  }

  async getStrategicObjectiveObject(data: any) {
    !data.axeStrategiqueId && delete data.axeStrategiqueId;
    return data;
  }
}
