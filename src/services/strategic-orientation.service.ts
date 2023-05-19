import { Inject, Injectable } from '@nestjs/common';
import { StrategicOrientation } from '../entity/strategic-orientation.entity';

@Injectable()
export class StrategicOrientationService {
  constructor(
    @Inject('STRATEGIC_ORIENTATION_REPOSITORY')
    private readonly strategicOrientationRepository: typeof StrategicOrientation,
  ) {}
  // createStrategicOrientation(strategicOrientation: StrategicOrientation) {
  //   return this.strategicOrientationRepository.create<StrategicOrientation>(strategicOrientation);
  // }

  async createStrategicOrientation(strategicOrientation: { label: string; objectifStrategiqueId: number }) {
    try {
      const { label, objectifStrategiqueId } = strategicOrientation;
      const strategicOrientationObject = await this.getStrategicOrientationObject({
        label,
        objectifStrategiqueId,
      });
      return await this.strategicOrientationRepository.create<StrategicOrientation>(strategicOrientationObject);
    } catch (error) {
      console.log('error: ', error);
    }
  }

  getStrategicOrientations() {
    return this.strategicOrientationRepository.findAll<StrategicOrientation>();
  }

  async getStrategicOrientationById(id: number) {
    return await this.strategicOrientationRepository.findOne<StrategicOrientation>({
      where: { id },
      raw: true,
      nest: true,
    });
  }

  async getStrategicOrientationByObjectifStrategiqueId(objectifStrategiqueId: number) {
    return await this.strategicOrientationRepository.findAll<StrategicOrientation>({
      where: { objectifStrategiqueId },
      raw: true,
      nest: true,
    });
  }

  async updateStrategicOrientation(id: number, data: any) {
    return await this.strategicOrientationRepository.update(data, { where: { id } });
  }

  async getStrategicOrientationObject(data: any) {
    !data.objectifStrategiqueId && delete data.objectifStrategiqueId;
    return data;
  }
}
