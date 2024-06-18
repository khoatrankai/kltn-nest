import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseTransaction } from 'src/providers/database/mariadb/transaction';
import { CreateCommunicationDto } from '../dto/create-communication.dto';
import { Communication } from '../entities/communication.entity';
import { DataSource, EntityManager } from 'typeorm';
import { CommunicationImagesService } from '../../communication-images/communication-images.service';
import { CommunicationCategoriesService } from '../../communication-categories/communication-categories.service';
import { CreateCommunicationImageDto } from '../../communication-images/dto/create-communication-image.dto';
import { CreateCommunicationCategoriesDto } from '../../communication-categories/dto/create-communication-categories.dto';
import { BUCKET_IMAGE_COMMUNICATION_UPLOAD } from 'src/common/constants';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
@Injectable()
export class CreateCommunicationTransaction extends BaseTransaction<
  CreateCommunicationDto,
  Communication
> {
  constructor(
    dataSource: DataSource,
    private communicationImagesService: CommunicationImagesService,
    private communicationCategoriesService: CommunicationCategoriesService,
    private readonly cloudinaryService: CloudinaryService,
  ) {
    super(dataSource);
  }
  protected async execute(
    createCommunicationDto: CreateCommunicationDto,
    manager: EntityManager,
  ): Promise<Communication> {
    try {
      const newCommunicationEntity = manager.create(
        Communication,
        createCommunicationDto,
      );
      const newCommunication = await manager.save(newCommunicationEntity);

      if (createCommunicationDto.images) {
        const imagesUploaded = await this.cloudinaryService.uploadImages(
          createCommunicationDto.images,
          {
            BUCKET: BUCKET_IMAGE_COMMUNICATION_UPLOAD,
            id: newCommunication.id,
          },
        );

        // console.log(imagesUploaded);

        const createCommunicationImagesDto: CreateCommunicationImageDto[] =
          imagesUploaded.map((image : any) => {
            return new CreateCommunicationImageDto(
              newCommunication.id,
              image,
            );
          });

        await this.communicationImagesService.createMany(
          createCommunicationImagesDto,
          manager,
        );
      }

      if (createCommunicationDto.categoryId) {
        const createCommunicationCategoriesDto: CreateCommunicationCategoriesDto[] =
          createCommunicationDto.categoryId.map((categoryId) => {
            return new CreateCommunicationCategoriesDto(
              newCommunication.id,
              categoryId,
            );
          });

        await this.communicationCategoriesService.createMany(
          createCommunicationCategoriesDto,
          manager,
        );
      }
      return newCommunication;
    } catch (error) {
      throw new BadRequestException('Create communication failed.');
    }
  }
}
