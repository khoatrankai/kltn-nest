import { Test, TestingModule } from '@nestjs/testing';
import { VnpayModelsService } from './vnpay-models.service';

describe('VnpayModelsService', () => {
  let service: VnpayModelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VnpayModelsService],
    }).compile();

    service = module.get<VnpayModelsService>(VnpayModelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
