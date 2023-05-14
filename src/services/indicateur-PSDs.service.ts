import { Inject, Injectable } from '@nestjs/common';
import { IndicateurPSDs } from '../entity/indicateur-PSDs.entity';

@Injectable()
export class IndicateurPSDsService {
  constructor(
    @Inject('INDICATEUR_PSDS_REPOSITORY')
    private readonly indicateurPSDsRepository: typeof IndicateurPSDs,
  ) {}
  createIndicateurPSDs(indicateurPSDs: IndicateurPSDs) {
    return this.indicateurPSDsRepository.create<IndicateurPSDs>(indicateurPSDs);
  }

  getIndicateurPSDs() {
    return this.indicateurPSDsRepository.findAll<IndicateurPSDs>();
  }

  async getIndicateurPSDsById(id: number) {
    return await this.indicateurPSDsRepository.findOne<IndicateurPSDs>({
      where: { id },
      raw: true,
      nest: true,
    });
  }

  async getIndicateurPSDsByPerformanceIndicatorId(indicateursDePerformanceId: number) {
    return await this.indicateurPSDsRepository.findOne<IndicateurPSDs>({
      where: { indicateursDePerformanceId },
      raw: true,
      nest: true,
    });
  }

  async getCountIndicateurPSDsByPerformanceIndicatorId(indicateursDePerformanceId: number) {
    return await this.indicateurPSDsRepository.findAndCountAll<IndicateurPSDs>({
      where: { indicateursDePerformanceId },
      raw: true,
      nest: true,
    });
  }
}
