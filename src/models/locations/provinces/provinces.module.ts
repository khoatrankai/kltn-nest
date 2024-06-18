import { Module } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
// import { ProvincesController } from './provinces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Province])
  ],
  // controllers: [ProvincesController],
  providers: [ProvincesService],
  exports: [ProvincesService],
})
export class ProvincesModule {}
