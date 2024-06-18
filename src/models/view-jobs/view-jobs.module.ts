import { Module } from '@nestjs/common';
import { ViewJobsService } from './view-jobs.service';
import { ViewJobsController } from './view-jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViewJob } from './entities/view-job.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ViewJob]),
    JwtAccessTokenServiceModule
  ],
  controllers: [ViewJobsController],
  providers: [ViewJobsService],
  exports: [ViewJobsService, ViewJobsService]
})
export class ViewJobsModule {}
