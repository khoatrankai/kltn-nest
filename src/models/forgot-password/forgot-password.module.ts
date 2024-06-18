import { Module } from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import { ForgotPasswordController } from './forgot-password.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForgotPassword } from './entities/forgot-password.entity';
import { AdminService } from '../admin/admin.service';
import { MailService } from 'src/services/mail/mail.service';
import { MailLoggerService } from '../log/mail-logger/mail-logger.service';
import { MailModule } from 'src/providers/mail/provider.module';
import { MailLoggerModule } from '../log/mail-logger/mail-logger.module';
import { MailLogger } from '../log/mail-logger/entities/mail-logger.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ForgotPassword]),
    TypeOrmModule.forFeature([MailLogger]),
    MailModule,
    MailLoggerModule
  ],
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService, AdminService, MailService, MailLoggerService],
  exports: [ForgotPasswordService],
})
export class ForgotPasswordModule {}
