import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Req,
  Res,
  HttpStatus,
  ClassSerializerInterceptor,
  ParseIntPipe,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import {
  BUCKET_IMAGE_COMPANIES_LOGO_UPLOAD,
  BUCKET_IMAGE_COMPANIES_UPLOAD,
} from 'src/common/constants';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { CompanyImagesPipe } from './interceptors/image.interceptor';
import { CreateCompanyImageDto } from '../company-images/dto/create-company-image.dto';
import { UpdateCompanyImageDto } from '../company-images/dto/delete-comapny-image.dto';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { BUCKET_IMAGE_COMANIES_LOGO_UPLOAD } from 'src/common/constants/cloudinary.contrant';
import { AllCompanyInterceptor } from './interceptors/all-company.interceptor';
import { DetailCompanyInterceptor } from './interceptors/detail-company.interceptor';
import { AuthNotRequiredGuard } from 'src/authentication/authNotRequired.guard';
import { AllPostCompanyInterceptor } from './interceptors/all-post.interceptor';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'logo', maxCount: 1 },
        { name: 'images', maxCount: 5 },
      ],
      {
        limits: {
          fileSize: 1024 * 1024 * 6,
        },
      },
    ),
  )
  async create(
    @UploadedFiles(CompanyImagesPipe)
    listImages: any | undefined,
    @Req() req: CustomRequest,
    @Res() res: any,
    @Body() createCompanyDto: CreateCompanyDto,
  ) {
    try {
      // console.log(listImages);
      const { logo, images } = listImages;
      if (req.user?.id === undefined) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized',
        });
      }

      createCompanyDto.accountId = req.user.id;
      createCompanyDto.logo = logo.originalname;
      createCompanyDto.images = images
        ? images.map((image: any) => image.originalname)
        : [];
      const company = await this.companiesService.create(createCompanyDto);
      const uploadedObject = await this.cloudinaryService.uploadImage(logo, {
        BUCKET: BUCKET_IMAGE_COMPANIES_LOGO_UPLOAD,
        id: String(company.id),
      });
      createCompanyDto.logo = uploadedObject;

      await this.companiesService.updateLogo(company.id, uploadedObject);

      if (images) {
        const uploadedImages = await this.cloudinaryService.uploadImages(
          images,
          {
            BUCKET: BUCKET_IMAGE_COMPANIES_UPLOAD,
            id: String(company.id),
          },
        );

        const companyImagesDto: CreateCompanyImageDto[] = uploadedImages.map(
          (image: any) => ({
            companyId: company.id,
            image: image,
          }),
        );
        await this.companiesService.createCompanyImage(companyImagesDto);
      }

      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'Company created successfully',
        data: {
          ...company,
          logo: uploadedObject.Location,
          images: images ? images.map((image: any) => image.originalname) : [],
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message,
        });
      }
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Something went wrong',
      });
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('account')
  findByAccountId(@Req() req: CustomRequest) {
    if (!req.user) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      };
    }
    return this.companiesService.findByAccountId(req.user?.id);
  }

  @Get('/all-post/:id')
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
  })
  @UseInterceptors(ClassSerializerInterceptor,AllPostCompanyInterceptor)
  @UseGuards(AuthNotRequiredGuard)
  @ApiBearerAuth()
  async findAllPost(@Param('id') id: string, @Req() reqUser: CustomRequest) {
    try {
      const accountId = reqUser.user?.id;

      return await this.companiesService.findAllPostService(+id, accountId)

    } catch (error) {
      throw error
    }
  }


  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    ClassSerializerInterceptor,
    FileFieldsInterceptor(
      [
        { name: 'logo', maxCount: 1 },
        { name: 'images', maxCount: 5 },
      ],
      {
        limits: {
          fileSize: 1024 * 1024 * 6,
        },
      },
    ),
  )
  async update(
    @UploadedFiles(CompanyImagesPipe)
    imagesList: any | undefined,
    @Req() req: CustomRequest,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      if (!updateCompanyDto.validate()) {
        return {
          // Not thing to update
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Nothing to update',
        };
      }

      // updateCompanyDto.accountId = req.user?.id;

      const { logo, images } = imagesList;

      if (logo && logo.originalname) {
        const originalnameCloud = await this.cloudinaryService.uploadImage(
          logo,
          {
            BUCKET: BUCKET_IMAGE_COMPANIES_LOGO_UPLOAD,
            id: String(id),
          },
        );

        updateCompanyDto['logo'] = originalnameCloud;
      }

      if (images && images.length > 0) {
        if (images.length > 5) {
          return {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Maximum 5 images',
          };
        }

        const uploadedImages = await this.cloudinaryService.uploadImages(
          images,
          {
            BUCKET: BUCKET_IMAGE_COMPANIES_UPLOAD,
            id: String(id),
          },
        );

        const companyImagesDto: CreateCompanyImageDto[] = uploadedImages.map(
          (image: any) => ({
            companyId: id,
            image,
          }),
        );

        await this.companiesService.createCompanyImage(companyImagesDto);
      }

      if (updateCompanyDto.deleteImages) {
        await this.companiesService.removeCompanyImages(
          Array.isArray(updateCompanyDto.deleteImages)
            ? updateCompanyDto.deleteImages
            : [updateCompanyDto.deleteImages],
          id,
        );
      }

      delete updateCompanyDto.deleteImages;
      delete updateCompanyDto.images;

      await this.companiesService.update(+req.params['id'], updateCompanyDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Company updated successfully',
        data: null,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Something went wrong',
      };
    }
  }

  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @Patch(':id/images')
  @UseGuards(AuthGuard)
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
  async updateImages(
    @UploadedFiles(CompanyImagesPipe)
    imagesList: any | undefined,
    @Req() req: CustomRequest,
    @Body() updateCompanyImage: UpdateCompanyImageDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const { images } = imagesList;
    if (!req.user) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      };
    }
    try {
      const company = await this.companiesService.findOne(id, req.user.id);

      if (!company) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Company not found',
        };
      }

      let deletedImages: any[] = [];
      if (updateCompanyImage && updateCompanyImage?.imagesId?.length > 0) {
        deletedImages = await this.companiesService.removeCompanyImages(
          updateCompanyImage.imagesId,
          id,
        );
      }

      if (images && images.length > 0) {
        if (updateCompanyImage && updateCompanyImage?.imagesId?.length > 0) {
          if (
            images.length +
            company.companyImages.length -
            deletedImages.length >
            5
          ) {
            return {
              statusCode: HttpStatus.BAD_REQUEST,
              message: 'Maximum 5 images',
            };
          }
        } else if (images.length + company.companyImages.length > 5) {
          return {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Maximum 5 images',
          };
        }

        const uploadedImages = await this.cloudinaryService.uploadImages(
          images,
          {
            BUCKET: BUCKET_IMAGE_COMANIES_LOGO_UPLOAD,
            id: id,
          },
        );

        const companyImagesDto: CreateCompanyImageDto[] = uploadedImages.map(
          (image: any) => ({
            companyId: id,
            image: image,
          }),
        );
        await this.companiesService.createCompanyImage(companyImagesDto);
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Company images updated successfully',
        data: null,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Something went wrong',
      };
    }
  }

  @Put(':id/active')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async updateStatus(
    @Param('id') id: string,
    @Req() req: CustomRequest,
    @Body() body: any,
  ) {
    if (!req.user?.id) {
      throw new BadRequestException('Unauthorized');
    }
    const updated = await this.companiesService.updateStatusActiveService(
      +id,
      body.status,
    );

    if (!updated) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Company not found',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Company status updated successfully',
    };
  }

  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: CustomRequest) {
    if (!req.user) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      };
    }
    const deleted = await this.companiesService.remove(+id, req.user?.id);

    if (deleted.affected === 0) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Company not found',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Company deleted successfully',
    };
  }


  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
  })
  @Get()
  @UseInterceptors(ClassSerializerInterceptor, AllCompanyInterceptor)
  async getCompany(@Req() req: any) {
    try {
      const { page, limit } = req.query;

      return await this.companiesService.getCompany(page ? page : 0, limit ? limit : 10);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Get company error');
    }
  }

  @Get('search')
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
  })
  @ApiQuery({
    type: 'Array',
    name: 'addresses',
    required: false,
  })
  @ApiQuery({
    type: 'Array',
    name: 'categories',
    required: false,
  })
  @ApiQuery({
    type: Number,
    name: 'companySizeId',
    required: false,
  })
  @UseInterceptors(ClassSerializerInterceptor, AllCompanyInterceptor)
  async searchCompany(@Req() req: any) {
    try {
      const { limit, page, addresses, categories, companySizeId } = req.query;

      return await this.companiesService.searchCompanyService(
        addresses,
        page ? page : 0,
        limit ? limit : 10,
        categories,
        companySizeId,
      );
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Search company error');
    }
  }

  @Get('by-name')
  @ApiQuery({
    name: 'name',
    required: true,
    type: String,
  })
  @UseInterceptors(ClassSerializerInterceptor, DetailCompanyInterceptor)
  async getDetailCompanyByNameMobile(
    @Req() req: any
  ) {
    try {
      const { name } = req.query;
      return await this.companiesService.getDetailCompanyByNameMobile(name);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Get detail company error');
    }
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor, DetailCompanyInterceptor)
  async getDetailCompany(@Param('id') id: string) {
    try {
      return await this.companiesService.getDetailCompany(+id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Get detail company error');
    }
  }


}
