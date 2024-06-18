import { Module } from '@nestjs/common';
import { PostResourceService } from './post-resource.service';
import { PostResourceController } from './post-resource.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostResource } from './entities/post-resource.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostResource
    ])
  ],
  controllers: [PostResourceController],
  providers: [PostResourceService],
  exports: [PostResourceService]
})
export class PostResourceModule {}
