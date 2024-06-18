import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfilesSkillDto } from './dto/create-profiles-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProfilesSkill } from './entities/profiles-skill.entity';
import { LevelTypeService } from '../types/level-type/level-types.service';
import { DeleteProfilesSkillDto } from './dto/delete-profile-skill.dto';
import { UpdateProfilesSkillDto } from './dto/update-profiles-skill.dto';

@Injectable()
export class ProfilesSkillsService {
  constructor(
    @InjectRepository(ProfilesSkill)
    private readonly profilesSkillRepository: Repository<ProfilesSkill>,
    private readonly levelTypeService: LevelTypeService,
  ) {}
  async create(createProfilesSkillDto: CreateProfilesSkillDto) {
    try {
      const dataSkillRole = await this.levelTypeService.findOne(
        createProfilesSkillDto.skillLevelId,
      );

      if (!dataSkillRole) {
        throw new BadRequestException('Level type not found');
      }

      const dataProfileSkill = await this.profilesSkillRepository.findOne({
        where: {
          skillLevelId: createProfilesSkillDto.skillLevelId,
          accountId: createProfilesSkillDto.accountId,
          skillName: createProfilesSkillDto.skillName,
        },
      });

      if (dataProfileSkill) {
        throw new BadRequestException('Skill Role already exists');
      }

      const profilesSkillEntity = this.profilesSkillRepository.create(
        createProfilesSkillDto,
      );

      return await this.profilesSkillRepository.save(profilesSkillEntity);
    } catch (error) {
      throw error;
    }
  }

  async removeAll(data: DeleteProfilesSkillDto) {
    try {
      const idSet = new Set(data.ids);

      const result = await this.profilesSkillRepository.delete({
        id: In([...idSet]),
        accountId: data.accountId,
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(dto: UpdateProfilesSkillDto) {
    try {

      const dataProfileSkill = await this.profilesSkillRepository.findOne({
        where: {
          skillLevelId: dto.skillLevelId,
          accountId: dto.accountId,
          skillName: dto.skillName,
        },
      });

      if (dataProfileSkill) {
        throw new BadRequestException('Skill Role already exists');
      }

      await this.profilesSkillRepository.update(
        { id: dto.id, accountId: dto.accountId },
        dto,
      );
    } catch (error) {
      throw error;
    }
  }
}
