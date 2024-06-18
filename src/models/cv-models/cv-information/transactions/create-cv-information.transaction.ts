import { Injectable } from '@nestjs/common';
import { BaseTransaction } from 'src/providers/database/mariadb/transaction';
import { CreateCvInformationDto } from '../dto/create-cv-information.dto';
import { CvInformation } from '../entities/cv-information.entity';
import { DataSource, EntityManager } from 'typeorm';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { BUCKET_IMAGE_CV_INFORMATION_UPLOAD } from 'src/common/constants';

@Injectable()
export class CreateCvInformationTransaction extends BaseTransaction<
  CreateCvInformationDto,
  CvInformation
> {
  constructor(
    dataSource: DataSource,
    private cloudinaryService: CloudinaryService,
  ) {
    super(dataSource);
  }
  protected async execute(
    createCvInformationDto: CreateCvInformationDto,
    manager: EntityManager,
  ): Promise<any> {
    try {
      const dataCvInformation = await manager.findOne(CvInformation, {
        where: {
          accountId: createCvInformationDto.accountId,
          cvIndex: createCvInformationDto.cvIndex,
        },
      });

      if (dataCvInformation) {
        await manager.delete(CvInformation, {
          accountId: createCvInformationDto.accountId,
          cvIndex: createCvInformationDto.cvIndex,
        });
      }

      if (createCvInformationDto.images) {
        const imagesUploaded = await this.cloudinaryService.uploadImages(
          createCvInformationDto.images,
          {
            BUCKET: BUCKET_IMAGE_CV_INFORMATION_UPLOAD,
            id: '',
          },
        );

        createCvInformationDto.avatar = imagesUploaded[0];
      }

      if (createCvInformationDto.avatarPath) {
        const length = createCvInformationDto.avatarPath.split('/').length;
        const avatar = createCvInformationDto.avatarPath.split('/')[length - 1];
        createCvInformationDto.avatar = avatar;
      }

      const newCvInformationEntity = manager.create(
        CvInformation,
        createCvInformationDto,
      );

      const newCvInformation = await manager.save(newCvInformationEntity);

      return newCvInformation;
    } catch (error) {
      throw error;
    }
  }
}
