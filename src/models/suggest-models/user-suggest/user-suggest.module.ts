import { Module } from '@nestjs/common';
import { UserSuggestService } from './user-suggest.service';
import { UserSuggestController } from './user-suggest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { Post } from 'src/models/post-models/posts/entities';
import { Profile } from 'src/models/profile-models/profiles/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    TypeOrmModule.forFeature([Profile]),
    JwtAccessTokenServiceModule,
  ],
  controllers: [UserSuggestController],
  providers: [UserSuggestService],
  exports: [UserSuggestService],
})
export class UserSuggestModule {}
