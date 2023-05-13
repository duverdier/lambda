import { Module } from '@nestjs/common';
import { PassportModule as NestPassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserService, StructureService, RoleService } from 'src/services';
import { databaseRepository } from 'src/repository';
import { databaseProviders } from 'src/providers/database.providers';
import { environmentVariable } from 'src/config/environment-variable';
import { MailService } from 'src/utils/mails/services/mails.service';

@Module({
  exports: [JwtModule],
  imports: [
    NestPassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: environmentVariable.JWT_SECRET,
      signOptions: {
        expiresIn: environmentVariable.JWT_EXPIRATION,
      },
    }),
  ],
  providers: [
    JwtAuthGuard,
    JwtAuthStrategy,
    UserService,
    StructureService,
    RoleService,
    MailService,
    ...databaseProviders,
    ...databaseRepository,
  ],
})
export class PassportModule {}
