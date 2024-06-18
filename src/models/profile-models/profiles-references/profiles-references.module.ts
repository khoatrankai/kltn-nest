import { Module } from '@nestjs/common';
import { ProfilesReferencesService } from './profiles-references.service';
import { ProfilesReferencesController } from './profiles-references.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesReference } from './entities/profiles-reference.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfilesReference]),
    JwtAccessTokenServiceModule
  ],
  controllers: [ProfilesReferencesController],
  providers: [ProfilesReferencesService],
  exports: [ProfilesReferencesService]
})
export class ProfilesReferencesModule {}
