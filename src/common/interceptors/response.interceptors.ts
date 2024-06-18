import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";


@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    async intercept(_context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        return next.handle().pipe(
            map((data) => {
                console.log('ResponseInterceptor')
                return {
                    status: _context.switchToHttp().getResponse().statusCode,
                    data: data,
                    message: _context.switchToHttp().getResponse().statusMessage,
                }
            })
        )
    }
}