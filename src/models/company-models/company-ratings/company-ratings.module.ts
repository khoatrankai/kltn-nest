import { Module } from '@nestjs/common';
import { CompanyRatingsService } from './company-ratings.service';
import { CompanyRatingsController } from './company-ratings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyRating } from './entities/company-rating.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyRating]),
    JwtAccessTokenServiceModule,
  ],
  controllers: [CompanyRatingsController],
  providers: [CompanyRatingsService],
  exports: [CompanyRatingsService],
})
export class CompanyRatingsModule {}
