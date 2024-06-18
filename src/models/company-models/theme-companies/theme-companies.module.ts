import { Module } from '@nestjs/common';
import { ThemeCompaniesService } from './theme-companies.service';
import { ThemeCompaniesController } from './theme-companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeCompany } from './entities/theme-company.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ThemeCompany]),
    JwtAccessTokenServiceModule
  ],
  controllers: [ThemeCompaniesController],
  providers: [ThemeCompaniesService, CloudinaryService]
})
export class ThemeCompaniesModule {}
