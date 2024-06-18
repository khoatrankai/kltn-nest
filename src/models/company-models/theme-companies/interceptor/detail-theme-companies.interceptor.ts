import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { ThemeCompany } from "../entities/theme-company.entity";
import { ThemeCompaniesSerialization } from "../serialization/theme-companies.serializatin";

export class DetailThemeCompaniesInterceptor implements NestInterceptor {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((themeCompany: ThemeCompany) => {

                const themeCompaniesSerialization = new ThemeCompaniesSerialization(
                    themeCompany
                );

                return {
                    status: _context.switchToHttp().getResponse().statusCode,
                    data: themeCompaniesSerialization,
                    message: _context.switchToHttp().getResponse().statusMessage,
                };
            }),
        );
    }
}