import { Module } from '@nestjs/common';
import { AcademicTypesService } from './academic_types.service';
import { AcademicTypesController } from './academic_types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicType } from './entities/academic_type.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AcademicType]),
    JwtAccessTokenServiceModule
  ],
  controllers: [AcademicTypesController],
  providers: [AcademicTypesService],
  exports: [AcademicTypesService]
})
export class AcademicTypesModule {}
