import { Controller, Get, Param, Delete, NotFoundException, Body, Post, Put, UseInterceptors, UploadedFiles, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { ParentService } from './parents.service';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/common/enum';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AuthGuard } from 'src/authentication/auth.guard';
import { RoleGuard } from 'src/authentication/role.guard';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Parent Categories')
@Controller('parent')
export class ParentController {
  constructor(private readonly parentService: ParentService) { }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  async findAll() {
    try {
      return {
        status: HttpStatus.OK,
        data: await this.parentService.findAll()
      }
    } catch (error) {
      throw new Error('Error from server')
    }
  }

  @Get('analytics')
  @ApiQuery({
    name: 'year',
    required: false,
    type: 'number',
    description: 'Year',
  })
  @ApiQuery({
    name: 'type',
    required: false,
    type: 'string',
    description: 'Type',
  })
  async analytics(@Req() req: any) {
    try {
      const { year, type } = req.query;

      return {
        statusCode: HttpStatus.OK,
        data: await this.parentService.analytics(type, +year ? +year : new Date().getFullYear()),
        message: 'Success'
      }
    } catch (error) {
      throw error;
    }
  }

  @Post('add')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'defaultPostImage', maxCount: 1 },
    ], {
      storage: memoryStorage(),
    }),
  )
  async create(@UploadedFiles() files: { image: Express.Multer.File[], defaultPostImage: Express.Multer.File[] }, @Body() dto: CreateParentDto) {
    const createParent = await this.parentService.createParent(dto, files);
    if (!createParent) {
      throw new NotFoundException('Parent not found');
    }

    return {
      status: HttpStatus.OK,
      message: 'Success'
    }
  }


  @Get(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  async findOne(@Param('id') id: string) {
    try {
      return {
        status: HttpStatus.OK,
        data: await this.parentService.findOne(+id)
      }
    } catch (error) {
      throw new Error('Error from server')
    }
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  async update(@Param('id') id: string, @Body() updateParentDto: UpdateParentDto): Promise<any> {
    await this.parentService.update(+id, updateParentDto);

    return {
      status: HttpStatus.OK,
      message: 'Update category successfully'
    }

  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parentService.remove(+id);
  }
}
