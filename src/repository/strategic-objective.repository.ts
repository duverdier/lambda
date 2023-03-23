import { StrategicObjective } from '../entity/strategic-objective.entity';

export const strategicObjectiveRepository = [
  {
    provide: 'STRATEGIC_OBJECTIVE_REPOSITORY',
    useValue: StrategicObjective,
  },
];
