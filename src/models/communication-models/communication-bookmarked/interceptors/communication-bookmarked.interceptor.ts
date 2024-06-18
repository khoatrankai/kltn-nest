import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { CommunicationBookmarked } from '../entities/communication-bookmarked.entity';
import { CommunicationBookmarkedSerialization } from '../serialization/communication-bookmarked.serialization';

export class CommunicationBookmarkedInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((communicationBookmarked: any) => {
        const lang = _context.switchToHttp().getRequest().lang;

        if (!communicationBookmarked || !communicationBookmarked.data) return null

        const data = communicationBookmarked?.data?.map(
          (communicationBookmarked: CommunicationBookmarked) => {
            const communicationBookmarkedSerialization =
              new CommunicationBookmarkedSerialization(
                communicationBookmarked,
                lang,
              );
            return communicationBookmarkedSerialization;
          },
        );

        return {
          status: _context.switchToHttp().getResponse().statusCode,
          data: {
            total: communicationBookmarked.total,
            communications: data,
            is_over: communicationBookmarked.is_over
          },
          message: _context.switchToHttp().getResponse().statusMessage,
        };
      }),
    );
  }
}
