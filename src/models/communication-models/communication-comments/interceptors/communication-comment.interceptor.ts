import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { CommunicationComment } from '../entities/communication-comment.entity';
import { CommunicationCommentSerialization } from '../serialization/communication-comment.serialization';

export class CommunicationCommentInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((communicationComment: CommunicationComment[]) => {
        const lang = _context.switchToHttp().getRequest().lang;

        const data = communicationComment.map((communicationComment: CommunicationComment) => {
          const communicationCommentSerialization = new CommunicationCommentSerialization(
            communicationComment,
            lang
          );
          return communicationCommentSerialization;
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
