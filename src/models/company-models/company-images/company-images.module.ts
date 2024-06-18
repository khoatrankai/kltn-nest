import { Module } from '@nestjs/common';
import { CompanyImagesService } from './company-images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyImage } from './entities/company-image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyImage
    ]),
  ],
  providers: [CompanyImagesService],
  exports: [CompanyImagesService]
})
export class CompanyImagesModule {}
