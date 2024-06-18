import { Test, TestingModule } from '@nestjs/testing';
import { UserPointHistoriesController } from './user-point-histories.controller';
import { UserPointHistoriesService } from './user-point-histories.service';

describe('UserPointHistoriesController', () => {
  let controller: UserPointHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPointHistoriesController],
      providers: [UserPointHistoriesService],
    }).compile();

    controller = module.get<UserPointHistoriesController>(UserPointHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
