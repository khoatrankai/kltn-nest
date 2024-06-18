import { Module } from '@nestjs/common';
import { CvsPostsService } from './cvs-posts.service';
import { CvsPostsController } from './cvs-posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvsPost } from './entities/cvs-post.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { Post } from '../post-models/posts/entities';
import { CvCategory } from '../cv-categories/entities/cv-category.entity';
import { CvExtraInformation } from '../cv-models/cv-extra-information/entities/cv-extra-information.entity';
import { CvProject } from '../cv-models/cv-project/entities/cv-project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CvsPost, Post, CvCategory, CvExtraInformation, CvProject]),
    JwtAccessTokenServiceModule
  ],
  controllers: [CvsPostsController],
  providers: [CvsPostsService]
})
export class CvsPostsModule {}
