import { PartialType } from '@nestjs/swagger';
import { CreatePostsImageDto } from './create-posts-image.dto';

export class UpdatePostsImageDto extends PartialType(CreatePostsImageDto) {}
