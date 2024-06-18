import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { AllPostSerialization } from '../serialization/all-post.serialization';

export class AllPostCompanyInterceptor implements NestInterceptor {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((company: any) => {
                // limit, page
                const { limit, page } = _context.switchToHttp().getRequest().query;

                const data = new AllPostSerialization(company, limit, page);

                return {
                    status: _context.switchToHttp().getResponse().statusCode,
                    data: data,
                    message: _context.switchToHttp().getResponse().statusMessage,
                };
            }),
        );
    }
}
