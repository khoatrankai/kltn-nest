import { Module } from '@nestjs/common';
import { CvInformationService } from './cv-information.service';
import { CvInformationController } from './cv-information.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvInformation } from './entities/cv-information.entity';
import { CreateCvInformationTransaction } from './transactions/create-cv-information.transaction';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { MoreCvInformation } from '../more-cv-information/entities/more-cv-information.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CvInformation]),
    TypeOrmModule.forFeature([MoreCvInformation]),
    JwtAccessTokenServiceModule,
  ],
  controllers: [CvInformationController],
  providers: [
    CvInformationService,
    CreateCvInformationTransaction,
    CloudinaryService,
  ],
  exports: [CvInformationService],
})
export class CvInformationModule {}
