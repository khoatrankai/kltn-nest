import { Controller, Get, Post, Body, HttpStatus, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { LanguageTypesService } from './language-types.service';
import { CreateLanguageTypeDto } from './dto/create-language-type.dto';
import { LanguageTypesInterceptor } from './interceptor/language-types.interceptor';
import { AuthGuard } from 'src/authentication/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('language-types')
@ApiTags('Language types')
export class LanguageTypesController {
  constructor(private readonly languageTypesService: LanguageTypesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async create(@Body() createLanguageTypeDto: CreateLanguageTypeDto) {
    try {
      return {
        statusCode: HttpStatus.CREATED,
        data: await this.languageTypesService.create(createLanguageTypeDto),
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error creating language type',
      }
    }
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor, LanguageTypesInterceptor)
  async findAll() {
    try {
      return await this.languageTypesService.findAll()
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error geting language types',
      }
    }
  }
}
