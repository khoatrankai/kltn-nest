import { PartialType } from '@nestjs/mapped-types';
import { CreateCvsPostDto } from './create-cvs-post.dto';

export class UpdateCvsPostDto extends PartialType(CreateCvsPostDto) {}
