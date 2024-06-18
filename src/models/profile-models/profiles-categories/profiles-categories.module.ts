import { Module } from '@nestjs/common';
import { ProfilesCategoriesService } from './profiles-categories.service';
import { ProfilesCategoriesController } from './profiles-categories.controller';

@Module({
  controllers: [ProfilesCategoriesController],
  providers: [ProfilesCategoriesService]
})
export class ProfilesCategoriesModule {}
