import { Module } from '@nestjs/common';
import { UserHistoriesService } from './user-histories.service';
// import { UserHistoriesController } from './user-histories.controller';

@Module({
  // controllers: [UserHistoriesController],
  providers: [UserHistoriesService]
})
export class UserHistoriesModule {}
