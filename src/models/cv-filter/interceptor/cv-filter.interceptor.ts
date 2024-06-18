import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Profile } from 'src/models/profile-models/profiles/entities';
import { CVFilterSerialization } from '../serialization/cv-filter.serialization';

export class CVFilterInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((cvFilter: any) => {
        const lang = _context.switchToHttp().getRequest().lang;

        const data = cvFilter?.data?.map((data: Profile) => {
          const academicSerialization = new CVFilterSerialization(data, lang);
          return academicSerialization;
        });

        return {
          status: _context.switchToHttp().getResponse().statusCode,
          data: {
            total: cvFilter.total,
            cvFilters: data,
            is_over: cvFilter.is_over
          },
          message: _context.switchToHttp().getResponse().statusMessage,
        };
      }),
    );
  }
}
