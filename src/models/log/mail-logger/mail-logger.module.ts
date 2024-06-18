import { Module } from '@nestjs/common';
import { MailLoggerService } from './mail-logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailLogger } from './entities/mail-logger.entity';
// import { MailLoggerController } from './mail-logger.controller';

@Module({
  // controllers: [MailLoggerController],
  imports: [
    TypeOrmModule.forFeature([
      MailLogger
    ]),
  ],
  providers: [MailLoggerService],
  exports: [MailLoggerService]
})
export class MailLoggerModule {}
