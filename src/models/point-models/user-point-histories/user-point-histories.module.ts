import { Module } from '@nestjs/common';
import { UserPointHistoriesService } from './user-point-histories.service';
import { UserPointHistoriesController } from './user-point-histories.controller';
import { UserPointHistory } from './entities/user-point-history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserPointHistory]),
    JwtAccessTokenServiceModule
  ],
  controllers: [UserPointHistoriesController],
  providers: [UserPointHistoriesService],
  exports: [UserPointHistoriesService]
})
export class UserPointHistoriesModule { }
