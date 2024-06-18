import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { PostNormally } from 'src/models/post-models/posts/serialization/normally-post.class';

export class PostOfMonthRecruiterInterceptor implements NestInterceptor {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((posts: any) => {
                const lang = _context.switchToHttp().getRequest().lang;

                let postsRes = posts.data.map((post: any) => {
                    const postNormally = new PostNormally(post, lang);
                    return postNormally;
                });
                return {
                    status: _context.switchToHttp().getResponse().statusCode,
                    totalPosts: posts.total,
                    currentPage: posts.currentPage,
                    totalPage: posts.totalPage,
                    data: postsRes,
                    message: _context.switchToHttp().getResponse().statusMessage,
                };
            }),
        );
    }
}
