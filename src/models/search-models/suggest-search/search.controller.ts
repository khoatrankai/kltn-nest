import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { SearchService } from './search.service';
import { CreateSuggestSearchDto } from './dto/create-search.dto';
import { UpdateSuggestSearchDto } from './dto/update-search.sto';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/common/enum';
import { AuthGuard } from 'src/authentication/auth.guard';
import { RoleGuard } from 'src/authentication/role.guard';

@Controller('suggest-search')
export class SearchController {
    constructor(private readonly searchService: SearchService){}

    @Get()
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    async findAll() {
        try {
            return {
                statusCode: HttpStatus.OK,
                data: await this.searchService.search()
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message)
            }
            throw new BadRequestException('Error find all search')
        }
    }

    @Get('/:id')
    @Roles(Role.ADMIN)
    @UseInterceptors()
    @UseGuards(AuthGuard, RoleGuard)
    async findById(@Param('id') id: number) {
        try {
            return {
                statusCode: HttpStatus.OK,
                data: await this.searchService.searchById(id)
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message)
            }
            throw new BadRequestException('Error find search')
        }
    }

    @Post('create')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    async create(@Body() createSuggestSearchDto: CreateSuggestSearchDto) { 
        try {
            await this.searchService.create(createSuggestSearchDto)

            return {
                statusCode : HttpStatus.OK
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message)
            }
            throw new BadRequestException('Error creating search')
        }
    }

    @Put('update/:id')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    async update(@Param('id') id: number, @Body() update : UpdateSuggestSearchDto) {

        try {
            
            await this.searchService.update(id, update)

            return {
                statusCode: HttpStatus.OK,
                message: 'update search successfully',
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message)
            }
            throw new BadRequestException('Error update search')
        }

    }
}
