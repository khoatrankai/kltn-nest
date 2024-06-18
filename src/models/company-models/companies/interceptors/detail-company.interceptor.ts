import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { DetailCompanySerialization } from '../serialization/detail-company.serialization';

export class DetailCompanyInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((company: any) => {
        const lang = _context.switchToHttp().getRequest()['lang'];

        const data = new DetailCompanySerialization(company, lang);

        return {
          status: _context.switchToHttp().getResponse().statusCode,
          data: data,
          message: _context.switchToHttp().getResponse().statusMessage,
        };
      }),
    );
  }
}
