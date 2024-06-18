import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { CvInformation } from '../entities/cv-information.entity';
import { CVInformationSerialization } from '../serialization/cv-information.serialization';

export class CvInformationInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((cvInfor: CvInformation) => {
        const cvInforSerialization = new CVInformationSerialization(cvInfor);
        Object.assign(cvInforSerialization, cvInfor);
        return {
          status: _context.switchToHttp().getResponse().statusCode,
          data: cvInforSerialization,
          message: _context.switchToHttp().getResponse().statusMessage,
        };
      }),
    );
  }
}
