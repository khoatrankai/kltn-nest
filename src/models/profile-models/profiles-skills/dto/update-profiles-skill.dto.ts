import { PartialType } from '@nestjs/swagger';
import { CreateProfilesSkillDto } from './create-profiles-skill.dto';

export class UpdateProfilesSkillDto extends PartialType(CreateProfilesSkillDto) {

    id!:number;
}
