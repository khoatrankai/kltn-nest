import { Module } from '@nestjs/common';
import { FcmTokensService } from './fcm-tokens.service';
// import { FcmTokensController } from './fcm-tokens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FcmTokensEntity } from './entities/fcm-tokens.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FcmTokensEntity
    ])
  ],
  // controllers: [FcmTokensController],
  providers: [FcmTokensService],
  exports: [FcmTokensService]
})
export class FcmTokensModule {}
