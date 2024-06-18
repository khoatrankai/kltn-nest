import { PartialType } from '@nestjs/swagger';
import { CreateProfileLanguageDto } from './create-profile-language.dto';

export class UpdateProfileLanguageDto extends PartialType(CreateProfileLanguageDto) {

    id!:number;

}
