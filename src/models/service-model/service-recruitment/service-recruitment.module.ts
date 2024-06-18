import { Module } from '@nestjs/common';
import { ServiceRecruitmentService } from './service-recruitment.service';
import { ServiceRecruitmentController } from './service-recruitment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceRecruitment } from './entities/service-recruitment.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { CreateServiceRecruitmentTransaction } from './transactions/create-service-recruitment.transaction';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { UpdateServiceRecruitmentTransaction } from './transactions/update-service-recruitment.transactions';
import { ServiceRecruitmentImage } from '../service-recruitment-images/entities/service-recruitment-image.entity';
import { ServiceRecruitmentImagesService } from '../service-recruitment-images/service-recruitment-images.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceRecruitment, ServiceRecruitmentImage]),
    JwtAccessTokenServiceModule
  ],
  controllers: [ServiceRecruitmentController],
  providers: [ServiceRecruitmentService, CreateServiceRecruitmentTransaction, CloudinaryService, UpdateServiceRecruitmentTransaction, ServiceRecruitmentImagesService],
  exports: [ServiceRecruitmentService]
})
export class ServiceRecruitmentModule {}
