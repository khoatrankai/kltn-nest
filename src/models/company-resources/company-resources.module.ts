import { Module } from '@nestjs/common';
import { CompanyResourcesService } from './company-resources.service';
import { CompanyResourcesController } from './company-resources.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyResource } from './entities/company-resources.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyResource
    ])
  ],
  controllers: [CompanyResourcesController],
  providers: [CompanyResourcesService]
})
export class CompanyResourcesModule {}
