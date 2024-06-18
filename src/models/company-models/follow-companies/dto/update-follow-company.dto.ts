import { PartialType } from '@nestjs/mapped-types';
import { CreateFollowCompanyDto } from './create-follow-company.dto';

export class UpdateFollowCompanyDto extends PartialType(CreateFollowCompanyDto) {}
