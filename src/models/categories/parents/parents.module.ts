import { Module } from '@nestjs/common';
import { ParentService } from './parents.service';
import { ParentController } from './parents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentCategory } from './entities/parent.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { ChildCategory } from '../children/entities/child.entity';
import { ChildrenService } from '../children/children.service';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { ViewJob } from 'src/models/view-jobs/entities/view-job.entity';
import { Application } from 'src/models/application-model/applications/entities/application.entity';
import { Bookmark } from 'src/models/bookmarks/entities/bookmark.entity';
import { Post } from 'src/models/post-models/posts/entities';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      ParentCategory, ChildCategory, ViewJob, Application,Bookmark, Post
    ]),
    JwtAccessTokenServiceModule,
  ],
  controllers: [ParentController],
  providers: [ParentService, CloudinaryService , ChildrenService],
  exports: [ParentService]
})
export class ParentModule {}
