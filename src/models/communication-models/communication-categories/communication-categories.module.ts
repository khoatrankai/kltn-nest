import { Module } from '@nestjs/common';
import { CommunicationCategoriesService } from './communication-categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunicationCategory } from './entities/communication.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommunicationCategory
    ])
  ],
  providers: [CommunicationCategoriesService],
  exports: [CommunicationCategoriesService]
})
export class CommunicationCategoriesModule {}
