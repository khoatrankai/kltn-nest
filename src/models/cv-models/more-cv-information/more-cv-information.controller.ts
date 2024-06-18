import { BadRequestException, Body, Controller, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { MoreCvInformationService } from "./more-cv-information.service";
import { AuthGuard } from "src/authentication/auth.guard";
import { CustomRequest } from "src/common/interfaces/customRequest.interface";
import { ArrayCreateMoreCvInformationDto } from "./dto/array-more-cv-information.dto";

  @ApiTags('More CV Information')
  @Controller('cv-more-information')
  export class MoreCvInformationController {
    constructor(private readonly moreCvInformationService: MoreCvInformationService) {}
  
    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async create(
      @Body() createMoreCvInformationDto: ArrayCreateMoreCvInformationDto,
      @Req() req: CustomRequest,
    ) {
      try {
        const accountId = req.user?.id;
  
        if (!accountId) {
          throw new BadRequestException('Account id is required');
        }

        return {
          statusCode: HttpStatus.CREATED,
          data: await this.moreCvInformationService.create(createMoreCvInformationDto),
        };
      } catch (error) {
        console.log(error)
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error('Create cv information failed');
      }
    }
  }
  