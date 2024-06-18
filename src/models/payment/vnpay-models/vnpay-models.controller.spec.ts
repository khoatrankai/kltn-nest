import { Test, TestingModule } from '@nestjs/testing';
import { VnpayModelsController } from './vnpay-models.controller';
import { VnpayModelsService } from './vnpay-models.service';

describe('VnpayModelsController', () => {
  let controller: VnpayModelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VnpayModelsController],
      providers: [VnpayModelsService],
    }).compile();

    controller = module.get<VnpayModelsController>(VnpayModelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
