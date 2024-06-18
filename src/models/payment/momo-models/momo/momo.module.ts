import { Module } from '@nestjs/common';
import { MomoService } from './momo.service';
import { MomoController } from './momo.controller';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { UserPointHistoriesModule } from 'src/models/point-models/user-point-histories/user-point-histories.module';
import { UserPointHistoriesService } from 'src/models/point-models/user-point-histories/user-point-histories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPointHistory } from 'src/models/point-models/user-point-histories/entities/user-point-history.entity';
import { ProfilesModule } from 'src/models/profile-models/profiles/profiles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserPointHistory]),
    JwtAccessTokenServiceModule,
    UserPointHistoriesModule,
    ProfilesModule
  ],
  controllers: [MomoController],
  providers: [MomoService, UserPointHistoriesService],
})
export class MomoModule {}
