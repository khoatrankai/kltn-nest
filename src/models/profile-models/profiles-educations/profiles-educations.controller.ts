import { BadRequestException, Body, Controller, Delete, HttpStatus, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { ProfilesEducationsService } from './profiles-educations.service';
import { CreateProfilesEducationDto } from './dto/create-profiles-educations.dto';
import { DeleteProfilesEducationDto } from './dto/delete-profiles-educations.dto';
import { UpdateProfilesEducationDto } from './dto/update-profiles-education.dto';


@Controller('profiles-educations')
@ApiTags('Profiles Educations')
export class ProfilesEducationsController {

    constructor(
        private readonly profilesEducationsService: ProfilesEducationsService
    ) {}

    @Post()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async create(@Req() req: CustomRequest, @Body() createProfilesEducationDto: CreateProfilesEducationDto) {
        try {
            const accountId = req.user?.id;

            if (!accountId) {
                throw new BadRequestException('Account id is required');
            }

            createProfilesEducationDto.accountId = accountId;

            return {
                statusCode: HttpStatus.CREATED,
                data: await this.profilesEducationsService.create(createProfilesEducationDto)
            }
            
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            }
            throw new BadRequestException('Something went wrong');
        }
    }

 
    @Put()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async update(@Req() req: CustomRequest, @Body() updateProfilesEducationDto: UpdateProfilesEducationDto) {
        try {
            
            const accountId = req.user?.id;

            if (!accountId) {
                throw new BadRequestException('Account id is required');
            }

            updateProfilesEducationDto.accountId = accountId;

            await this.profilesEducationsService.update(updateProfilesEducationDto)

            return {
                statusCode: HttpStatus.OK,
                message: 'Profile education updated successfully'
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            }
            throw new BadRequestException('Something went wrong');
        }
    }


    @UseGuards(AuthGuard)
    @Delete()
    @ApiBearerAuth()
    async remove(@Req() req: CustomRequest, @Body() deleteProfilesEducationDto: DeleteProfilesEducationDto) {
        try {
            
            const accountId = req.user?.id;

            if (!accountId) {
                throw new BadRequestException('Account id is required');
            }

            deleteProfilesEducationDto.accountId = accountId;

            await this.profilesEducationsService.remove(deleteProfilesEducationDto)

            return {
                statusCode: HttpStatus.OK,
                message: `Profile education deleted successfully`
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            }
            throw new BadRequestException('Something went wrong');
        }
    }

}


