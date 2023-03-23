import { StrategicOrientation } from '../entity/strategic-orientation.entity';

export const strategicOrientationRepository = [
  {
    provide: 'STRATEGIC_ORIENTATION_REPOSITORY',
    useValue: StrategicOrientation,
  },
];
