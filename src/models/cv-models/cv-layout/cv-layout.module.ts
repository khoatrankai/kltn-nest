import { Module } from '@nestjs/common';
import { CvLayoutService } from './cv-layout.service';
import { CvLayoutController } from './cv-layout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvLayout } from './entities/cv-layout.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CvLayout]),
    JwtAccessTokenServiceModule
  ],
  controllers: [CvLayoutController],
  providers: [CvLayoutService]
})
export class CvLayoutModule {}
