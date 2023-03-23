import { OperationalObjective } from '../entity/operational-objective.entity';

export const operationalObjectiveRepository = [
  {
    provide: 'OPERATIONAl_OBJECTIVE_REPOSITORY',
    useValue: OperationalObjective,
  },
];
