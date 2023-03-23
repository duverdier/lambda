import { Structure } from '../entity/structure.entity';

export const structureRepository = [
  {
    provide: 'STRUCTURE_REPOSITORY',
    useValue: Structure,
  },
];
