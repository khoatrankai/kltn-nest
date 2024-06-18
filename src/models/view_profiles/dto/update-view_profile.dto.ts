import { PartialType } from '@nestjs/swagger';
import { CreateViewProfileDto } from './create-view_profile.dto';

export class UpdateViewProfileDto extends PartialType(CreateViewProfileDto) {}
