import { PartialType } from '@nestjs/swagger';
import { CreateProfilesActivityDto } from './create-profiles-activity.dto';

export class UpdateProfilesActivityDto extends PartialType(CreateProfilesActivityDto) {

    id!:number;
}
