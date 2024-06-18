import { Module } from '@nestjs/common';
import { CommunicationNotificationsService } from './communication-notifications.service';
import { CommunicationNotificationsController } from './communication-notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunicationNotification } from './entities/communication-notification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommunicationNotification])
  ],
  controllers: [CommunicationNotificationsController],
  providers: [CommunicationNotificationsService],
  exports: [CommunicationNotificationsService]
})
export class CommunicationNotificationsModule {}
