// import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { NodeMailerConfigService } from 'src/config/mail/node-mailer/config.service';
import { NodeMailerConfigModule } from 'src/config/mail/node-mailer/config.module';
import { MailService } from 'src/services/mail/mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
        imports: [NodeMailerConfigModule],
        useFactory: (configService: NodeMailerConfigService) => ({
            transport: {
                host: configService.host,
                port: configService.port,
                secure: configService.secure,
                auth: {
                    user: configService.auth?.user,
                    pass: configService.auth?.pass,
                },
            },
            defaults: {
                from: `"${configService.from}" <${configService.auth?.user}>`,
            },
            template: {
                dir: join(__dirname, '..', "..", 'services', 'mail', 'templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                }
            }

        }),
        inject: [NodeMailerConfigService],
    }),
  ],
  providers: [MailService,],
  exports: [MailService],
  controllers: [],
})
export class MailModule {}
