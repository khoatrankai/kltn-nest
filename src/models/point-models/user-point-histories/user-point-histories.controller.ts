import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserPointHistoriesService } from './user-point-histories.service';
import { CreateUserPointHistoryDto } from './dto/create-user-point-history.dto';

@Controller('user-point-histories')
export class UserPointHistoriesController {
  constructor(private readonly userPointHistoriesService: UserPointHistoriesService) {}

  @Post()
  create(@Body() createUserPointHistoryDto: CreateUserPointHistoryDto) {
    return this.userPointHistoriesService.create(createUserPointHistoryDto);
  }

  @Get()
  findAll() {
    return this.userPointHistoriesService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userPointHistoriesService.findOne(+id);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPointHistoriesService.remove(+id);
  }
}
