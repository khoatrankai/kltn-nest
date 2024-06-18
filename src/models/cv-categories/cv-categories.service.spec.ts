import { Test, TestingModule } from '@nestjs/testing';
import { CvCategoriesService } from './cv-categories.service';

describe('CvCategoriesService', () => {
  let service: CvCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CvCategoriesService],
    }).compile();

    service = module.get<CvCategoriesService>(CvCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
