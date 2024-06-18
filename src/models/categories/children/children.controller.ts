import { Controller, Get, Param, Delete, Post, Body, UseGuards, HttpStatus, Put, BadRequestException } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/common/enum';
import { CreateChildDto } from './dto/create-child.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { RoleGuard } from 'src/authentication/role.guard';
import { UpdateChildDto } from './dto/update-child.dto';
@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post('create')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  async create(@Body() createChildDto: CreateChildDto) {

    try {
      await this.childrenService.create(createChildDto);

      return {
        status: HttpStatus.OK,
        message: 'created successfully'
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message)
      }
      throw new BadRequestException('Error creating search')
    }
  
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  findAll() {
    return this.childrenService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  async findOne(@Param('id') id: string) {
    return {
      status: HttpStatus.OK,
      data: await this.childrenService.findOne(+id)
    }
  }

  @Put('update/:id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  async update(@Param('id') id: number,@Body() dto: UpdateChildDto) {    

    await this.childrenService.update(id, dto)

    return {
        statusCode: HttpStatus.OK,
        message: 'update search successfully',
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.childrenService.remove(+id);
  }

  @Get('/by-parent/:id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  async getChildByIdParent(@Param('id') id: string) {
    return {
      status: HttpStatus.OK,
      data: await this.childrenService.getChildByIdParent(+id)
    }
  }
}
