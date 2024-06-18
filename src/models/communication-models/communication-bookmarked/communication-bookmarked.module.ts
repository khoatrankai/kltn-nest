import { Module } from '@nestjs/common';
import { CommunicationBookmarkedService } from './communication-bookmarked.service';
import { CommunicationBookmarkedController } from './communication-bookmarked.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunicationBookmarked } from './entities/communication-bookmarked.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { CommunicationViewsModule } from '../communication-views/communication-views.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommunicationBookmarked]),
    JwtAccessTokenServiceModule,
    CommunicationViewsModule
  ],
  controllers: [CommunicationBookmarkedController],
  providers: [CommunicationBookmarkedService],
})
export class CommunicationBookmarkedModule {}
