import { Module } from '@nestjs/common';
import { CvCategoriesService } from './cv-categories.service';
import { CvCategoriesController } from './cv-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvCategory } from './entities/cv-category.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { Post } from '../post-models/posts/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([CvCategory, Post]),
    JwtAccessTokenServiceModule
  ],
  controllers: [CvCategoriesController],
  providers: [CvCategoriesService]
})
export class CvCategoriesModule {}
