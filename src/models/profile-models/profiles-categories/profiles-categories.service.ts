import { Injectable } from '@nestjs/common';
import { CreateProfilesCategoryDto } from './dto/create-profiles-category.dto';
import { UpdateProfilesCategoryDto } from './dto/update-profiles-category.dto';

@Injectable()
export class ProfilesCategoriesService {
  create(_createProfilesCategoryDto: CreateProfilesCategoryDto) {
    return 'This action adds a new profilesCategory';
  }

  findAll() {
    return `This action returns all profilesCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profilesCategory`;
  }

  update(id: number, _updateProfilesCategoryDto: UpdateProfilesCategoryDto) {
    return `This action updates a #${id} profilesCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} profilesCategory`;
  }
}
