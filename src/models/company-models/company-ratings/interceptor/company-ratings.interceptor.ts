import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { CompanyRatingsSerialization } from '../serialization/company-ratings.serialization';

export class CompanyRatingsInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((companyRating: any) => {
        return {
          status: _context.switchToHttp().getResponse().statusCode,
          data: {
            total: companyRating.total,
            averageRated: companyRating.totalStar,
            companyRatings: companyRating?.data.map((cmr: any) =>
              Object.assign(new CompanyRatingsSerialization(cmr)),
            ),
            is_over: companyRating.is_over
          },

          message: _context.switchToHttp().getResponse().statusMessage,
        };
      }),
    );
  }
}
