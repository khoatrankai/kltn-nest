import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Company } from '../entities/company.entity';
import { AllCompanySerialization } from '../serialization/all-company.serialization';

export class AllCompanyInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((allCompany: any) => {
        if (
          allCompany.length >
          _context.switchToHttp().getRequest().checkOverLimit
        ) {
          allCompany.pop();
        }

        const data = allCompany?.data?.map((company: Company) => {
          const companySerialization = new AllCompanySerialization(company);
          return companySerialization;
        });

        return {
          status: _context.switchToHttp().getResponse().statusCode,
          data: {
            total: allCompany.total,
            companies: data,
            is_over: allCompany.is_over,
          },
          message: _context.switchToHttp().getResponse().statusMessage,
        };
      }),
    );
  }
}
