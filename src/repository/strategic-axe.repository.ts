import { StrategicAxe } from '../entity/strategic-axe.entity';

export const strategicAxeRepository = [
  {
    provide: 'STRATEGIC_AXE_REPOSITORY',
    useValue: StrategicAxe,
  },
];
