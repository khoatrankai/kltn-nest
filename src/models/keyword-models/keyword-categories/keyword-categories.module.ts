import { Module } from '@nestjs/common';
import { KeywordCategoriesService } from './keyword-categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordCategory } from './entities/keyword-categories.entity';
import { ParentModule } from 'src/models/categories/parents/parents.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([KeywordCategory]),
    ParentModule
  ],
  providers: [KeywordCategoriesService],
  exports: [KeywordCategoriesService]
})
export class KeywordCategoriesModule {}
