import { Controller, Get, Post, Body, Param, BadRequestException, HttpStatus, Put, ClassSerializerInterceptor, UseInterceptors, UseGuards, Req } from '@nestjs/common';
import { AcademicTypesService } from './academic_types.service';
import { CreateAcademicTypeDto } from './dto/create-academic_type.dto';
import { UpdateAcademicTypeDto } from './dto/update-academic_type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AcademicTypesInterceptor } from './interceptor/academic_type.interceptor';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/common/enum';
import { RoleGuard } from 'src/authentication/role.guard';

@Controller('academic-types')
@ApiTags('Academic Types')
export class AcademicTypesController {
  constructor(private readonly academicTypesService: AcademicTypesService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  async create(@Body() createAcademicTypeDto: CreateAcademicTypeDto, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id

      if (!accountId) {
        throw new BadRequestException('User not found')
      }
      
      return {
        statusCode: HttpStatus.CREATED,
        data: await this.academicTypesService.create(createAcademicTypeDto),
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error creating academic type');
    }
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor, AcademicTypesInterceptor)
  async findAll() {
    try {
      
      return {
        statusCode: HttpStatus.OK,
        data: await this.academicTypesService.findAll(),
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error getting academic types');
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() updateAcademicTypeDto: UpdateAcademicTypeDto, @Req() req: CustomRequest) {
    try {

      const accountId = req.user?.id

      if (!accountId) {
        throw new BadRequestException('User not found')
      }
      
      updateAcademicTypeDto.id = +id;

      await this.academicTypesService.update(updateAcademicTypeDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Academic type updated successfully'
      }

    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error updating academic type');
    }
  }
}
