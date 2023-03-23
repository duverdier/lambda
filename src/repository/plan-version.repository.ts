import { PlanVersion } from '../entity/plan-version.entity';

export const planVersionRepository = [
  {
    provide: 'PLAN_VERSION_REPOSITORY',
    useValue: PlanVersion,
  },
];
