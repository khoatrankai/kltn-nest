import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { PostNormally } from '../serialization/normally-post.class';
import { Observable, map } from 'rxjs';
import { Post } from '../entities';
import { BookmarksService } from 'src/models/bookmarks/bookmarks.service';
import { ServiceHistoryService } from 'src/models/service-model/service-history/service-history.service';
@Injectable()
export class PostNewInterceptor implements NestInterceptor {
    // 84264,84215,84198,84089,83971,84433,84432,84431,84430,84429,84428
    constructor(
        private bookmarksService: BookmarksService,
        private serviceHistoryService: ServiceHistoryService
    ) { }

    async intercept(
        _context: ExecutionContext,
        next: CallHandler<any>,
    ): Promise<Observable<any>> {
        const lang = _context.switchToHttp().getRequest()['lang'];

        const user_id = _context.switchToHttp().getRequest()['user']?.id;

        let bookmarks: number[] = [];

        if (user_id) {
            await this.bookmarksService.findByUserId(user_id)
                .then((res) => {
                    for (let i = 0; i < res.length; i++) {
                        bookmarks.push(res[i].postId);
                    }
                })
        }


        return next.handle().pipe(
            map(async (posts: any) => {

                const length = posts?.posts.length;
                let isOver = true;

                if (length === _context.switchToHttp().getRequest().limit) {
                    isOver = false;
                    posts.posts.pop();
                }

                if (length === 0) {
                    return {
                        status: _context.switchToHttp().getResponse().statusCode,
                        data: [],
                        message: _context.switchToHttp().getResponse().statusMessage,
                        is_over: true,
                    }
                }
                const data = await Promise.all(posts.posts.map(async (post: Post) => {
                    const postNormally = new PostNormally(post, lang);

                    if (bookmarks.includes(postNormally.id)) {
                        postNormally.bookmarked = true;
                    }

                    try {
                        const dataType = await this.serviceHistoryService.findOneAndCheckStillActive(post.accountId);

                       
                        postNormally.serviceType = dataType;
                        
                    } catch (error) {
                        console.error("Error occurred while fetching service history:", error);
                    }

                    return postNormally;
                }));
                

                return {
                    status: _context.switchToHttp().getResponse().statusCode,
                    message: _context.switchToHttp().getResponse().statusMessage,
                    is_over: isOver,
                    data,
                    currentPage: posts.currentPage,
                    totalPage: posts.totalPage,
                }
            }),
        );
    }
}