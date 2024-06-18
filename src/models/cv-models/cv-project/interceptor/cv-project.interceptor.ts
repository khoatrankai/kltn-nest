import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { CvProject } from '../entities/cv-project.entity';
import { CvProjectSerialization } from '../serialization/cv-project.serialization';

export class CvProjectInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((cvProject: CvProject[]) => {

        const data = cvProject?.map(cvExtra => {
            return Object.assign(new CvProjectSerialization(cvExtra));
        });

        return {
          status: _context.switchToHttp().getResponse().statusCode,
          data: data,
          message: _context.switchToHttp().getResponse().statusMessage,
        };
      }),
    );
  }
}
