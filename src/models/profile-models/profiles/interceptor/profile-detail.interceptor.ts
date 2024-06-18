import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Profile } from '../entities';
import { ProfileSerialization } from '../serialization/profile-detail.serialization';

export class ProfileDetailInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((profile: Profile) => {
        const lang = _context.switchToHttp().getRequest().lang;
        const profileSerialization = new ProfileSerialization(profile, lang);
        Object.assign(profileSerialization, profile);
        return {
          status: _context.switchToHttp().getResponse().statusCode,
          data: profileSerialization,
          message: _context.switchToHttp().getResponse().statusMessage,
        };
      }),
    );
  }
}
