import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities';
import { AuthModule } from 'src/authentication/auth.module';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { AWSModule } from 'src/providers/storage/aws/provider.module';
import { UnlockMiddleware } from 'src/common/middlewares/unclock/unlock.middleware';
import { UserModule } from 'src/models/user-model/users/users.module';
import { ProfilesCvsService } from '../profiles-cvs/profiles_cvs.service';
import { ProfilesCvsModule } from '../profiles-cvs/profiles_cvs.module';
import { ProfilesCv } from '../profiles-cvs/entities/profiles_cv.entity';
import { CreateProfileCvsTransaction } from '../profiles-cvs/transaction/profiles_cv.transaction';
import { DeleteProfileCvsTransaction } from '../profiles-cvs/transaction/delete_profiles_cv.transaction';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { Application } from 'src/models/application-model/applications/entities/application.entity';
import { Bookmark } from 'src/models/bookmarks/entities/bookmark.entity';
import { Post } from 'src/models/post-models/posts/entities';
import { FollowCompany } from 'src/models/company-models/follow-companies/entities/follow-company.entity';
import { ViewProfile } from 'src/models/view_profiles/entities/view_profile.entity';
import { KeywordNotification } from 'src/models/keyword-models/keyword-notifications/entities/keyword-notification.entity';
import { CompanyRating } from 'src/models/company-models/company-ratings/entities/company-rating.entity';
import { ViewJob } from 'src/models/view-jobs/entities/view-job.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Profile,
      ProfilesCv,
      Application,
      Bookmark,
      Post,
      FollowCompany,
      ViewProfile,
      KeywordNotification,
      CompanyRating,
      ViewJob
    ]),
    AuthModule,
    JwtAccessTokenServiceModule,
    AWSModule,
    UserModule,
    ProfilesCvsModule
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService, ProfilesCvsService, CreateProfileCvsTransaction, DeleteProfileCvsTransaction, CloudinaryService],
  exports: [ProfilesService]
})
export class ProfilesModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UnlockMiddleware).forRoutes({ path: 'profiles/:id', method: RequestMethod.GET });
  }
}
