import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfilesCategoriesService } from './profiles-categories.service';
import { CreateProfilesCategoryDto } from './dto/create-profiles-category.dto';
import { UpdateProfilesCategoryDto } from './dto/update-profiles-category.dto';

@Controller('profiles-categories')
export class ProfilesCategoriesController {
  constructor(
    private readonly profilesCategoriesService: ProfilesCategoriesService,
  ) {}

  @Post()
  create(@Body() createProfilesCategoryDto: CreateProfilesCategoryDto) {
    return this.profilesCategoriesService.create(createProfilesCategoryDto);
  }

  @Get()
  findAll() {
    return this.profilesCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProfilesCategoryDto: UpdateProfilesCategoryDto,
  ) {
    return this.profilesCategoriesService.update(
      +id,
      updateProfilesCategoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilesCategoriesService.remove(+id);
  }
}
