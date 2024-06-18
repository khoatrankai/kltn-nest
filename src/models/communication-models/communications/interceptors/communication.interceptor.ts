import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Communication } from '../entities/communication.entity';
import { CommunicationSerialization } from '../serialization/communication.serialization';

export class CommunicationInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(
        (communication: Communication[]) => {
          const lang = _context.switchToHttp().getRequest().lang;
          return {
            status: _context.switchToHttp().getResponse().statusCode,
            data: {
              communications: communication.map((communication) =>
                Object.assign(
                  new CommunicationSerialization(communication, lang),
                ),
              ),
            },

            message: _context.switchToHttp().getResponse().statusMessage,
          };
        },
      ),
    );
  }
}
