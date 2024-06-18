import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from './entities/bookmark.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(Bookmark)
    private bookmarkRepository: Repository<Bookmark>
  ) {}

  findByUserId(userId: string): Promise<Bookmark[]> {
    return this.bookmarkRepository
      .createQueryBuilder('bookmarks')
      .select([
        'bookmarks.postId',
      ])
      .where('bookmarks.account_id = :userId', { userId })
      .getMany();
  }

  findByPostIdAndUserId(postId: number, userId: string): Promise<Bookmark | null> {
    return this.bookmarkRepository
      .createQueryBuilder('bookmarks')
      .where('bookmarks.post_id = :postId', { postId })
      .andWhere('bookmarks.account_id = :userId', { userId })
      .getOne();
  }

  create(_createBookmarkDto: CreateBookmarkDto) {
    return 'This action adds a new bookmark';
  }

  findAll() {
    return `This action returns all bookmarks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookmark`;
  }

  update(id: number, _updateBookmarkDto: UpdateBookmarkDto) {
    return `This action updates a #${id} bookmark`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookmark`;
  }
}
