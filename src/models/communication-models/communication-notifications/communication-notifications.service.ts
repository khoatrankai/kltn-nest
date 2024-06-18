import { Injectable } from '@nestjs/common';
import { CreateCommunicationNotificationDto } from './dto/create-communication-notification.dto';
import { UpdateCommunicationNotificationDto } from './dto/update-communication-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CommunicationNotification } from './entities/communication-notification.entity';

@Injectable()
export class CommunicationNotificationsService {
  constructor(
    @InjectRepository(CommunicationNotification)
    private communicationNotificationRepository: Repository<CommunicationNotification>,
  ) {}

  create(_createCommunicationNotificationDto: CreateCommunicationNotificationDto, manager?: EntityManager) {
    const newCommunicationNotification = this.communicationNotificationRepository.create(_createCommunicationNotificationDto);

    if (manager) {
      return manager.save(newCommunicationNotification);
    }
    
    return this.communicationNotificationRepository.save(newCommunicationNotification);
  }

  // createWithTransaction(_createCommunicationNotificationDto: CreateCommunicationNotificationDto, manager: any) {
  //   const newCommunicationNotification = this.communicationNotificationRepository.create(_createCommunicationNotificationDto);
  //   return manager.save(newCommunicationNotification);
  // }

  // findAll() {
  //   return `This action returns all communicationNotifications`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} communicationNotification`;
  // }

  update(id: number, _updateCommunicationNotificationDto: UpdateCommunicationNotificationDto) {
    return `This action updates a #${id} communicationNotification`;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} communicationNotification`;
  // }
}
