import { Module } from '@nestjs/common';
import { SalaryTypesService } from './salary-types.service';
import { SalaryTypesController } from './salary-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalaryType } from './entities/salary-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SalaryType
    ])
  ],
  controllers: [SalaryTypesController],
  providers: [SalaryTypesService]
})
export class SalaryTypesModule {}
