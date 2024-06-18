import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Communication } from '../entities/communication.entity';
import { CommunicationCreateSerialization } from '../serialization/communication-create.serialization';

export class CommunicationCreateInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((communication: any) => {
        const lang = _context.switchToHttp().getRequest().lang;

        if (!communication || !communication.data) return null;

        const data = communication?.data.map((communication: Communication) => {
          const communicationCreateSerialization =
            new CommunicationCreateSerialization(communication, lang);
          return communicationCreateSerialization;
        });

        return {
          status: _context.switchToHttp().getResponse().statusCode,
          data: {
            total: communication.total,
            communications: data,
            is_over: communication.is_over
          },
          message: _context.switchToHttp().getResponse().statusMessage,
        };
      }),
    );
  }
}
