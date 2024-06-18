import { Test, TestingModule } from '@nestjs/testing';
import { CommunicationNotificationsService } from './communication-notifications.service';

describe('CommunicationNotificationsService', () => {
  let service: CommunicationNotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunicationNotificationsService],
    }).compile();

    service = module.get<CommunicationNotificationsService>(CommunicationNotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
