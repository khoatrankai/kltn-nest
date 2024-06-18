import { Test, TestingModule } from '@nestjs/testing';
import { BlockReasonsService } from './block-reasons.service';

describe('BlockReasonsService', () => {
  let service: BlockReasonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlockReasonsService],
    }).compile();

    service = module.get<BlockReasonsService>(BlockReasonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
