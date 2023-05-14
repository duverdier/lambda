import { OperationalObjective } from '../entity/operational-objective.entity';

export const operationalObjectiveRepository = [
  {
    provide: 'OPERATIONAL_OBJECTIVE_REPOSITORY',
    useValue: OperationalObjective,
  },
];
