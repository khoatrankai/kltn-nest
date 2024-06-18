import { Test, TestingModule } from '@nestjs/testing';
import { PostNotificationsController } from './post-notifications.controller';
import { PostNotificationsService } from './post-notifications.service';

describe('PostNotificationsController', () => {
  let controller: PostNotificationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostNotificationsController],
      providers: [PostNotificationsService],
    }).compile();

    controller = module.get<PostNotificationsController>(PostNotificationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
