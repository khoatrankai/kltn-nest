import { Test, TestingModule } from '@nestjs/testing';
import { CvLayoutService } from './cv-layout.service';

describe('CvLayoutService', () => {
  let service: CvLayoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CvLayoutService],
    }).compile();

    service = module.get<CvLayoutService>(CvLayoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
