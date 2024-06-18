import { Test, TestingModule } from '@nestjs/testing';
import { CvLayoutController } from './cv-layout.controller';
import { CvLayoutService } from './cv-layout.service';

describe('CvLayoutController', () => {
  let controller: CvLayoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CvLayoutController],
      providers: [CvLayoutService],
    }).compile();

    controller = module.get<CvLayoutController>(CvLayoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
