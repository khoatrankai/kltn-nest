import { PartialType } from '@nestjs/swagger';
import { CreateProfilesIntershipDto } from './create-profiles-intership.dto';

export class UpdateProfilesIntershipDto extends PartialType(CreateProfilesIntershipDto) {

    id!:number;
}
