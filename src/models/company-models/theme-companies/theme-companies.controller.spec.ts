import { Test, TestingModule } from '@nestjs/testing';
import { ThemeCompaniesController } from './theme-companies.controller';
import { ThemeCompaniesService } from './theme-companies.service';

describe('ThemeCompaniesController', () => {
  let controller: ThemeCompaniesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThemeCompaniesController],
      providers: [ThemeCompaniesService],
    }).compile();

    controller = module.get<ThemeCompaniesController>(ThemeCompaniesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
