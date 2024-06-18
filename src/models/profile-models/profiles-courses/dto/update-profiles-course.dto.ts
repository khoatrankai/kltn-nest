import { PartialType } from '@nestjs/swagger';
import { CreateProfilesCourseDto } from './create-profiles-course.dto';

export class UpdateProfilesCourseDto extends PartialType(CreateProfilesCourseDto) {}
