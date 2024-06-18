import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Profile } from 'src/models/profile-models/profiles/entities';
import { UserSuggestSerialization } from '../serialization/user-suggest.serilization';

export class UserSuggestInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(
        (suggestProfile: Profile[]) => {
          return {
            status: _context.switchToHttp().getResponse().statusCode,
            data: {
              suggestProfiles: suggestProfile.map((profile) =>
                Object.assign(
                  new UserSuggestSerialization(profile),
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
