import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
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

  async createStrategicAxe(strategicAxe: { label: string; id?: number }) {
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
    const strategicAxe = await this.getStrategicAxeById(id);
    if (!strategicAxe) {
      throw new HttpException('STRATEGIC_AXE_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
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
