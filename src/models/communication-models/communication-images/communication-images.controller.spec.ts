import { Test, TestingModule } from '@nestjs/testing';
import { CommunicationImagesController } from './communication-images.controller';
import { CommunicationImagesService } from './communication-images.service';

describe('CommunicationImagesController', () => {
  let controller: CommunicationImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunicationImagesController],
      providers: [CommunicationImagesService],
    }).compile();

    controller = module.get<CommunicationImagesController>(CommunicationImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
