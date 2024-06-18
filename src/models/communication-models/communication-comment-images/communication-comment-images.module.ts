import { Module } from '@nestjs/common';
import { CommunicationCommentImagesService } from './communication-comment-images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunicationCommentImage } from './entities/communication-comment-image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommunicationCommentImage
    ])
  ],
  controllers: [],
  providers: [CommunicationCommentImagesService],
  exports: [CommunicationCommentImagesService]
})
export class CommunicationCommentImagesModule {}
