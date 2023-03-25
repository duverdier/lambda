import { Module } from '@nestjs/common';
import { LoginController } from './controllers/login.controller';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './providers/database.providers';
import { strategicAxeRepository } from './repository/strategic-axe.repository';
import { strategicObjectiveRepository } from './repository/strategic-objective.repository';
import { operationalObjectiveRepository } from './repository/operational-objective.repository';
import { performanceIndicatorRepository } from './repository/performance-indicator.repository';
import { planVersionRepository } from './repository/plan-version.repository';
import { structureRepository } from './repository/structure.repository';
import { contratRepository } from './repository/contrat.repository';
import { strategicOrientationRepository } from './repository/strategic-orientation.repository';
import { StructureService } from './services/structure.service';
import { StructureController } from './controllers/structure.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRATION,
        },
      }),
    }),
  ],
  controllers: [LoginController, StructureController],
  providers: [
    StructureService,
    ...databaseProviders,
    ...strategicAxeRepository,
    ...strategicObjectiveRepository,
    ...strategicOrientationRepository,
    ...operationalObjectiveRepository,
    ...performanceIndicatorRepository,
    ...planVersionRepository,
    ...structureRepository,
    ...contratRepository,
  ],
})
export class AppModule {}
