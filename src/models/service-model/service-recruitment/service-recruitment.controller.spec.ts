import { Test, TestingModule } from '@nestjs/testing';
import { ServiceRecruitmentController } from './service-recruitment.controller';
import { ServiceRecruitmentService } from './service-recruitment.service';

describe('ServiceRecruitmentController', () => {
  let controller: ServiceRecruitmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceRecruitmentController],
      providers: [ServiceRecruitmentService],
    }).compile();

    controller = module.get<ServiceRecruitmentController>(ServiceRecruitmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
