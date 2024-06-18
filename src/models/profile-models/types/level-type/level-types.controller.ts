import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { LevelTypeService } from './level-types.service';
import { CreateLevelTypeDto } from './dto/create-level-type.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { LevelTypesInterceptor } from './interceptor/level-types.interceptror';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('level-types')
@ApiTags('Level Types')
export class LevelTypeController {
  constructor(
    private readonly levelTypeService: LevelTypeService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async create(@Body() createLevelTypeDto: CreateLevelTypeDto) {
    try {
      return {
        statusCode: HttpStatus.CREATED,
        data: await this.levelTypeService.create(
          createLevelTypeDto,
        ),
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error creating level type',
      };
    }
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor, LevelTypesInterceptor)
  async findAll() {
    try {
      return await this.levelTypeService.findAll()
      
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error geting level types',
      };
    }
  }
}
