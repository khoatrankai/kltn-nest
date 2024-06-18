import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CandidateBookmarksService } from './candidate-bookmarks.service';
import { CandidateBookmarksController } from './candidate-bookmarks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateBookmark } from './entities/candidate-bookmark.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { ProfilesModule } from '../profile-models/profiles/profiles.module';
import { PageAndLimitMiddleware } from 'src/common/middlewares/page-limit/page-limit.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([CandidateBookmark]),
    JwtAccessTokenServiceModule,
    ProfilesModule,
  ],
  controllers: [CandidateBookmarksController],
  providers: [CandidateBookmarksService],
})
export class CandidateBookmarksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(PageAndLimitMiddleware)
    .forRoutes(
      { path: 'candidate-bookmarks', method: RequestMethod.GET },
    )
  }
}
