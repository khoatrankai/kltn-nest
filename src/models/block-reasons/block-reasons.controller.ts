import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, BadRequestException, HttpStatus, Put, Query } from '@nestjs/common';
import { BlockReasonsService } from './block-reasons.service';
import { CreateBlockReasonDto } from './dto/create-block-reason.dto';
import { UpdateBlockReasonDto } from './dto/update-block-reason.dto';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/common/enum';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Block Reasons')
@Controller('block-reasons')
export class BlockReasonsController {
  constructor(private readonly blockReasonsService: BlockReasonsService) { }

  @Post()
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  async create(@Body() createBlockReasonDto: CreateBlockReasonDto, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      return {
        statusCode: HttpStatus.CREATED,
        data: await this.blockReasonsService.createService(createBlockReasonDto),
      }
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @ApiQuery({ name: 'type', required: false, type: Number, description: 'Type of block reason' })
  async findAll(
    @Query('type') type: number
  ) {
    try {
      return {
        statusCode: HttpStatus.OK,
        data: await this.blockReasonsService.findAll(type),
      }
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  async update(@Param('id') id: string, @Body() updateBlockReasonDto: UpdateBlockReasonDto, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      await this.blockReasonsService.update(+id, updateBlockReasonDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Updated successfully',
      }
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }
      await this.blockReasonsService.remove(+id);

      return {
        statusCode: HttpStatus.OK,
        message: 'Deleted successfully',
      }
    } catch (error) {
      throw error;
    }
  }
}
