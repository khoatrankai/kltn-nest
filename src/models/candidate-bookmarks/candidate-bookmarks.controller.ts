import {
  Controller,
  Post,
  Body,
  Req,
  BadRequestException,
  UseGuards,
  HttpStatus,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CandidateBookmarksService } from './candidate-bookmarks.service';
import { CreateCandidateBookmarkDto } from './dto/create-candidate-bookmark.dto';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { AuthNotRequiredGuard } from 'src/authentication/authNotRequired.guard';
import { CandidateBookmarkedInterceptor } from './interceptor/candiate-bookmarks.interceptor';

@Controller('candidate-bookmarks')
@ApiTags('Candidate Bookmarked')
export class CandidateBookmarksController {
  constructor(
    private readonly candidateBookmarksService: CandidateBookmarksService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async create(
    @Body() createCandidateBookmarkDto: CreateCandidateBookmarkDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      createCandidateBookmarkDto.recruitId = accountId;

      const data =
        await this.candidateBookmarksService.createCandidateBookmarked(
          createCandidateBookmarkDto,
        );

      if (data) {
        return {
          status: HttpStatus.CREATED,
          data,
        };
      }

      return {
        status: HttpStatus.OK,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error creating candidate bookmark');
    }
  }

  @Get()
  @UseGuards(AuthNotRequiredGuard)
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor, CandidateBookmarkedInterceptor)
  @ApiQuery({
    name: 'limit',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    required: false,
  })
  async findAll(@Req() req: CustomRequest) {
    try {
      
      const accountId = req.user?.id;

      const {limit, page} = req;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      return await this.candidateBookmarksService.find(accountId, limit ? limit - 1 : 20, page ?  page : 0)
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }   
      throw new BadRequestException('Error finding candidate bookmarks');
    }
  }
}
