import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { ViewJob } from "../entities/view-job.entity";
import { ViewJobsSerialization } from "../serialization/view-jobs.serialization";


export class ViewJobsInterceptor implements NestInterceptor {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
          map((viewJobs: ViewJob[]) => {
            const lang = _context.switchToHttp().getRequest().lang;
            const data = viewJobs?.map((data: ViewJob) => {
              const viewJobsSerialization = new ViewJobsSerialization(
                data,
                lang,
              );
              return viewJobsSerialization;
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