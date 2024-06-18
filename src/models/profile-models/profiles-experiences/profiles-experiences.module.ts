import { Module } from '@nestjs/common';
import { ProfilesExperiencesController } from './profiles-experiences.controller';
import { ProfilesExperiencesService } from './profiles-experiences.service';

@Module({
  controllers: [ProfilesExperiencesController],
  providers: [ProfilesExperiencesService]
})
export class ProfilesExperiencesModule {}
