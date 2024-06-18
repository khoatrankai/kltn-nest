import { Module } from '@nestjs/common';
import { CvProjectService } from './cv-project.service';
import { CvProjectController } from './cv-project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvProject } from './entities/cv-project.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { CreateCvProjectTransaction } from './transaction/create-cv-project.transaction';
import { MoreCvProjectModule } from '../more-cv-project/more-cv-project.module';
import { MoreCvProject } from '../more-cv-project/entities/more-cv-project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CvProject]),
    TypeOrmModule.forFeature([MoreCvProject]),
    JwtAccessTokenServiceModule,
    MoreCvProjectModule,
  ],
  controllers: [CvProjectController],
  providers: [CvProjectService, CreateCvProjectTransaction],
  exports: [CvProjectService],
})
export class CvProjectModule {}
