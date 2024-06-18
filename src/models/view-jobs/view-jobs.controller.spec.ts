import { Test, TestingModule } from '@nestjs/testing';
import { ViewJobsController } from './view-jobs.controller';
import { ViewJobsService } from './view-jobs.service';

describe('ViewJobsController', () => {
  let controller: ViewJobsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViewJobsController],
      providers: [ViewJobsService],
    }).compile();

    controller = module.get<ViewJobsController>(ViewJobsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
