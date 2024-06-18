import { ApplicationsService } from 'src/models/application-model/applications/applications.service';
import { BookmarksService } from 'src/models/bookmarks/bookmarks.service';
import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Post } from '../entities';
import { PostDetailSeialization } from '../serialization/posts-detail.serialization';

@Injectable()
export class PostDetailInterceptor implements NestInterceptor {
  constructor(
    private bookmarksService: BookmarksService,
    private applicationService: ApplicationsService,
  ) {}

  async intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const lang = _context.switchToHttp().getRequest()['lang'];

    const user_id = _context.switchToHttp().getRequest()['user']?.id;

    let bookmarked: boolean, applied: boolean;
    let application: any;
    if (user_id) {
      await this.bookmarksService
        .findByPostIdAndUserId(
          _context.switchToHttp().getRequest().params.id,
          user_id,
        )
        .then((res) => {
          bookmarked = res ? true : false;
        });

      await this.applicationService
        .findOneByPostIdAndAccountId(
          _context.switchToHttp().getRequest().params.id,
          user_id,
        )
        .then((res) => {
          application = res;
          applied = res ? true : false;
        });
    }

    return next.handle().pipe(
      map((posts: Post) => {
        if (!posts) {
          return {
            status: HttpStatus.NOT_FOUND,
            message: 'Post not found',
            data: null,
          };
        }

        const data = new PostDetailSeialization(posts, lang);

        data.bookmarked = bookmarked || false;
        data.application = {
          id: application?.id || null,
          status: application?.status || null,
        };
        data.applied = applied || false;

        return {
          status: _context.switchToHttp().getResponse().statusCode,
          message: _context.switchToHttp().getResponse().statusMessage,
          data,
        };
      }),
    );
  }
}
