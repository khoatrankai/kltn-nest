import { PartialType } from '@nestjs/swagger';
import { CreateMailLoggerDto } from './create-mail-logger.dto';

export class UpdateMailLoggerDto extends PartialType(CreateMailLoggerDto) {}
