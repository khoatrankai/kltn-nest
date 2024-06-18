import { Test, TestingModule } from '@nestjs/testing';
import { ServiceHistoryController } from './service-history.controller';
import { ServiceHistoryService } from './service-history.service';

describe('ServiceHistoryController', () => {
  let controller: ServiceHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceHistoryController],
      providers: [ServiceHistoryService],
    }).compile();

    controller = module.get<ServiceHistoryController>(ServiceHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
