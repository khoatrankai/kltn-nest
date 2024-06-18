import { Module } from '@nestjs/common';
import { CvExtraInformationService } from './cv-extra-information.service';
import { CvExtraInformationController } from './cv-extra-information.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvExtraInformation } from './entities/cv-extra-information.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { CreateCvExtraInformationTransaction } from './transaction/create-cv-extra-information.transaction';
import { MoreCvExtraInformationModule } from '../more-cv-extra-information/more-cv-extra-information.module';
import { MoreCvExtraInformation } from '../more-cv-extra-information/entities/more-cv-extra-information.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CvExtraInformation]),
    TypeOrmModule.forFeature([MoreCvExtraInformation]),
    JwtAccessTokenServiceModule,
    MoreCvExtraInformationModule
  ],
  controllers: [CvExtraInformationController],
  providers: [CvExtraInformationService, CreateCvExtraInformationTransaction],
  exports: [CvExtraInformationService],
})
export class CvExtraInformationModule {}
