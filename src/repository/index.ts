import { contratRepository } from './contrat.repository';
import { operationalObjectiveRepository } from './operational-objective.repository';
import { performanceIndicatorRepository } from './performance-indicator.repository';
import { planVersionRepository } from './plan-version.repository';
import { strategicAxeRepository } from './strategic-axe.repository';
import { strategicObjectiveRepository } from './strategic-objective.repository';
import { strategicOrientationRepository } from './strategic-orientation.repository';
import { structureRepository } from './structure.repository';
import { userRepository } from './user.repository';
import { roleRepository } from './role.repository';
import { pourcentageRepository } from './pourcentage.repository';
import { planActionsRepository } from './plan-actions.repository';
import { indicateurPSDsRepository } from './indicateur-PSDs.repository';

export const databaseRepository = [
  ...contratRepository,
  ...operationalObjectiveRepository,
  ...performanceIndicatorRepository,
  ...planVersionRepository,
  ...strategicAxeRepository,
  ...strategicObjectiveRepository,
  ...strategicOrientationRepository,
  ...structureRepository,
  ...userRepository,
  ...roleRepository,
  ...pourcentageRepository,
  ...planActionsRepository,
  ...indicateurPSDsRepository,
];
