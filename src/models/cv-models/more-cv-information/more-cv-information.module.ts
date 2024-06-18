import { Module } from '@nestjs/common';
import { MoreCvInformationService } from './more-cv-information.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoreCvInformation } from './entities/more-cv-information.entity';
import { MoreCvInformationController } from './more-cv-information.controller';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MoreCvInformation]),
    JwtAccessTokenServiceModule
  ],
  controllers: [MoreCvInformationController],
  providers: [MoreCvInformationService],
  exports: [MoreCvInformationService],
})
export class MoreCvInformationModule {}
