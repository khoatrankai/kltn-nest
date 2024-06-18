import { PartialType } from '@nestjs/swagger';
import { CreateHistoriesRecruiterDto } from './create-histories-recruiter.dto';

export class UpdateHistoriesRecruiterDto extends PartialType(CreateHistoriesRecruiterDto) {}
