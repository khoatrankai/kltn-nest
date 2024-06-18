import { Module } from '@nestjs/common';
import { LanguageTypesService } from './language-types.service';
import { LanguageTypesController } from './language-types.controller';
import { LanguageType } from './entities/language-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LanguageType]),
    JwtAccessTokenServiceModule
  ],
  controllers: [LanguageTypesController],
  providers: [LanguageTypesService],
  exports: [LanguageTypesService],
})
export class LanguageTypesModule {}
