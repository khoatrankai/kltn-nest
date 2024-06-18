import { PartialType } from '@nestjs/swagger';
import { CreateProfilesAwardDto } from './create-profiles-award.dto';

export class UpdateProfilesAwardDto extends PartialType(CreateProfilesAwardDto) {

    id!:number;
}
