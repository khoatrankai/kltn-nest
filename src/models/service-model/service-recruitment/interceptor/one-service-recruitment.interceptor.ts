import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { ServiceRecruitment } from "../entities/service-recruitment.entity";
import { ServiceRecruitmentSerialization } from "../serialization/service-recruitment.serialization";

export class OneServiceRecruitmentInterceptor implements NestInterceptor {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((serviceRecruitment: ServiceRecruitment) => {
                const lang = _context.switchToHttp().getRequest().lang;
                const data = new ServiceRecruitmentSerialization(
                    serviceRecruitment,
                    lang,
                );

                return {
                    status: _context.switchToHttp().getResponse().statusCode,
                    data,
                    message: _context.switchToHttp().getResponse().statusMessage,
                };
            }),
        );
    }
}