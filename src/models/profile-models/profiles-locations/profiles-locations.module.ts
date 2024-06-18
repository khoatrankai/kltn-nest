import { Module } from '@nestjs/common';
import { ProfilesLocationsService } from './profiles-locations.service';
import { ProfilesLocationsController } from './profiles-locations.controller';

@Module({
  providers: [ProfilesLocationsService],
  controllers: [ProfilesLocationsController]
})
export class ProfilesLocationsModule {}
