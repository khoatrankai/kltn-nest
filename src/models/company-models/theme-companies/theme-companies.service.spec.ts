import { Test, TestingModule } from '@nestjs/testing';
import { ThemeCompaniesService } from './theme-companies.service';

describe('ThemeCompaniesService', () => {
  let service: ThemeCompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThemeCompaniesService],
    }).compile();

    service = module.get<ThemeCompaniesService>(ThemeCompaniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
