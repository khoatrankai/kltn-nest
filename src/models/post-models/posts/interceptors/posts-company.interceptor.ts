import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { Post } from "../entities";
import { PostNormally } from "../serialization/normally-post.class";


export class PostsCompaniesInterceptor implements NestInterceptor {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
          map((post: any) => {
            const lang = _context.switchToHttp().getRequest().lang;
            const data = post?.data.map((data: Post) => {
              const postSerialization = new PostNormally(
                data,
                lang,
              );
              return postSerialization;
            });
    
            return {
              status: _context.switchToHttp().getResponse().statusCode,
              data: {
                posts: data,
                is_over: post.is_over,
                total : post.total
              },
              message: _context.switchToHttp().getResponse().statusMessage,
            };
          }),
        );
      }
}