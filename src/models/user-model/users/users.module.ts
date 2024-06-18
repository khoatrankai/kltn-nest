// import { TypeOrmExModule } from './../../database/typeorm-ex.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { User } from './entities';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { SignUpTransaction } from './transaction/sign-up.transaction';
import { MailService } from 'src/services/mail/mail.service';
import { JwtRefreshTokenServiceModule } from 'src/providers/jwt/rtk.provider.module';
import { SignUpRecruiterTransaction } from './transaction/sign-up-recruiter.transaction';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { MailLoggerModule } from 'src/models/log/mail-logger/mail-logger.module';
import { ForgotPasswordModule } from 'src/models/forgot-password/forgot-password.module';
import { AdminService } from 'src/models/admin/admin.service';
import { BlockReasonsService } from 'src/models/block-reasons/block-reasons.service';
import { BlockReason } from 'src/models/block-reasons/entities/block-reason.entity';
import { RedisConfigModule } from 'src/config/redis/config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([BlockReason]),
    JwtAccessTokenServiceModule,
    MailLoggerModule,
    JwtRefreshTokenServiceModule,
    ForgotPasswordModule,
    RedisConfigModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    SignUpTransaction,
    AdminService,
    MailService,
    SignUpRecruiterTransaction,
    CloudinaryService,
    BlockReasonsService
  ],
  exports: [UserService],
})
export class UserModule {}
