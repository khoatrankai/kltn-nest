import { Module } from '@nestjs/common';
import { PostsImagesService } from './posts-images.service';
// import { PostsImagesController } from './posts-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostImages } from './entities/post-images.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostImages
    ])
  ],
  // controllers: [PostsImagesController],
  providers: [PostsImagesService],
  exports: [PostsImagesService]
})
export class PostsImagesModule {}
