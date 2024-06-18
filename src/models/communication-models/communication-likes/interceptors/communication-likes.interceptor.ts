import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { CommunicationLike } from '../entities/communication-like.entity';
import { CommunicationLikeSerialization } from '../serialization/communication-likes.serialization';

export class CommunicationLikeInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((communicationLike: CommunicationLike[]) => {
        const lang = _context.switchToHttp().getRequest().lang;

        const data = communicationLike?.map(
          (communicationLike: CommunicationLike) => {
            const communicationLikeSerialization =
              new CommunicationLikeSerialization(communicationLike, lang);
            return communicationLikeSerialization;
          },
        );

        return {
          status: _context.switchToHttp().getResponse().statusCode,
          data: data,
          message: _context.switchToHttp().getResponse().statusMessage,
        };
      }),
    );
  }
}
