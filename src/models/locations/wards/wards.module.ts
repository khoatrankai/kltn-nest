import { Module } from '@nestjs/common';
import { WardsService } from './wards.service';
// import { WardsController } from './wards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ward } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ward])
  ],
  // controllers: [WardsController],
  providers: [WardsService],
  exports: [WardsService],
})
export class WardsModule {}
