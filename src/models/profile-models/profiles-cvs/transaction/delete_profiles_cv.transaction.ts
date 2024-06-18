import { DataSource, EntityManager, In } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseTransaction } from 'src/providers/database/mariadb/transaction';
import { ProfilesCv } from '../entities/profiles_cv.entity';
import { DeleteProfilesCvDto } from '../dto/delete-profiles_cv.dto';
import { CvInformation } from 'src/models/cv-models/cv-information/entities/cv-information.entity';
import { MoreCvInformation } from 'src/models/cv-models/more-cv-information/entities/more-cv-information.entity';
import { CvProject } from 'src/models/cv-models/cv-project/entities/cv-project.entity';
import { MoreCvProject } from 'src/models/cv-models/more-cv-project/entities/more-cv-project.entity';
import { CvExtraInformation } from 'src/models/cv-models/cv-extra-information/entities/cv-extra-information.entity';
import { MoreCvExtraInformation } from 'src/models/cv-models/more-cv-extra-information/entities/more-cv-extra-information.entity';
import { CvLayout } from 'src/models/cv-models/cv-layout/entities/cv-layout.entity';

@Injectable()
export class DeleteProfileCvsTransaction extends BaseTransaction<
  DeleteProfilesCvDto,
  ProfilesCv
> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  protected async execute(
    deleteProfilesCvDto: DeleteProfilesCvDto,
    manager: EntityManager,
  ): Promise<any> {
    try {
      const idSet = new Set(deleteProfilesCvDto.ids);

      let cvIndex = 0;

      const getCvIndex = await manager.findOne(ProfilesCv, {
        where: {
          id: In([...idSet]),
        },
      });

      if (getCvIndex) {
        cvIndex = getCvIndex.cvIndex;
      }

      // delete cv information
      const findCvInformation = await manager.findOne(CvInformation, {
        where: {
          cvIndex: cvIndex,
          accountId: deleteProfilesCvDto.accountId,
        },
      })

      console.log('findCvInformation', findCvInformation);

      if (findCvInformation) {
        const findMoreCvInformation = await manager.find(MoreCvInformation, {
          where: {
            cvInformationId: findCvInformation.id,
          }
        })

        if (findMoreCvInformation) {
          await manager.delete(MoreCvInformation, {
            cvInformationId: findCvInformation.id,
          });
        }

        await manager.delete(CvInformation, {
          cvIndex: cvIndex,
          accountId: deleteProfilesCvDto.accountId,
        });
      }
      // delete cv project

      const findCvProject = await manager.findOne(CvProject, {
        where: {
          cvIndex: cvIndex,
          accountId: deleteProfilesCvDto.accountId,
        },
      })

      if (findCvProject) {
        const findMoreCvProject = await manager.find(MoreCvProject, {
          where: {
            cvProjectId: findCvProject.id,
          }
        })

        if (findMoreCvProject) {
          await manager.delete(MoreCvProject, {
            cvProjectId: findCvProject.id,
          });
        }

        await manager.delete(CvProject, {
          cvIndex: cvIndex,
          accountId: deleteProfilesCvDto.accountId,
        });
      }

      // delete cv extra information

      const findCvExtraInformation = await manager.findOne(CvExtraInformation, {
        where: {
          cvIndex: cvIndex,
          accountId: deleteProfilesCvDto.accountId,
        },
      })

      if (findCvExtraInformation) {
        const findMoreCvExtraInformation = await manager.find(MoreCvExtraInformation, {
          where: {
            cvExtraInformationId: findCvExtraInformation.id,
          }
        })
        
        if (findMoreCvExtraInformation) {
          await manager.delete(MoreCvExtraInformation, {
            cvExtraInformationId: findCvExtraInformation.id,
          });
        }

        await manager.delete(CvExtraInformation, {
          cvIndex: cvIndex,
          accountId: deleteProfilesCvDto.accountId,
        });
      }

      // delete cv_layout
      const findCvLayout = await manager.findOne(CvLayout, {
        where: {
          cvIndex: cvIndex,
          accountId: deleteProfilesCvDto.accountId,
        },
      })

      if (findCvLayout) {
        await manager.delete(CvLayout, {
          cvIndex: cvIndex,
          accountId: deleteProfilesCvDto.accountId,
        });
      }

      const dataDelete = await manager.delete(ProfilesCv, {
        id: In([...idSet]),
        accountId: deleteProfilesCvDto.accountId,
      });

      return dataDelete.affected;
    } catch (error) {
      throw new BadRequestException('Error creating profile cv');
    }
  }
}
