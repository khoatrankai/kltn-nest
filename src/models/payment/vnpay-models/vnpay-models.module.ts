import { Module } from '@nestjs/common';
import { VnpayModelsService } from './vnpay-models.service';
import { VnpayModelsController } from './vnpay-models.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { UserPointHistoriesModule } from 'src/models/point-models/user-point-histories/user-point-histories.module';
import { UserPointHistoriesService } from 'src/models/point-models/user-point-histories/user-point-histories.service';
import { UserPointHistory } from 'src/models/point-models/user-point-histories/entities/user-point-history.entity';
import { ProfilesModule } from 'src/models/profile-models/profiles/profiles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserPointHistory]),
    JwtAccessTokenServiceModule,
    UserPointHistoriesModule,
    ProfilesModule
  ],
  controllers: [VnpayModelsController],
  providers: [VnpayModelsService, UserPointHistoriesService]
})
export class VnpayModelsModule {}
