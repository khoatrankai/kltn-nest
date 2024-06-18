import { Test, TestingModule } from '@nestjs/testing';
import { PostNotificationsService } from './post-notifications.service';

describe('PostNotificationsService', () => {
  let service: PostNotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostNotificationsService],
    }).compile();

    service = module.get<PostNotificationsService>(PostNotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
