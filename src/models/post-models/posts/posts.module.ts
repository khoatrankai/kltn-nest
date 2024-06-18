import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { BookmarksModule } from 'src/models/bookmarks/bookmarks.module';
import { PageAndLimitMiddleware } from 'src/common/middlewares/page-limit/page-limit.middleware';
import { AWSModule } from 'src/providers/storage/aws/provider.module';
import { PostsImagesModule } from '../posts-images/posts-images.module';
import { PostResourceModule } from '../post-resource/post-resource.module';
import { PostsCategoriesModule } from '../posts-categories/posts-categories.module';
import { ApplicationsModule } from 'src/models/application-model/applications/applications.module';
import { PostNotificationsModule } from 'src/models/notifications-model/post-notifications/post-notifications.module';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { CompaniesService } from 'src/models/company-models/companies/companies.service';
import { CompaniesModule } from 'src/models/company-models/companies/companies.module';
import { Company } from 'src/models/company-models/companies/entities/company.entity';
import { FollowCompany } from 'src/models/company-models/follow-companies/entities/follow-company.entity';
import { CompanyImagesService } from 'src/models/company-models/company-images/company-images.service';
import { CompanyImage } from 'src/models/company-models/company-images/entities/company-image.entity';
import { User } from 'src/models/user-model/users/entities';
import { ServiceHistoryService } from 'src/models/service-model/service-history/service-history.service';
import { ServiceHistory } from 'src/models/service-model/service-history/entities/service-history.entity';
import { Profile } from 'src/models/profile-models/profiles/entities';
import { ServiceRecruitment } from 'src/models/service-model/service-recruitment/entities/service-recruitment.entity';
import { WardsModule } from 'src/models/locations/wards/wards.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User, ServiceHistory, Profile, ServiceRecruitment]),
    TypeOrmModule.forFeature([Company]),
    TypeOrmModule.forFeature([FollowCompany]),
    TypeOrmModule.forFeature([CompanyImage]),
    JwtAccessTokenServiceModule,
    BookmarksModule,
    AWSModule,
    PostsImagesModule,
    PostResourceModule,
    PostsCategoriesModule,
    ApplicationsModule,
    PostNotificationsModule,
    CompaniesModule,
    WardsModule
  ],
  controllers: [PostsController],
  providers: [PostsService, CloudinaryService, CompaniesService, CompanyImagesService, ServiceHistoryService],
  exports: [PostsService],
})
export class PostsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(PageAndLimitMiddleware)
        .exclude(
            { path: 'posts/:id', method: RequestMethod.PUT },
            { path: 'posts', method: RequestMethod.POST },
            )
            .forRoutes(
                { path: 'posts', method: RequestMethod.GET },
                { path: 'posts/newest', method: RequestMethod.GET },
                { path: 'posts/topic/:id', method: RequestMethod.GET },
                { path: 'posts/account/:accountId', method: RequestMethod.GET },
            )
    }
}
