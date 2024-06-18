import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './users.service';
import { ApiBody, ApiTags, ApiBearerAuth, ApiQuery, ApiConsumes, ApiProperty } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { SignUpDto } from './entities/sign-up.dto';
import { UpdatePasswordRecuitDto } from './dto/update-password-recruit.dto';
import { CandidateResetPasswordDto } from './dto/candidate-reset-password';
import { RecruiterSignUpDto } from './dto/recruiter-sign-up.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { VerifyEmailDto } from './dto/verify-email.do';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/common/enum';
import { BlockUserDto } from './dto/block-user.dto';
import { FotgotPasswordDto } from './dto/forgot-password.dto';
import { ConfirmOtpDto } from './dto/confirm-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';


@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        type: {
          type: 'integer',
          example: 1,
        },
      },
    },
  })
  @Put('type')
  @UseGuards(AuthGuard)
  async update(
    @Req() req: CustomRequest,
    @Body('type', ParseIntPipe) type: number,
  ): Promise<any> {
    try {
      const id = req.user?.id;

      if (!id) {
        throw new BadRequestException('User not found');
      }

      await this.userService.updateTypeUser(id, type);

      return {
        statusCode: HttpStatus.OK,
        message: 'Update type successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Something went wrong');
    }
  }

  @Post('/candidate/sign-up')
  async signUp(@Body() dto: SignUpDto) {
    try {
      await this.userService.signUpService(dto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Sign up successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Something went wrong');
    }
  }


  @Post('/recruit/sign-up')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'logoFile', maxCount: 1 },
      ],
      {
        limits: {
          fileSize: 1024 * 1024 * 6,
        },
      },
    ),
  )
  async signUpRecruit(@Body() recruiterSignUpDto: RecruiterSignUpDto, @UploadedFiles() files: any) {
    try {
      if (!files || !files.logoFile) {
        throw new BadRequestException('Logo is required');
      }

      recruiterSignUpDto.logoFile = files.logoFile[0];

      await this.userService.signUpRecruitService(recruiterSignUpDto);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Sign up successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Something went wrong');
    }
  }

  @Post('block')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  async blockUser(@Body() blockUserDto: BlockUserDto) {
    try {
      await this.userService.blockUserService(blockUserDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Block user successfully',
      }
    } catch (error) {
      throw error;
    }
  }

  @Post('verify-email')
  async verrifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    try {
      await this.userService.verifyEmailService(verifyEmailDto.email, verifyEmailDto.name);

      return {
        statusCode: HttpStatus.OK,
        message: 'Verify email successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('action-verify-email')
  async actionVerifyEmail(@Query('email') email: string, @Res() res: any) {
    try {
      const data = await this.userService.actionVerifyEmailService(email);

      if (!data) {
        res.redirect('http://localhost:3000/verify/verify-fail');
      }

      else {
        res.redirect('http://localhost:3000/verify/verify-success');
      }

    } catch (error) {
      throw error;
    }
  }

  @Post('candidate/reset-password')
  async resetPassword(@Body() dto: CandidateResetPasswordDto) {
    try {
      await this.userService.resetPasswordService(dto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Reset password successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  // update password for recruiter
  @ApiBearerAuth()
  @Post('/recruit/update-password')
  @UseGuards(AuthGuard)
  @ApiQuery({
    name: 'lang',
    required: false,
  })
  async updatePasswordRecruiter(
    @Body() dto: UpdatePasswordRecuitDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;

      const { lang } = req.query;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }
      dto.accoutId = accountId;

      await this.userService.updatePasswordRecruiter(dto, lang ? 'vi' : 'en');

      return {
        statusCode: HttpStatus.OK,
        message: 'Modify password successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Modify password failed');
    }
  }

  @Post('/app/forgot-password')
  @ApiProperty({
    type: 'string',
    example: 'baotoandd2016@gmail.com',
    name: 'email',
  })
  async forgotPasswordApp(@Body() dto: FotgotPasswordDto) {
    try {
      await this.userService.forgotPasswordServiceApp(dto.email);

      return {
        statusCode: HttpStatus.OK,
        message: 'Send email successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('/app/confirm-otp')
  async confirmOtp(@Body() dto: ConfirmOtpDto) {
    try {
      await this.userService.confirmOtpService(dto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Confirm otp successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('/app/reset-password')
  async resetPasswordApp(@Body() dto: ResetPasswordDto) {
    try {
      await this.userService.resetPasswordServiceApp(dto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Reset password successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
