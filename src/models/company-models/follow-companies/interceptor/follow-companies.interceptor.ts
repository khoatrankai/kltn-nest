import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { FollowCompany } from "../entities/follow-company.entity";
import { FollowCompanySerialization } from "../serialization/follow-companies.serialization";

export class FollowCompanyInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((followCompany: FollowCompany[]) => {
        const lang = _context.switchToHttp().getRequest().lang;
        const data = followCompany?.map((data: FollowCompany) => {
          const followCompanySerialization = new FollowCompanySerialization(
            data,
            lang,
          );
          return followCompanySerialization;
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