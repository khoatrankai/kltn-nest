import { BaseTransaction } from 'src/providers/database/mariadb/transaction';
import { ArrayCreateCvExtraInformationDto } from '../dto/array-create-extra-information';
import { CvExtraInformation } from '../entities/cv-extra-information.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { MoreCvExtraInformationService } from '../../more-cv-extra-information/more-cv-extra-information.service';

@Injectable()
export class CreateCvExtraInformationTransaction extends BaseTransaction<
  ArrayCreateCvExtraInformationDto,
  CvExtraInformation
> {
  constructor(
    dataSource: DataSource,
    private readonly moreCvExtraInformationService: MoreCvExtraInformationService,
  ) {
    super(dataSource);
  }
  protected async execute(
    arrayCreateCvExtraInformationDto: ArrayCreateCvExtraInformationDto,
    manager: EntityManager,
  ): Promise<any> {
    try {

      console.log('aray', arrayCreateCvExtraInformationDto)

      const res = await manager.find(CvExtraInformation, {
        where: {
          accountId: arrayCreateCvExtraInformationDto.accountId,
          cvIndex: arrayCreateCvExtraInformationDto.data[0].cvIndex,
        },
      });

      if (res.length > 0) {
        await manager.delete(CvExtraInformation, {
          accountId: arrayCreateCvExtraInformationDto.accountId,
          cvIndex: arrayCreateCvExtraInformationDto.data[0].cvIndex,
        });
      }

      const dataUpload = arrayCreateCvExtraInformationDto.data.map(
        (item: any) => {
          return {
            ...item,
            accountId: arrayCreateCvExtraInformationDto.accountId,
          };
        },
      );

      console.log('dataUpload', dataUpload)

      const cvProject = manager.create(CvExtraInformation, dataUpload);

      console.log('cvProject', cvProject)

      cvProject.forEach((cvProject) => {
        cvProject.accountId = arrayCreateCvExtraInformationDto.accountId;
        cvProject.type = cvProject.type ? cvProject.type : 'type1';
        cvProject.index = cvProject.index ? cvProject.index : 0;
        cvProject.column = cvProject.column ? cvProject.column : 0;
        cvProject.cvIndex = cvProject.cvIndex ? cvProject.cvIndex : 0;
        cvProject.padIndex = cvProject.padIndex ? cvProject.padIndex : 0;
      });

      const dataSave = await manager.save(CvExtraInformation, cvProject);

      console.log(dataSave)

      if (arrayCreateCvExtraInformationDto.data && arrayCreateCvExtraInformationDto.data.length > 0) {
        arrayCreateCvExtraInformationDto.data.forEach(async (item: any, indexArray: number) => {
          if (Array.isArray(item.moreCvExtraInformations)) {
            item.moreCvExtraInformations.forEach(async (itemMoreCvExtraInformation: any) => {
              const dataObject = {
                ...itemMoreCvExtraInformation,
                cvExtraInformationId: dataSave[indexArray].id,
              };

              await this.moreCvExtraInformationService.create(dataObject);
            });
          }
        });
      }

      return dataSave;
    } catch (error) {
      throw error;
    }
  }
}
