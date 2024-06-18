import { Module } from '@nestjs/common';
import { KeywordDistrictsService } from './keyword-districts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordDistrict } from './entities/keyword-districts.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([KeywordDistrict])
  ],
  providers: [KeywordDistrictsService],
  exports: [KeywordDistrictsService]
})
export class KeywordDistrictsModule {}
