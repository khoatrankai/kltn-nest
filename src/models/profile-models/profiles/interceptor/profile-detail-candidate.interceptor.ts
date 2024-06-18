import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ProfileDetailCandidateSerialization } from '../serialization/profile-detail-candidate.serialization';

export class ProfileDetailCandidateInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((profile: any) => {
        console.log(profile.unlock)
        const lang = _context.switchToHttp().getRequest().lang;
        const profileSerialization = new ProfileDetailCandidateSerialization(
          profile?.data,
          lang,
          (profile.unlock === 'true') ? true : false,
        );
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
