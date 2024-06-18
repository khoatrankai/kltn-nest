import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CvFilterService } from './cv-filter.service';
import { CvFilterController } from './cv-filter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../profile-models/profiles/entities';
import { PageAndLimitMiddleware } from 'src/common/middlewares/page-limit/page-limit.middleware';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), JwtAccessTokenServiceModule],
  controllers: [CvFilterController],
  providers: [CvFilterService],
})
export class CvFilterModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PageAndLimitMiddleware)
      .forRoutes({ path: 'search', method: RequestMethod.GET });
  }
}
