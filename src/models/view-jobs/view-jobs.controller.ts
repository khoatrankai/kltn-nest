import { Controller, Post, Body, UseGuards, Req, BadRequestException, Get, UseInterceptors, ClassSerializerInterceptor} from '@nestjs/common';
import { ViewJobsService } from './view-jobs.service';
import { CreateViewJobDto } from './dto/create-view-job.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { ViewJobsInterceptor } from './interceptor/view-jobs.interceptor';

@ApiTags('View Jobs')
@Controller('view-jobs')
export class ViewJobsController {
  constructor(private readonly viewJobsService: ViewJobsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async create(@Body() createViewJobDto: CreateViewJobDto, @Req() req: CustomRequest) {
    try {

      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Invalid account id');
      }

      createViewJobDto.accountId = accountId;
      return await this.viewJobsService.create(createViewJobDto);
    } catch (error) {
      throw error;      
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor, ViewJobsInterceptor)
  async findAll(@Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Invalid account id');
      }

      return await this.viewJobsService.findAllService(accountId);
    } catch (error) {
      throw error;
    }
  }
}
