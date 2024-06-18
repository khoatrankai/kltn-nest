import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { AWSModule } from 'src/providers/storage/aws/provider.module';
import { CompanyImagesModule } from '../company-images/company-images.module';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { FollowCompany } from '../follow-companies/entities/follow-company.entity';
import { BookmarksModule } from 'src/models/bookmarks/bookmarks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Company,
      FollowCompany,
    ]),
    JwtAccessTokenServiceModule,
    AWSModule,
    CompanyImagesModule,
    BookmarksModule,
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService, CloudinaryService]
})
export class CompaniesModule {}
