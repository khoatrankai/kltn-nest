import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
import { SignUpTransaction } from './transaction/sign-up.transaction';
import { SignUpDto } from './entities/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordRecuitDto } from './dto/update-password-recruit.dto';
import { CandidateResetPasswordDto } from './dto/candidate-reset-password';
import { RecruiterSignUpDto } from './dto/recruiter-sign-up.dto';
import { SignUpRecruiterTransaction } from './transaction/sign-up-recruiter.transaction';
import { AdminService } from 'src/models/admin/admin.service';
import { ForgotPasswordService } from 'src/models/forgot-password/forgot-password.service';
import { BlockUserDto } from './dto/block-user.dto';
import { BlockReasonsService } from 'src/models/block-reasons/block-reasons.service';
import { BlockUserConstant } from '../constants/block_user';
import { RedisConfigService } from 'src/config/redis/config.service';
import { createClient } from 'redis';
import { ConfirmOtpDto } from './dto/confirm-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly redisConfigService: RedisConfigService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly signUpTransaction: SignUpTransaction,
    private readonly forgotPasswordService: ForgotPasswordService,
    private readonly signUpRecruiterTransaction: SignUpRecruiterTransaction,
    private readonly adminService: AdminService,
    private readonly blockReasonsService: BlockReasonsService
  ) { }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async updateTypeUser(id: string, typeUser: number) {
    try {
      if (typeUser !== 0 && typeUser !== 1) {
        throw new BadRequestException('Type user invalid');
      }

      await this.usersRepository.update(id, {
        type: typeUser,
      });
    } catch (error) {
      throw error;
    }
  }

  async findByIdAndType(accountId: string) {
    try {
      return await this.usersRepository.findOne({
        where: {
          id: accountId,
          role: 3,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findRoleById(accountId: string) {
    try {
      return await this.usersRepository.findOne({
        where: {
          id: accountId,
        },
        select: ['role', 'email', 'id', 'type'],
      });
    } catch (error) {
      throw error;
    }
  }

  async signUpService(dto: SignUpDto) {
    try {
      return await this.signUpTransaction.run(dto);
    } catch (error) {
      throw error;
    }
  }

  async signUpRecruitService(dto: RecruiterSignUpDto) {
    try {
      return await this.signUpRecruiterTransaction.run(dto);
    } catch (error) {
      throw error;
    }
  }

  async verifyEmailService(email: string, name: string) {
    try {
      let link = 'http://localhost:1902/api/v3/users/action-verify-email?email=' + email;

      await this.adminService.verifyEmailService([{ to: email }], name, link);
    } catch (error) {
      throw error;
    }
  }

  async actionVerifyEmailService(email: string) {
    try {

      const data = await this.usersRepository.findOne({
        where: {
          email: email,
        },
      });

      if (!data) {
        return false;
      }

      const dataUpdate = await this.usersRepository.update(
        { email: email },
        {
          isActive: 1,
        },
      );

      if (!dataUpdate) {
        return false;
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  async resetPasswordService(dto: CandidateResetPasswordDto) {
    try {
      const checkForgotPassword = await this.forgotPasswordService.findOneForgotPassword(
        dto.token,
      );

      if (!checkForgotPassword) {
        throw new BadRequestException('Token not found');
      }

      if (dto.password !== dto.confirmPassword) {
        throw new BadRequestException('Password and confirm password not match');
      }

      await this.usersRepository.update(
        { email: checkForgotPassword.email },
        {
          password: await bcrypt.hash(dto.password, 10),
        },
      );

    } catch (error) {
      throw error;
    }
  }

  async updatePasswordRecruiter(dto: UpdatePasswordRecuitDto, lang: string) {
    try {
      const checkUser = await this.usersRepository.findOne({
        where: {
          id: dto.accoutId,
        },
      });

      if (!checkUser) {
        throw new BadRequestException(lang === 'vi' ? 'Không tìm thấy người dùng' : 'User not found');
      }

      // check old password

      const checkPassword = await bcrypt.compare(
        dto.oldPassword,
        checkUser.password,
      );

      if (!checkPassword) {
        throw new BadRequestException(lang === 'vi' ? 'Mật khẩu cũ không hợp lệ' : 'Old password invalid');
      }

      //   use bcrypt to hash password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(dto.password, salt);

      await this.usersRepository.update(
        { id: dto.accoutId },
        {
          password: hashPassword,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  // block user 
  async blockUserService(blockUserDto: BlockUserDto) {
    try {
      const reasonBlock = BlockUserConstant.REASON.trim();

      const dataBlock = await this.blockReasonsService.findById(blockUserDto.reasonId)

      if (!dataBlock) {
        throw new BadRequestException('Reason not found');
      }

      if (reasonBlock === dataBlock?.reason) {
        if (!blockUserDto.description) {
          throw new BadRequestException('Description is required')
        }
      }

      const data = await this.usersRepository.findOne({
        where: {
          id: blockUserDto.user_Id,
        },
        relations: ['profile']
      });

      if (!data) {
        throw new BadRequestException('User not found');
      }

      await this.usersRepository.update(
        { id: blockUserDto.user_Id },
        {
          status: blockUserDto.status,
        },
      );

      await this.adminService.notifyBlockUser([{ to: data.email }], data.profile.name, blockUserDto.description);

    } catch (error) {
      throw error;
    }
  }

  async forgotPasswordServiceApp(email: string) {
    try {
      const data = await this.usersRepository.findOne({
        where: {
          email: email,
        },
      });

      if (!data) {
        throw new BadRequestException('Email not found');
      }

      // otp 4 number
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      
      //  save or update otp in redis use redis configuration module 
      const redisConfig = this.redisConfigService.redis;
      const client = createClient({
        url: `redis://${redisConfig?.host}:${redisConfig?.port}`,
      });

      await client.connect();

      await client.set(email, otp, {
        EX: 3600,
      });

      await this.adminService.forgotPasswordForApp([{ to: email }], otp);

    } catch (error) {
      throw error;
    }
  }

  async confirmOtpService(dto: ConfirmOtpDto) {
    try {
      const redisConfig = this.redisConfigService.redis;
      const client = createClient({
        url: `redis://${redisConfig?.host}:${redisConfig?.port}`,
      });

      await client.connect();

      const otp = await client.get(dto.email);

      if (!otp) {
        throw new BadRequestException('OTP not found');
      }

      if (otp !== dto.otp) {
        throw new BadRequestException('OTP invalid');
      }

      await client.del(dto.email);

    } catch (error) {
      throw error;
    }
  }

  async resetPasswordServiceApp(dto: ResetPasswordDto) {
    try {

      const data = await this.usersRepository.findOne({
        where: {
          email: dto.email,
        },
      });

      if (!data) {
        throw new BadRequestException('Email not found');
      }

      await this.usersRepository.update(
        { email: dto.email },
        {
          password: await bcrypt.hash(dto.newPassword, 10),
        },
      );
    } catch (error) {
      throw error;
    }
  }
}
