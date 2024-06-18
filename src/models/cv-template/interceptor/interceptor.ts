import { CvTemplateSerialization } from './../serialization/serialization';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { CvTemplate } from '../entities/cv-template.entity';

export class CvTemplateInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((cvTemplates: CvTemplate[]) => {

        const data = cvTemplates.map(cvTemplate => {
            return Object.assign(new CvTemplateSerialization(), cvTemplate);
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
