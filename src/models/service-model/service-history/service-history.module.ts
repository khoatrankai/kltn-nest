import { Module } from '@nestjs/common';
import { ServiceHistoryService } from './service-history.service';
import { ServiceHistoryController } from './service-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceHistory } from './entities/service-history.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { Profile } from 'src/models/profile-models/profiles/entities';
import { ServiceRecruitment } from '../service-recruitment/entities/service-recruitment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceHistory, Profile, ServiceRecruitment]),
    JwtAccessTokenServiceModule
  ],
  controllers: [ServiceHistoryController],
  providers: [ServiceHistoryService]
})
export class ServiceHistoryModule {}
