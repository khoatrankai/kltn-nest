import { Injectable } from '@nestjs/common';
import { CreateCvLayoutDto } from './dto/create-cv-layout.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CvLayout } from './entities/cv-layout.entity';

@Injectable()
export class CvLayoutService {
  constructor(
    @InjectRepository(CvLayout)
    private cvLayoutRepository: Repository<CvLayout>,
  ) { }
  async create(createCvLayoutDto: CreateCvLayoutDto) {
    try {

      await this.cvLayoutRepository.delete({
        accountId: createCvLayoutDto.accountId,
        cvIndex: createCvLayoutDto.cvIndex
      });

      const cvLayouts: CvLayout[] = [];

      createCvLayoutDto.layout.forEach((layout, index) => {
        const cvLayout = new CvLayout();
        cvLayout.accountId = createCvLayoutDto.accountId;
        cvLayout.cvIndex = createCvLayoutDto.cvIndex;
        cvLayout.color = createCvLayoutDto.color[index].toString();
        cvLayout.pad = createCvLayoutDto.pad[index].toString();
        cvLayout.padPart = createCvLayoutDto.padPart[index].toString(); 
        cvLayout.colorTopic = createCvLayoutDto.colorTopic;
        cvLayout.indexTopic = createCvLayoutDto.indexTopic;
        cvLayout.colorText = createCvLayoutDto.colorText[index].toString();
        cvLayout.layout = layout.toString();
        cvLayouts.push(cvLayout);
    });
    

      return await this.cvLayoutRepository.save(cvLayouts);
    } catch (error) {
      throw error;
    }
  }


  async findAll(accountId: string, cvIndex: number) {
    try {
      const layoutData = [] as string[];
      const colorData = [] as string[];
      const padData = [] as string[];
      const padPartData = [] as string[];
      const colorTextData = [] as string[];
      const data = await this.cvLayoutRepository.find({
        where: {
          accountId: accountId,
          cvIndex: cvIndex
        }
      });

      if (data.length === 0) {
        return {
          cvIndex: cvIndex,
          layout: layoutData,
          color: colorData,
          pad: padData,
          padPart: padPartData,
          colorText: colorTextData,
          colorTopic: '',
          indexTopic: 0
        }
      }

      data.forEach((cvLayout) => {
        layoutData.push(cvLayout.layout);
        colorData.push(cvLayout.color);
        padData.push(cvLayout.pad);
        padPartData.push(cvLayout.padPart);
        colorTextData.push(cvLayout.colorText);
      });

      return {
        cvIndex: cvIndex,
        layout: layoutData,
        color: colorData,
        pad: padData,
        padPart: padPartData,
        colorTopic: data[0].colorTopic,
        indexTopic: data[0].indexTopic,
        colorText: colorTextData
      }
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number, accountId: string) {
    try {
      const data = await this.cvLayoutRepository.delete({
        cvIndex: id,
        accountId: accountId
      });

      return data.affected;
    } catch (error) {
      throw error;
    }
  }
}
