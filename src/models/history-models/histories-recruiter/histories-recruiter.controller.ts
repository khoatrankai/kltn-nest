import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoriesRecruiterService } from './histories-recruiter.service';
import { CreateHistoriesRecruiterDto } from './dto/create-histories-recruiter.dto';
import { UpdateHistoriesRecruiterDto } from './dto/update-histories-recruiter.dto';

@Controller('histories-recruiter')
export class HistoriesRecruiterController {
  constructor(private readonly historiesRecruiterService: HistoriesRecruiterService) {}

  @Post()
  create(@Body() createHistoriesRecruiterDto: CreateHistoriesRecruiterDto) {
    return this.historiesRecruiterService.create(createHistoriesRecruiterDto);
  }

  @Get()
  findAll() {
    return this.historiesRecruiterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historiesRecruiterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoriesRecruiterDto: UpdateHistoriesRecruiterDto) {
    return this.historiesRecruiterService.update(+id, updateHistoriesRecruiterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historiesRecruiterService.remove(+id);
  }
}
