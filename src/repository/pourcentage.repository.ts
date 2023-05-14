import { Pourcentage } from '../entity/pourcentage.entity';

export const pourcentageRepository = [
  {
    provide: 'POURCENTAGE_REPOSITORY',
    useValue: Pourcentage,
  },
];
