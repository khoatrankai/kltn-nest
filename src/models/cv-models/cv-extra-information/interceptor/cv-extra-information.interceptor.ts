import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { CvExtraInformation } from '../entities/cv-extra-information.entity';
import { CvExtraInformationSerialization } from '../serialization/cv-extra-information.serialization';

export class CvExtraInformationInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((cvExtraInformation: CvExtraInformation[]) => {

        const data = cvExtraInformation.map(cvExtra => {
            return Object.assign(new CvExtraInformationSerialization(cvExtra));
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
