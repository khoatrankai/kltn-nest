import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CommunicationsService } from './communications.service';
import { CommunicationsController } from './communications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Communication } from './entities/communication.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { CreateCommunicationTransaction } from './transactions/create-communication.transaction';
import { CommunicationImagesModule } from '../communication-images/communication-images.module';
import { CommunicationCategoriesModule } from '../communication-categories/communication-categories.module';
import { AWSModule } from 'src/providers/storage/aws/provider.module';
import { UpdateCommunicationTransaction } from './transactions/update-communication.transaction';
import { UpdateCommunicationAdminTransaction } from './transactions/update-communication-admin.transaction';
import { PageAndLimitMiddleware } from 'src/common/middlewares/page-limit/page-limit.middleware';
import { CommunicationLikesModule } from '../communication-likes/communication-likes.module';
import { CommunicationCommentsModule } from '../communication-comments/communication-comments.module';
import { CommunicationViewsModule } from '../communication-views/communication-views.module';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Communication]),
    JwtAccessTokenServiceModule,
    CommunicationImagesModule,
    CommunicationCategoriesModule,
    AWSModule,
    CommunicationLikesModule,
    CommunicationViewsModule,
    CommunicationCommentsModule,
  ],
  controllers: [CommunicationsController],
  providers: [
    CommunicationsService,
    CreateCommunicationTransaction,
    UpdateCommunicationTransaction,
    UpdateCommunicationAdminTransaction,
    CloudinaryService
  ],
  exports: [CommunicationsService],
})
export class CommunicationsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(PageAndLimitMiddleware)
    .exclude(
      // { path: 'communications/:id', method: RequestMethod.GET },
      { path: 'communications/:id', method: RequestMethod.PUT },
      { path: 'communications', method: RequestMethod.POST },
    )
    .forRoutes(
      { path: 'communications', method: RequestMethod.GET },
      { path: 'communications/news', method: RequestMethod.GET },
      { path: 'communications/working-story', method: RequestMethod.GET },
      // { path: 'communications/:id', method: RequestMethod.GET },
      { path: 'communications/:id/comments', method: RequestMethod.POST },
    )
  }
}
