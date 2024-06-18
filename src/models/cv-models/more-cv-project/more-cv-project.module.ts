import { Module } from '@nestjs/common';
import { MoreCvProjectService } from './more-cv-project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoreCvProject } from './entities/more-cv-project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MoreCvProject])
  ],
  controllers: [],
  providers: [MoreCvProjectService],
  exports: [MoreCvProjectService]
})
export class MoreCvProjectModule {}
