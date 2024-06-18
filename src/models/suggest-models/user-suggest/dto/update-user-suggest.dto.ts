import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSuggestDto } from './create-user-suggest.dto';

export class UpdateUserSuggestDto extends PartialType(CreateUserSuggestDto) {}
