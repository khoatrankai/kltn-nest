import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseTransaction } from "src/providers/database/mariadb/transaction";
import { UpdateServiceRecruitmentDto } from "../dto/update-service-recruitment.dto";
import { ServiceRecruitment } from "../entities/service-recruitment.entity";
import { DataSource, EntityManager } from "typeorm";
import { CloudinaryService } from "src/services/cloudinary/cloudinary.service";
import { BUCKET_ICON_SERVICE_RECRUITMENT_IMAGES_UPLOAD, BUCKET_ICON_SERVICE_RECRUITMENT_UPLOAD } from "src/common/constants/cloudinary.contrant";
import { ServiceRecruitmentImagesService } from "../../service-recruitment-images/service-recruitment-images.service";

@Injectable()
export class UpdateServiceRecruitmentTransaction extends BaseTransaction<UpdateServiceRecruitmentDto, ServiceRecruitment> {
    constructor(
        dataSource: DataSource,
        private readonly cloudinaryService: CloudinaryService,
        private readonly serviceRecruitmentImagesService: ServiceRecruitmentImagesService,
    ) {
        super(dataSource);
    }
    async execute(updateServiceRecruitmentDto: UpdateServiceRecruitmentDto, manager: EntityManager): Promise<any> {
        try {

            const serviceRecruitment = await manager.findOne(ServiceRecruitment, {
                where: {
                    id: updateServiceRecruitmentDto.id,
                }
            });

            if (!serviceRecruitment) {
                throw new BadRequestException('Service recruitment not found');
            }

            if (updateServiceRecruitmentDto.logo) {
                updateServiceRecruitmentDto.icon = '';

                const logoUploaded = await this.cloudinaryService.uploadImage(
                    updateServiceRecruitmentDto.logo,
                    {
                        BUCKET: BUCKET_ICON_SERVICE_RECRUITMENT_UPLOAD,
                        id: serviceRecruitment.id,
                    },
                );

                updateServiceRecruitmentDto.icon = logoUploaded;
            }

            if (updateServiceRecruitmentDto.images && updateServiceRecruitmentDto.images.length > 0) {
                const imagesUploaded = await this.cloudinaryService.uploadImages(
                    updateServiceRecruitmentDto.images,
                    {
                        BUCKET: BUCKET_ICON_SERVICE_RECRUITMENT_IMAGES_UPLOAD,
                        id: updateServiceRecruitmentDto.id,
                    },
                );

                imagesUploaded.map(async (image: any) => {
                    await this.serviceRecruitmentImagesService.create({
                        serviceRecruitmentId: serviceRecruitment.id,
                        image,
                        status: 1,
                    });
                });
            }

            if (updateServiceRecruitmentDto.deleteImages && updateServiceRecruitmentDto.deleteImages.length > 0) {
                await this.serviceRecruitmentImagesService.remove(updateServiceRecruitmentDto.deleteImages as any);
            }

            delete updateServiceRecruitmentDto.images;
            delete updateServiceRecruitmentDto.logo;
            delete updateServiceRecruitmentDto.deleteImages;

            await manager.update(ServiceRecruitment, { id: updateServiceRecruitmentDto.id }, updateServiceRecruitmentDto);

        } catch (error) {
            throw error;
        }
    }
}