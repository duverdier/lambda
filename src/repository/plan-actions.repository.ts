import { PlanActions } from '../entity/plan_actions.entity';

export const planActionsRepository = [
  {
    provide: 'PLAN_ACTION_REPOSITORY',
    useValue: PlanActions,
  },
];
