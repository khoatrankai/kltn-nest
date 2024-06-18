import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ForgotPassword } from './entities/forgot-password.entity';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class ForgotPasswordService {
  constructor(
    @InjectRepository(ForgotPassword)
    private readonly forgotPasswordRepository: Repository<ForgotPassword>,
    private readonly adminService: AdminService,
  ) { }
  async create(createForgotPasswordDto: CreateForgotPasswordDto) {
    try {

      const checkData = await this.forgotPasswordRepository.findOne({
        where: { email: createForgotPasswordDto.email },
      });

      await this.adminService.sendLinkUniqueService([{ to: createForgotPasswordDto.email }], 'http://localhost:1902/api/v3/forgot-password/' + createForgotPasswordDto.token);

      if (checkData) {
        return await this.forgotPasswordRepository.update(
          { email: createForgotPasswordDto.email },
          createForgotPasswordDto,
        );
      }

      return await this.forgotPasswordRepository.save(createForgotPasswordDto);
    } catch (error) {
      throw error;
    }
  }

  async getUIDService(params: any, ip: string) {
    try {
      const data = await this.forgotPasswordRepository.findOne({
        where: { token: params, ip },
      });

      if (!data) {
        return {
          status: HttpStatus.BAD_REQUEST,
          url: 'http://localhost:3000/page-error',
          message: 'Token not found',
        }
      }

      if (data.status === 1) {
        return {
          status: HttpStatus.BAD_REQUEST,
          url: 'http://localhost:3000/candidate/page-error',
          message: 'Token already used',
        }
      }

      if (new Date(data.expiresAt).getTime() < new Date(data.createdAt).getTime()) {
       return {
        status: HttpStatus.BAD_REQUEST,
        url: 'http://localhost:3000/candidate/page-error',
        message: 'Token expired',
       }
      }

      await this.forgotPasswordRepository.update(
        { email: data.email },
        { status: 1 }
      );

      return {
        status: HttpStatus.OK,
        url: 'http://localhost:3000/candidate/reset-password/' + data.token,
        message: 'Token is valid',
      }
    } catch (error) {
      throw error;
    }
  }

  async findOneForgotPassword(token: string) {
    try {
      return await this.forgotPasswordRepository.findOne({
        where: {
          token,
        },
      });
    } catch (error) {
      throw error;
    }
  }

}
