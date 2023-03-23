import { PerformanceIndicator } from '../entity/performance-indicator.entity';

export const performanceIndicatorRepository = [
  {
    provide: 'PERFORMANCE_INDICATOR_REPOSITORY',
    useValue: PerformanceIndicator,
  },
];
