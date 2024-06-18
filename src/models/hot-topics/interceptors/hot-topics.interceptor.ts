import {
    CallHandler,
    ExecutionContext,
    Injectable,
        // Logger,
    NestInterceptor,
} from '@nestjs/common';
// import { Observable, map } from 'rxjs';
// import { HotTopicSerializer } from '../serializations/hot-topics.serialization';
import { PostsService } from 'src/models/post-models/posts/posts.service';
import { HotTopicQueriesDto } from 'src/models/post-models/posts/dto/hot-topic-queries.dto';

@Injectable()
export class HotTopicsInterxceptor implements NestInterceptor {
    constructor(
        private postsService: PostsService
    ) { }

    async intercept(
        _context: ExecutionContext,
        next: CallHandler<any>,
    ): Promise<any> {
        // const lang = _context.switchToHttp().getRequest()['lang'];
        const data = next.handle().toPromise()
        return data.then((res) => {
            return Promise.all(res.map(async (hotTopic: { query: string[]; }) => {
                let count = await this.postsService.countByQuery(HotTopicQueriesDto.from(hotTopic.query[0]));
                return {
                    ...hotTopic,
                    count
                };
            }));
        }).then((res) => {
            return res;
        })        
    }
}
