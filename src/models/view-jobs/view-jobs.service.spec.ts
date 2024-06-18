import { Test, TestingModule } from '@nestjs/testing';
import { ViewJobsService } from './view-jobs.service';

describe('ViewJobsService', () => {
  let service: ViewJobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ViewJobsService],
    }).compile();

    service = module.get<ViewJobsService>(ViewJobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
