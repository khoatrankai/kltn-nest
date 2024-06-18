import { Module } from '@nestjs/common';
import { HistoriesRecruiterService } from './histories-recruiter.service';
import { HistoriesRecruiterController } from './histories-recruiter.controller';

@Module({
  controllers: [HistoriesRecruiterController],
  providers: [HistoriesRecruiterService]
})
export class HistoriesRecruiterModule {}
