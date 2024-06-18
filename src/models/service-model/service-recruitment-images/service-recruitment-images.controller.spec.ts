import { Test, TestingModule } from '@nestjs/testing';
import { ServiceRecruitmentImagesController } from './service-recruitment-images.controller';
import { ServiceRecruitmentImagesService } from './service-recruitment-images.service';

describe('ServiceRecruitmentImagesController', () => {
  let controller: ServiceRecruitmentImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceRecruitmentImagesController],
      providers: [ServiceRecruitmentImagesService],
    }).compile();

    controller = module.get<ServiceRecruitmentImagesController>(ServiceRecruitmentImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
