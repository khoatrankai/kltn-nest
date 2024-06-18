import { PartialType } from '@nestjs/swagger';
import { CreateProfilesHobbyDto } from './create-profiles_hobby.dto';

export class UpdateProfilesHobbyDto extends PartialType(CreateProfilesHobbyDto) {}
