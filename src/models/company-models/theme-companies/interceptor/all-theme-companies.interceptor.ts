import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { ThemeCompany } from "../entities/theme-company.entity";
import { ThemeCompaniesSerialization } from "../serialization/theme-companies.serializatin";

export class AllThemeCompaniesInterceptor implements NestInterceptor {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
          map((themeCompany: ThemeCompany[]) => {
            const data = themeCompany?.map((data: ThemeCompany) => {
              const themeCompaniesSerialization = new ThemeCompaniesSerialization(
                data
              );
              return themeCompaniesSerialization;
            });
    
            return {
              status: _context.switchToHttp().getResponse().statusCode,
              data,
              message: _context.switchToHttp().getResponse().statusMessage,
            };
          }),
        );
      }
}