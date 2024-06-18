import { Test, TestingModule } from '@nestjs/testing';
import { UserPointHistoriesService } from './user-point-histories.service';

describe('UserPointHistoriesService', () => {
  let service: UserPointHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPointHistoriesService],
    }).compile();

    service = module.get<UserPointHistoriesService>(UserPointHistoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
