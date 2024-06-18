import {
  BadRequestException,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserSuggestService } from './user-suggest.service';
import { ApiBearerAuth, ApiParam, ApiTags, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { UserSuggestInterceptor } from './interceptor/user-suggest.interceptor';

@ApiTags('User Suggest')
@Controller('user-suggest')
export class UserSuggestController {
  constructor(private readonly userSuggestService: UserSuggestService) {}

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @UseGuards(AuthGuard)
  @ApiQuery({
    name: 'limit',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    required: false,
  })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor, UserSuggestInterceptor)
  async findAll(
    @Param('id') id: string,
    @Req() req: CustomRequest,
    @Req() reqSecond: any,
  ) {
    try {
      const accountId = req.user?.id;

      const { limit, page } = reqSecond.query;

      if (!accountId) throw new BadRequestException('Account not found');

      return await this.userSuggestService.findAll(
        +id,
        accountId,
        page ? page : 0,
        limit ? limit : 10,
      );
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error('Internal Server Error');
    }
  }
}
