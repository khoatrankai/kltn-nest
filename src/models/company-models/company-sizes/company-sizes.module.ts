import { Module } from '@nestjs/common';
import { CompanySizesService } from './company-sizes.service';
import { CompanySizesController } from './company-sizes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanySize } from './entities/company-size.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanySize
    ])
  ],
  controllers: [CompanySizesController],
  providers: [CompanySizesService],
  exports: [CompanySizesService]
})
export class CompanySizesModule {}
