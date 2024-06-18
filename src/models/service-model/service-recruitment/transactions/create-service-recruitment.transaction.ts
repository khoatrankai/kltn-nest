import { Injectable } from "@nestjs/common";
import { BaseTransaction } from "src/providers/database/mariadb/transaction";
import { CloudinaryService } from "src/services/cloudinary/cloudinary.service";
import { DataSource, EntityManager } from "typeorm";
import { CreateServiceRecruitmentDto } from "../dto/create-service-recruitment.dto";
import { ServiceRecruitment } from "../entities/service-recruitment.entity";
import { BUCKET_ICON_SERVICE_RECRUITMENT_IMAGES_UPLOAD, BUCKET_ICON_SERVICE_RECRUITMENT_UPLOAD } from "src/common/constants/cloudinary.contrant";
import { ServiceRecruitmentImagesService } from "../../service-recruitment-images/service-recruitment-images.service";

@Injectable()
export class CreateServiceRecruitmentTransaction extends BaseTransaction<
  CreateServiceRecruitmentDto,
  ServiceRecruitment
> {
  constructor(
    dataSource: DataSource,
    private readonly cloudinaryService: CloudinaryService,
    private readonly serviceRecruitmentImagesService: ServiceRecruitmentImagesService,
  ) {
    super(dataSource);
  }

  async execute(createServiceRecruitmentDto: CreateServiceRecruitmentDto, manager: EntityManager): Promise<any> {
    try {
      let imagesUploaded = null;
      let logoUploaded = null;

      const newServiceRecruitmentEntity = manager.create(
        ServiceRecruitment,
        {
          name: createServiceRecruitmentDto.name,
          description: createServiceRecruitmentDto.description,
          logo: '11111111',
          price: createServiceRecruitmentDto.price,
          discount: createServiceRecruitmentDto.discount,
          type: createServiceRecruitmentDto.type,
          expiration: createServiceRecruitmentDto.expiration,
          status: createServiceRecruitmentDto.status,
        } as any,
      );

      const newData = await manager.save(newServiceRecruitmentEntity);


      if (createServiceRecruitmentDto.images && createServiceRecruitmentDto.images.length > 0) {
        imagesUploaded = await this.cloudinaryService.uploadImages(
          createServiceRecruitmentDto.images,
          {
            BUCKET: BUCKET_ICON_SERVICE_RECRUITMENT_IMAGES_UPLOAD,
            id: newServiceRecruitmentEntity.id,
          },
        );

        if (imagesUploaded && imagesUploaded.length > 0) {
          imagesUploaded.map(async (image: any) => {
            await this.serviceRecruitmentImagesService.create({
              serviceRecruitmentId: newServiceRecruitmentEntity.id,
              image,
              status: 1,
            });
          });
        }
      }

      if (createServiceRecruitmentDto.logo) {
        logoUploaded = await this.cloudinaryService.uploadImage(
          createServiceRecruitmentDto.logo,
          {
            BUCKET: BUCKET_ICON_SERVICE_RECRUITMENT_UPLOAD,
            id: newServiceRecruitmentEntity.id,
          },
        );

        await manager.update(
          ServiceRecruitment,
          { id: newServiceRecruitmentEntity.id },
          { icon: logoUploaded },
        );
      }


      return newData;
    } catch (error) {
      throw error;
    }
  }
}