import { Module } from '@nestjs/common';
import { ProfileLanguagesService } from './profile-languages.service';
import { ProfileLanguagesController } from './profile-languages.controller';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileLanguage } from './entities/profile-language.entity';
import { LanguageTypesModule } from '../types/language-types/language-types.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileLanguage]),
    LanguageTypesModule,
    JwtAccessTokenServiceModule
  ],
  controllers: [ProfileLanguagesController],
  providers: [ProfileLanguagesService]
})
export class ProfileLanguagesModule {}
