import { PartialType } from '@nestjs/swagger';
import { CreateProfilesReferenceDto } from './create-profiles-reference.dto';

export class UpdateProfilesReferenceDto extends PartialType(CreateProfilesReferenceDto) {}
