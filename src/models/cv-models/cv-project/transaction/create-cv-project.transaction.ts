import { BaseTransaction } from 'src/providers/database/mariadb/transaction';
import { ArrayCreateCvProjectDto } from '../dto/array-create-cv-project.dto';
import { CvProject } from '../entities/cv-project.entity';
import { DataSource, EntityManager } from 'typeorm';
import { MoreCvProjectService } from '../../more-cv-project/more-cv-project.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateCvProjectTransaction extends BaseTransaction<
  ArrayCreateCvProjectDto,
  CvProject
> {
  constructor(
    dataSource: DataSource,
    private readonly moreCvProjectService: MoreCvProjectService,
  ) {
    super(dataSource);
  }
  protected async execute(
    arrayCreateCvProjectDto: ArrayCreateCvProjectDto,
    manager: EntityManager,
  ): Promise<any> {
    try {
      console.log(arrayCreateCvProjectDto.data[0]);
      const res = await manager.find(CvProject, {
        where: {
          accountId: arrayCreateCvProjectDto.accountId,
          cvIndex: arrayCreateCvProjectDto.data[0].cvIndex,
        },
      });

      if (res.length > 0) {
        await manager.delete(CvProject, {
          accountId: arrayCreateCvProjectDto.accountId,
          cvIndex: arrayCreateCvProjectDto.data[0].cvIndex,
        });
      }

      const dataUpload = arrayCreateCvProjectDto.data.map((item: any) => {
        return {
          ...item,
          accountId: arrayCreateCvProjectDto.accountId,
        };
      });

      const cvProject = manager.create(CvProject, dataUpload);

      cvProject.forEach((cvProject) => {
        cvProject.accountId = arrayCreateCvProjectDto.accountId;
        cvProject.type = cvProject.type;
        cvProject.index = cvProject.index ? cvProject.index : 0;
        cvProject.column = cvProject.column ? cvProject.column : 0;
        cvProject.cvIndex = cvProject.cvIndex ? cvProject.cvIndex : 0;
        cvProject.padIndex = cvProject.padIndex ? cvProject.padIndex : 0;
      });

      const dataSave = await manager.save(CvProject, cvProject);

      if (arrayCreateCvProjectDto && arrayCreateCvProjectDto.data.length > 0) {
        arrayCreateCvProjectDto.data &&
          arrayCreateCvProjectDto?.data?.forEach(
            async (item: any, indexArray: number) => {
              item.moreCvProjects.forEach(async (itemMoreCvProject: any) => {
                const dataObject = {
                  ...itemMoreCvProject,
                  cvProjectId: dataSave[indexArray].id,
                };

                await this.moreCvProjectService.create(dataObject);
              });
            },
          );
      }

      return dataSave;
    } catch (error) {
      console.log(error)
      throw new Error('Method not implemented.');
    }
  }
}
