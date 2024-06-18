import { Test, TestingModule } from '@nestjs/testing';
import { ServiceRecruitmentImagesService } from './service-recruitment-images.service';

describe('ServiceRecruitmentImagesService', () => {
  let service: ServiceRecruitmentImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceRecruitmentImagesService],
    }).compile();

    service = module.get<ServiceRecruitmentImagesService>(ServiceRecruitmentImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
