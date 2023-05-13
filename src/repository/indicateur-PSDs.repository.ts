import { IndicateurPSDs } from '../entity/indicateur-PSDs.entity';

export const indicateurPSDsRepository = [
  {
    provide: 'INDICATEUR_PSDS_REPOSITORY',
    useValue: IndicateurPSDs,
  },
];
