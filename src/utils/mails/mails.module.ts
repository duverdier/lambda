import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from './services/mails.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        return {
          transport: {
            host: process.env.MAILER_HOST || config.get('MAILER_HOST'),
            port: process.env.MAILER_PORT || config.get('MAILER_PORT'),
            auth: {
              user: process.env.MAILER_USER || config.get('MAILER_USER'),
              pass: process.env.MAILER_PASSWORD || config.get('MAILER_PASSWORD'),
            },
            tls: true,
          },
          defaults: {
            from: `no-reply ${process.env.MAILER_NOREPLY || config.get('MAILER_NOREPLY')}`,
          },
          template: {
            dir: `${process.cwd()}/templates`,
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    } as MailerAsyncOptions),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailsModule {}
