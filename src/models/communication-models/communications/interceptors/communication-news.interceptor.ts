import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Communication } from '../entities/communication.entity';
import { CommunicationSerialization } from '../serialization/communication.serialization';

export class CommunicationNewsInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((communication: any) => {
        const lang = _context.switchToHttp().getRequest().lang;

        if (communication.length > _context.switchToHttp().getRequest().checkOverLimit ) {
          communication.pop();
        }

        const data = communication?.data?.map((communication: Communication) => {
          const communicationSerialization = new CommunicationSerialization(
            communication,
            lang,
          );
          return communicationSerialization;
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
