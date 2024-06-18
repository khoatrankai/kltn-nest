import { PartialType } from '@nestjs/swagger';
import { CreateCandidateBookmarkDto } from './create-candidate-bookmark.dto';

export class UpdateCandidateBookmarkDto extends PartialType(CreateCandidateBookmarkDto) {}
