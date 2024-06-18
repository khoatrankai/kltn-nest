import { Test, TestingModule } from '@nestjs/testing';
import { CommunicationImagesService } from './communication-images.service';

describe('CommunicationImagesService', () => {
  let service: CommunicationImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunicationImagesService],
    }).compile();

    service = module.get<CommunicationImagesService>(CommunicationImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
