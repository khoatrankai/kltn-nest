import { Module } from '@nestjs/common';
import { BlockReasonsService } from './block-reasons.service';
import { BlockReasonsController } from './block-reasons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockReason } from './entities/block-reason.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlockReason]),
    JwtAccessTokenServiceModule
  ],
  controllers: [BlockReasonsController],
  providers: [BlockReasonsService]
})
export class BlockReasonsModule {}
