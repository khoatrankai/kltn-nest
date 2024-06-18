import { Test, TestingModule } from '@nestjs/testing';
import { FollowCompaniesService } from './follow-companies.service';

describe('FollowCompaniesService', () => {
  let service: FollowCompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FollowCompaniesService],
    }).compile();

    service = module.get<FollowCompaniesService>(FollowCompaniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
