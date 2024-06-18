import { Module } from '@nestjs/common';
import { ViewProfilesService } from './view_profiles.service';
import { ViewProfilesController } from './view_profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViewProfile } from './entities/view_profile.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { UserModule } from '../user-model/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ViewProfile]),
    JwtAccessTokenServiceModule,
    UserModule
  ],
  controllers: [ViewProfilesController],
  providers: [ViewProfilesService],
  exports: [ViewProfilesService]
})
export class ViewProfilesModule {}
