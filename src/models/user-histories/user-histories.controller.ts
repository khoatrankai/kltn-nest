import { Controller, Get, Param, Delete } from '@nestjs/common';
import { UserHistoriesService } from './user-histories.service';
// import { CreateUserHistoryDto } from './dto/create-user-history.dto';
// import { UpdateUserHistoryDto } from './dto/update-user-history.dto';

@Controller('user-histories')
export class UserHistoriesController {
  constructor(private readonly userHistoriesService: UserHistoriesService) {}

  // @Post()
  // create(@Body() createUserHistoryDto: CreateUserHistoryDto) {
  //   return this.userHistoriesService.create(createUserHistoryDto);
  // }

  @Get()
  findAll() {
    return this.userHistoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userHistoriesService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserHistoryDto: UpdateUserHistoryDto) {
  //   return this.userHistoriesService.update(+id, updateUserHistoryDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userHistoriesService.remove(+id);
  }
}
