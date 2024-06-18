import { Test, TestingModule } from '@nestjs/testing';
import { ServiceRecruitmentService } from './service-recruitment.service';

describe('ServiceRecruitmentService', () => {
  let service: ServiceRecruitmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceRecruitmentService],
    }).compile();

    service = module.get<ServiceRecruitmentService>(ServiceRecruitmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
