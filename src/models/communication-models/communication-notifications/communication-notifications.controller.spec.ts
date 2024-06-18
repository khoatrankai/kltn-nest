import { Test, TestingModule } from '@nestjs/testing';
import { CommunicationNotificationsController } from './communication-notifications.controller';
import { CommunicationNotificationsService } from './communication-notifications.service';

describe('CommunicationNotificationsController', () => {
  let controller: CommunicationNotificationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunicationNotificationsController],
      providers: [CommunicationNotificationsService],
    }).compile();

    controller = module.get<CommunicationNotificationsController>(CommunicationNotificationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
