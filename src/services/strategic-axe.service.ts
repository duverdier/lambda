import { Inject, Injectable } from '@nestjs/common';
import { StrategicAxe } from '../entity/strategic-axe.entity';
import sequelize from 'sequelize';

@Injectable()
export class StrategicAxeService {
  constructor(
    @Inject('STRATEGIC_AXE_REPOSITORY')
    private readonly strategicAxeRepository: typeof StrategicAxe,
  ) {}
  // createStrategicAxe(strategicAxe: StrategicAxe) {
  //   return this.strategicAxeRepository.create<StrategicAxe>(strategicAxe);
  // }

  async createStrategicAxe(strategicAxe: { id: number; label: string }) {
    try {
      return await this.strategicAxeRepository.create<StrategicAxe>({ label: strategicAxe.label });
    } catch (error) {
      console.log('error: ', error);
    }
  }

  getStrategicAxes() {
    return this.strategicAxeRepository.findAll<StrategicAxe>();
  }

  async getStrategicAxeById(id: number) {
    return await this.strategicAxeRepository.findOne<StrategicAxe>({
      where: { id },
      raw: true,
      nest: true,
    });
  }

  async updateStrategicAxe(id: number, data: any) {
    return await this.strategicAxeRepository.update(data, { where: { id } });
  }

  async getViewAxe() {
    try {
      return await this.strategicAxeRepository.sequelize.query(`SELECT * FROM PlanStrategique`, {
        type: sequelize.QueryTypes.SELECT,
        raw: true,
      });
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
