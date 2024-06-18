import { Module } from '@nestjs/common';
import { CommunicationImagesService } from './communication-images.service';
import { CommunicationImagesController } from './communication-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunicationImage } from './entities/communication-image.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommunicationImage
    ]),
    JwtAccessTokenServiceModule
  ],
  controllers: [CommunicationImagesController],
  providers: [CommunicationImagesService],
  exports: [CommunicationImagesService]
})
export class CommunicationImagesModule {}
