import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './providers/database.providers';
import * as services from './services';
import * as controllers from './controllers';
import { PassportModule } from './shared/passport/passport.module';
import { databaseRepository } from './repository';
import { MailsModule } from './utils/mails/mails.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule,
    MailsModule,
  ],
  controllers: [...Object.values(controllers)],
  providers: [...Object.values(services), ...databaseProviders, ...databaseRepository],
})
export class AppModule {}
