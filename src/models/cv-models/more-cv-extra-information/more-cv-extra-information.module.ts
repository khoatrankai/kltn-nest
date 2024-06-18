import { Module } from '@nestjs/common';
import { MoreCvExtraInformationService } from './more-cv-extra-information.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoreCvExtraInformation } from './entities/more-cv-extra-information.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MoreCvExtraInformation])
  ],
  controllers: [],
  providers: [MoreCvExtraInformationService],
  exports: [MoreCvExtraInformationService]
})
export class MoreCvExtraInformationModule {}
