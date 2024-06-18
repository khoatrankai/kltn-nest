import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { CommunicationImagesService } from './communication-images.service';
import { CreateCommunicationImageDto } from './dto/create-communication-image.dto';
import { UpdateCommunicationImageDto } from './dto/update-communication-image.dto';

@Controller('communication-images')
export class CommunicationImagesController {
  constructor(private readonly communicationImagesService: CommunicationImagesService) {}

  @Post()
  create(@Body() createCommunicationImageDto: CreateCommunicationImageDto[]) {
    return this.communicationImagesService.createMany(createCommunicationImageDto);
  }

  @Get()
  findAll() {
    return this.communicationImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communicationImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommunicationImageDto: UpdateCommunicationImageDto) {
    return this.communicationImagesService.update(+id, updateCommunicationImageDto);
  }

}
