import { Module } from '@nestjs/common';
import { FollowCompaniesService } from './follow-companies.service';
import { FollowCompaniesController } from './follow-companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowCompany } from './entities/follow-company.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [TypeOrmModule.forFeature([FollowCompany]), JwtAccessTokenServiceModule],
  controllers: [FollowCompaniesController],
  providers: [FollowCompaniesService],
  exports: [FollowCompaniesService]
})
export class FollowCompaniesModule {}
