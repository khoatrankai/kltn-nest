import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { CommunicationViewSerialization } from '../serialization/communication-views.serialization';
import { CommunicationView } from '../entities/communication-view.entity';

export class CommunicationViewInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((communicationView: CommunicationView[]) => {

        const lang = _context.switchToHttp().getRequest().lang;

        const data = communicationView?.map((communicationView: CommunicationView) => {
          const communicationViewSerialization = new CommunicationViewSerialization(
            communicationView,
            lang
          );
          return communicationViewSerialization;
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
