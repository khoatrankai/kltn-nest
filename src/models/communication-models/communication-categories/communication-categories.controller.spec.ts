import { Test, TestingModule } from '@nestjs/testing';
import { CommunicationCategoriesController } from './communication-categories.controller';
import { CommunicationCategoriesService } from './communication-categories.service';

describe('CommunicationCategoriesController', () => {
  let controller: CommunicationCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunicationCategoriesController],
      providers: [CommunicationCategoriesService],
    }).compile();

    controller = module.get<CommunicationCategoriesController>(CommunicationCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
