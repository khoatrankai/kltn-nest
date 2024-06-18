import { Test, TestingModule } from '@nestjs/testing';
import { CvsPostsService } from './cvs-posts.service';

describe('CvsPostsService', () => {
  let service: CvsPostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CvsPostsService],
    }).compile();

    service = module.get<CvsPostsService>(CvsPostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
