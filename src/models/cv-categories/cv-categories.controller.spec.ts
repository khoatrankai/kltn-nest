import { Test, TestingModule } from '@nestjs/testing';
import { CvCategoriesController } from './cv-categories.controller';
import { CvCategoriesService } from './cv-categories.service';

describe('CvCategoriesController', () => {
  let controller: CvCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CvCategoriesController],
      providers: [CvCategoriesService],
    }).compile();

    controller = module.get<CvCategoriesController>(CvCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
