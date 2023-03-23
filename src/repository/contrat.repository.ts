import { Contrat } from '../entity/contrat.entity';

export const contratRepository = [
  {
    provide: 'CONTRAT_REPOSITORY',
    useValue: Contrat,
  },
];
