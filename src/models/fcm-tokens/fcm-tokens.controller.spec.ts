import { Test, TestingModule } from '@nestjs/testing';
import { FcmTokensController } from './fcm-tokens.controller';
import { FcmTokensService } from './fcm-tokens.service';

describe('FcmTokensController', () => {
  let controller: FcmTokensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FcmTokensController],
      providers: [FcmTokensService],
    }).compile();

    controller = module.get<FcmTokensController>(FcmTokensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
