import { Test, TestingModule } from '@nestjs/testing';
import { CvsPostsController } from './cvs-posts.controller';
import { CvsPostsService } from './cvs-posts.service';

describe('CvsPostsController', () => {
  let controller: CvsPostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CvsPostsController],
      providers: [CvsPostsService],
    }).compile();

    controller = module.get<CvsPostsController>(CvsPostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
