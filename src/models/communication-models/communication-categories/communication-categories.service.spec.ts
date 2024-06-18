import { Test, TestingModule } from '@nestjs/testing';
import { CommunicationCategoriesService } from './communication-categories.service';

describe('CommunicationCategoriesService', () => {
  let service: CommunicationCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunicationCategoriesService],
    }).compile();

    service = module.get<CommunicationCategoriesService>(CommunicationCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
