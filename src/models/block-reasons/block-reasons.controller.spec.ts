import { Test, TestingModule } from '@nestjs/testing';
import { BlockReasonsController } from './block-reasons.controller';
import { BlockReasonsService } from './block-reasons.service';

describe('BlockReasonsController', () => {
  let controller: BlockReasonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlockReasonsController],
      providers: [BlockReasonsService],
    }).compile();

    controller = module.get<BlockReasonsController>(BlockReasonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
