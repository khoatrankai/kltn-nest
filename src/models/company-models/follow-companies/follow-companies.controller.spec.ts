import { Test, TestingModule } from '@nestjs/testing';
import { FollowCompaniesController } from './follow-companies.controller';
import { FollowCompaniesService } from './follow-companies.service';

describe('FollowCompaniesController', () => {
  let controller: FollowCompaniesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowCompaniesController],
      providers: [FollowCompaniesService],
    }).compile();

    controller = module.get<FollowCompaniesController>(FollowCompaniesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
