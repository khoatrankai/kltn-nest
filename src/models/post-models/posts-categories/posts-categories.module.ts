import { Module } from '@nestjs/common';
import { PostsCategoriesService } from './posts-categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostCategories } from './entities/posts-categories.entity';
// import { PostsCategoriesController } from './posts-categories.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostCategories
    ])
  ],
  // controllers: [PostsCategoriesController],
  providers: [PostsCategoriesService],
  exports: [PostsCategoriesService]
})
export class PostsCategoriesModule {}
