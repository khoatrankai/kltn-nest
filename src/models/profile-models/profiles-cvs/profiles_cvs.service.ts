import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfilesCvDto } from './dto/create-profiles_cv.dto';
import { UpdateProfilesCvDto } from './dto/update-profiles_cv.dto';
import { CreateProfileCvsTransaction } from './transaction/profiles_cv.transaction';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { ProfilesCv } from './entities/profiles_cv.entity';
import { DeleteProfilesCvDto } from './dto/delete-profiles_cv.dto';
import { DeleteProfileCvsTransaction } from './transaction/delete_profiles_cv.transaction';
import { UpdateProfileCvsTemplate } from './dto/update-profiles_cv-templafte';

@Injectable()
export class ProfilesCvsService {
  constructor(
    @InjectRepository(ProfilesCv)
    private readonly profilesCvRepository: Repository<ProfilesCv>,
    private readonly createProfileCvsTransaction: CreateProfileCvsTransaction,
    private readonly deleteProfileCvsTransaction: DeleteProfileCvsTransaction,
  ) { }
  async create(createProfilesCvDto: CreateProfilesCvDto) {
    try {
      return await this.createProfileCvsTransaction.run(createProfilesCvDto);
    } catch (error) {
      throw error;
    }
  }

  async updateTemplate(updateProfileCvsTemplate: UpdateProfileCvsTemplate) {
    try {
      const data = await this.profilesCvRepository.update(
        {
          cvIndex: updateProfileCvsTemplate.cvIndex,
          accountId: updateProfileCvsTemplate.accountId,
        },
        {
          templateId: updateProfileCvsTemplate.templateId as any
        }
      );

      return data.affected;

    } catch (error) {
      throw error;
    }
  }

  async hideAll(accountId: string) {
    try {
      const data = await this.profilesCvRepository.update(
        {
          accountId,
        },
        {
          status: 0
        }
      );

      return data.affected;
    } catch (error) {
      throw error;
    }
  }

  async update(updateProfilesCvDto: UpdateProfilesCvDto) {
    try {
      const data = await this.profilesCvRepository.findOne({
        where: {
          id: updateProfilesCvDto.id,
        },
      });

      if (!data) {
        throw new BadRequestException('Not found');
      }

      if (data.status === 0) {
        await this.profilesCvRepository.update(
          {
            accountId: updateProfilesCvDto.accountId,
            id: updateProfilesCvDto.id,
          },
          {
            status: 1,
          },
        );

        return 2;
      }

      else {
        await this.profilesCvRepository.update(
          {
            accountId: updateProfilesCvDto.accountId,
            id: updateProfilesCvDto.id,
          },
          {
            status: 0,
          },
        );

        return 1;
      }

    } catch (error) {
      throw error;
    }
  }

  async delete(dto: DeleteProfilesCvDto) {
    try {
      const data = await this.deleteProfileCvsTransaction.run(dto);

      return data;
    } catch (error) {
      throw error;
    }
  }


  async updateStatusNew(accountId: string, cvId: number) {
    try {

      await this.profilesCvRepository.update(
        {
          accountId,
        },
        {
          isNew: 0,
        },
      );

      await this.profilesCvRepository.update(
        {
          id: cvId,
          accountId,
        },
        {
          isNew: 1,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  async updateStatusPublic(accountId: string, ids: number[]) {
    try {
      // Update all profiles of the account to set isPublic to 0
      await this.profilesCvRepository.update(
        {
          accountId,
          id: Not(In(ids)),
        },
        {
          isPublic: 0,
        },
      );

      await this.profilesCvRepository.update(
        {
          accountId,
          id: In(ids),
        },
        {
          isPublic: 1,
        },
      );
    } catch (error) {
      throw error;
    }
  }

}
