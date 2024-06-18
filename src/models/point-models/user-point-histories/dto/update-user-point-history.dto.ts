import { PartialType } from '@nestjs/mapped-types';
import { CreateUserPointHistoryDto } from './create-user-point-history.dto';

export class UpdateUserPointHistoryDto extends PartialType(CreateUserPointHistoryDto) {}
