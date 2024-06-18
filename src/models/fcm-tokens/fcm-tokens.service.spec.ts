import { Test, TestingModule } from '@nestjs/testing';
import { FcmTokensService } from './fcm-tokens.service';

describe('FcmTokensService', () => {
  let service: FcmTokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FcmTokensService],
    }).compile();

    service = module.get<FcmTokensService>(FcmTokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
