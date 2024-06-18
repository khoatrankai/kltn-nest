import { Controller, Get, Post, Body, Delete, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { CvsPostsService } from './cvs-posts.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateArrayCvsPost } from './dto/array-create-cvs-post.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { DeleteCvsPostDto } from './dto/delete-cvs-post.dto';
import { DeleteCvsPostTypeDto } from './dto/delete-cvs-post-type.dto';
import { AuthNotRequiredGuard } from 'src/authentication/authNotRequired.guard';

@Controller('cvs-posts')
@ApiTags('Cvs Posts AI')
export class CvsPostsController {
  constructor(private readonly cvsPostsService: CvsPostsService) { }

  @Post('')
  async create(@Body() createCvsPostDto: CreateArrayCvsPost) {
    try {

      const data = this.cvsPostsService.create(createCvsPostDto);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Cvs Posts created successfully',
        data
      }
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @ApiQuery({
    name: 'type',
    required: false,
    type: Number,
    description: '0: posts, 1: cvs'
  })
  @ApiQuery({
    name: 'cvIndex',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'postId',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'accountId',
    required: false,
    type: String,
  })
  @UseGuards(AuthNotRequiredGuard)
  @ApiBearerAuth()
  async findAll(@Req() reqUser: CustomRequest, @Req() req: any) {
    try {
      let accountIdResult;
      const { type, cvIndex, postId, accountId } = req.query;
      

      if (+type === 0) {
        accountIdResult = reqUser.user?.id;
      }
      else {
        accountIdResult = accountId;
      }

      const data = await this.cvsPostsService.findAll(accountIdResult as string, +type, cvIndex, postId);

      return {
        statusCode: HttpStatus.OK,
        message: 'Get all cvs posts successfully',
        data
      }
    } catch (error) {
      throw error;
    }
  }

  @Get('cvs')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiQuery({
    name: 'postId',
    required: false,
    type: Number,
  })
  async findAllCvs(@Req() req: CustomRequest, @Req() reqPost: any) {
    try {
      const accountId = req.user?.id;
      const postId = reqPost.query.postId;

      if (!accountId) {
        throw {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized'
        }
      }

      const data = await this.cvsPostsService.findAllCvs(accountId, postId);

      return {
        statusCode: HttpStatus.OK,
        message: 'Get all cvs successfully',
        data
      }
    } catch (error) {
      throw error;
    }
  }

  @Delete('')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async remove(@Body() deleteCvsPostDto: DeleteCvsPostDto, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized'
        }
      }

      deleteCvsPostDto.accountId = accountId;

      const data = await this.cvsPostsService.remove(deleteCvsPostDto);

      return {
        statusCode: HttpStatus.OK,
        message: `Cvs Posts ${data.affected} deleted successfully`,
        data
      }
    } catch (error) {
      throw error;
    }
  }

  @Delete('cvs')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async removeCvs(@Body() deleteCvsPostDto: DeleteCvsPostTypeDto, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized'
        }
      }

      const data = await this.cvsPostsService.removeCvs(deleteCvsPostDto.postId);

      return {
        statusCode: HttpStatus.OK,
        message: `Cvs Posts ${data.affected} deleted successfully`,
        data
      }
    } catch (error) {
      throw error;
    }
  }
}
