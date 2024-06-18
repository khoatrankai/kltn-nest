import { ImageValidator } from './../../../common/decorators/validation/image-validator/image.validator';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
// import { HotTopicQueriesDto } from './dto/hot-topic-queries.dto';
import { PostNormallyInterceptor } from './interceptors/posts-topic.interceptor';
import { AuthGuard } from 'src/authentication/auth.guard';
import { AuthNotRequiredGuard } from 'src/authentication/authNotRequired.guard';
import { RoleGuard } from 'src/authentication/role.guard';
import { Role } from 'src/common/enum';
import { Roles } from 'src/authentication/roles.decorator';
import { CreatePostByAdminDto } from './dto/admin-create-post.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PostImagesPipe } from 'src/common/helper/transform/post-image.transform';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { CreatePostByAdminController } from './controller';
import { PostDetailInterceptor } from './interceptors/posts-detail.interceptor';
import { PostNotificationsService } from 'src/models/notifications-model/post-notifications/post-notifications.service';
import { NewestPostQueriesDto } from './dto/newest-queries.dto';
import { PostNewInterceptor } from './interceptors/posts-new.interceptor';
import { PostsCompaniesInterceptor } from './interceptors/posts-company.interceptor';
import { WardsService } from 'src/models/locations/wards/wards.service';
// import { CreatePostByUserDto } from './dto/user-create-post.dto';
// import { CreatePostController } from './controller/create-post.controller';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly wardsService: WardsService,
    private readonly postsService: PostsService,
    private readonly postNotification: PostNotificationsService,
  ) { }

  @UseGuards(AuthGuard)
  @Get('account/:accountId')
  async findByAccountId(@Param('accountId') accountId: string) {
    return this.postsService.findByAccountId(accountId);
  }


  @Get('total-post')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getTotalPost(@Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account id is required');
      }

      return {
        statusCode: HttpStatus.OK,
        data: await this.postsService.findAccountPostOfMonths(accountId),
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('search/keyword')
  @ApiQuery({ name: 'keyword', required: true })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  async getPostByKeyword(@Query('keyword') keyword: string, @Query('limit') limit: number, @Query('page') page: number) {
    try {
      const posts = await this.postsService.getPostByKeyword(keyword, limit ? limit : 5, page ? page : 0);

      return {
        statusCode: HttpStatus.OK,
        data: posts,
      }
    } catch (error) {
      throw error;
    }
  }

  @ApiQuery({ name: 'threshold', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get('newest')
  @UseGuards(AuthNotRequiredGuard)
  @UseInterceptors(PostNewInterceptor)
  async getNewestPosts(
    @Query() queries: NewestPostQueriesDto,
    @Req() req: any,
  ) {
    const { limit, page } = req;
    const { threshold } = queries;
    return this.postsService.getNewestPosts(limit ? limit : 10, page ? page : 0, queries, threshold);
  }

  @Get('hot')
  @UseGuards(AuthNotRequiredGuard)
  @UseInterceptors(PostNewInterceptor)
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiBearerAuth()
  async getHotPosts(@Req() req: any) {
    try {
      const { limit, page } = req.query;

      return await this.postsService.getHotPostsService(limit ? limit : 10, page ? page : 1);
    } catch (error) {
      throw error;
    }
  }


  @ApiBearerAuth()
  @ApiQuery({ name: 'provinceId', required: false })
  @Get('topic/:id')
  @UseGuards(AuthNotRequiredGuard)
  @UseInterceptors(PostNormallyInterceptor)
  async findByTopicId(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Query('provinceId') provinceId?: string,
  ) {
    const { limit, page } = req;
    return this.postsService.findByHotTopicId(id, limit, page, provinceId);
  }

  @UseGuards(AuthNotRequiredGuard)
  @UseInterceptors(ClassSerializerInterceptor, PostDetailInterceptor)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    Logger.log('findOne');
    return this.postsService.findOne(id);
  }

  /**
   *
   * @param images
   * @param dto
   * @param req
   * @param res
   * @returns Post
   *
   * @description
   * 1. Create post
   * 2. Upload images to AWS S3
   * 3. Create post images
   * 4. Create post resource
   * 5. Create post categories
   *
   */
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @Post('by-worker')
  @Roles(Role.WORKER, Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      fileFilter: (_req, _file, cb) => {
        if (!_file.originalname.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async createByWorker(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 1024 * 1024 * 5 })
        .addValidator(
          new ImageValidator({ mime: /\/(jpg|jpeg|png|gif|bmp|webp)$/ }),
        )
        .build({
          fileIsRequired: false,
          exceptionFactory: (errors) => {
            return new Error(errors);
          },
        }),
      PostImagesPipe,
    )
    images: Express.Multer.File[],
    @Body() dto: CreatePostByAdminDto,
    @Req() req: CustomRequest,
    @Res() res: Response,
  ) {
    return new CreatePostByAdminController(
      this.postsService,
      req,
      res,
      this.postNotification,
      this.wardsService,
    ).createPostByAdminController({ dto, images });
  }

  /**
   *
   * @param images
   * @param dto
   * @param req
   * @param res
   * @returns Post
   *
   * @description
   * 1. Create post
   * 2. Upload images to AWS S3
   * 3. Create post images
   * 4. Create post resource
   * 5. Create post categories
   *
   */
  // @ApiConsumes('multipart/form-data')
  // @ApiBearerAuth()
  // @Post('')
  // @UseGuards(AuthGuard)
  // @UseInterceptors(FilesInterceptor('images', 5, {
  //     fileFilter: (_req, _file, cb) => {
  //         if (!_file.originalname.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/)) {
  //             return cb(new Error('Only image files are allowed!'), false);
  //         }
  //         cb(null, true);
  //     }
  // }))
  // async create(
  //     @UploadedFiles(
  //         new ParseFilePipeBuilder()
  //             .addMaxSizeValidator({ maxSize: 1024 * 1024 * 5 })
  //             .addValidator(new ImageValidator({ mime: /\/(jpg|jpeg|png|gif|bmp|webp)$/ }))
  //             .build({
  //                 fileIsRequired: false,
  //                 exceptionFactory: (errors) => {
  //                     return new Error(errors);
  //                 }
  //             }),
  //         PostImagesPipe,
  //     )
  //     images: Express.Multer.File[],
  //     @Body() dto: CreatePostByUserDto,
  //     @Req() req: CustomRequest,
  //     @Res() res: Response,
  // ) {
  //     return new CreatePostController(this.postsService, req, res, this.postNotification)
  //     .createPostController({dto, images});
  // }

  @ApiBearerAuth()
  @Get('/company/:companyId')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor, PostsCompaniesInterceptor)
  async getPostForCompany(
    @Param('companyId') companyId: string,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;

      const { page, limit } = req.query;

      if (!accountId) {
        throw new BadRequestException('Account id is required');
      }
      return await this.postsService.getPostForCompanyService(+companyId, limit ? +limit : 10, page ? +page : 0);


    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @Get('/post/gps')
  @UseGuards(AuthNotRequiredGuard)
  @UseInterceptors(PostNewInterceptor)
  @ApiQuery({ name: 'latitude', required: true })
  @ApiQuery({ name: 'longitude', required: true })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'minRadius', required: false, description: 'min radius in km' })
  @ApiQuery({ name: 'maxRadius', required: false, description: 'max radius in km' })
  async getPostByGps(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('limit') limit = 10,
    @Query('page') page = 1,
    @Query('minRadius') minRadius = 0,
    @Query('maxRadius') maxRadius = 100,
  ) {
    try {
    
      const minRadiusNum = minRadius ? +minRadius : 0;
      const maxRadiusNum = maxRadius ? +maxRadius : 0;

      if (minRadiusNum > maxRadiusNum) {
        throw new Error('minRadius should not be greater than maxRadius');
      }

      return await this.postsService.getPostByGpsService(limit ? +limit : 10, page ? +page : 0, latitude ? +latitude : 0, longitude ? +longitude : 0, minRadiusNum, maxRadiusNum);
    } catch (error) {
      throw error;
    }
  }
}

