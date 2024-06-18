import { PartialType } from '@nestjs/swagger';
import { CreateLanguageTypeDto } from './create-language-type.dto';

export class UpdateLanguageTypeDto extends PartialType(CreateLanguageTypeDto) {}
