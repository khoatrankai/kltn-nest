import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseTransaction } from 'src/providers/database/mariadb/transaction';
import { CreateProfilesCvDto } from '../dto/create-profiles_cv.dto';
import { ProfilesCv } from '../entities/profiles_cv.entity';
import { DataSource, EntityManager } from 'typeorm';
import { BUCKET_CV_UPLOAD } from 'src/common/constants';
import { FileUpload } from 'src/services/aws/awsService.interface';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { UserService } from 'src/models/user-model/users/users.service';

@Injectable()
export class CreateProfileCvsTransaction extends BaseTransaction<
  CreateProfilesCvDto,
  ProfilesCv
> {
  constructor(
    dataSource: DataSource,
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService,
  ) {
    super(dataSource);
  }

  protected async execute(
    createProfilesCvDto: CreateProfilesCvDto,
    manager: EntityManager,
  ): Promise<any> {
    try {
      const user = await this.userService.findRoleById(
        createProfilesCvDto.accountId,
      );

      const checkProfilesCv = await manager.findOne(ProfilesCv, {
        where: {
          accountId: createProfilesCvDto.accountId,
          cvIndex: createProfilesCvDto.cvIndex,
        },
      });

      if (checkProfilesCv) {
        // delete
        await manager.delete(ProfilesCv, {
          accountId: createProfilesCvDto.accountId,
          cvIndex: createProfilesCvDto.cvIndex,
        });
      }

      if (user?.type === 3) {
        throw new BadRequestException('Is not candidate');
      }

      const newProfileCvEntity = manager.create(
        ProfilesCv,
        createProfilesCvDto as any,
      );

      const pdfUpload: FileUpload = {
        buffer: createProfilesCvDto.file.buffer,
        originalname: createProfilesCvDto.path,
      };

      await this.cloudinaryService.uploadFileCV(pdfUpload, {
        BUCKET: BUCKET_CV_UPLOAD,
        accountId: createProfilesCvDto.accountId,
      });

      const imageFileUpload: FileUpload = {
        buffer: Buffer.from(createProfilesCvDto.imageBuffer),
        originalname: createProfilesCvDto.image,
      };

      const name = await this.cloudinaryService.uploadFileCV(imageFileUpload, {
        BUCKET: BUCKET_CV_UPLOAD,
        accountId: createProfilesCvDto.accountId,
      });

      newProfileCvEntity.image = name[0] + '.' + name[0].split('.')[1];

      newProfileCvEntity.path = name[0].split('.')[0] + '.pdf' + '.pdf';

      const newProfileCv = await manager.save(newProfileCvEntity);

      return newProfileCv;
    } catch (error) {
      console.log(error);
    }
  }
}
