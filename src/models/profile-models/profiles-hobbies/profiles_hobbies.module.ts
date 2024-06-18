import { Module } from '@nestjs/common';
import { ProfilesHobbiesService } from './profiles_hobbies.service';
import { ProfilesHobbiesController } from './profiles_hobbies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesHobby } from './entities/profiles_hobby.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfilesHobby]),
    JwtAccessTokenServiceModule
  ],
  controllers: [ProfilesHobbiesController],
  providers: [ProfilesHobbiesService],
  exports: [ProfilesHobbiesService]
})
export class ProfilesHobbiesModule {}
