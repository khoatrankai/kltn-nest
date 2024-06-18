// import { BullMailService } from 'src/services/bull/bull-mail.service';
import { CreateMailLoggerDto } from '../log/mail-logger/dto/create-mail-logger.dto';
import { MailLoggerService } from '../log/mail-logger/mail-logger.service';
import { MailService } from './../../services/mail/mail.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AdsMailOptionsDto } from './dto/ads-mail-options.dto';

@Injectable()
export class AdminService {
  constructor(
    // private readonly bullMailService: BullMailService,
    private readonly mailService: MailService,
    private readonly mailLoggerService: MailLoggerService,
  ) {}

  async sendAdsMail(data: AdsMailOptionsDto[], accountId: string) {
    try {
      // create set of mail
      const mailSet = new Set();
      data.forEach((item) => {
        mailSet.add(item.to);
        item['subject'] =
          'Trải nghiệm miễn phí dịch vụ tuyển dụng mới nhất trên HBT nhé bạn';
      });

      if (mailSet.size !== data.length) {
        throw new BadRequestException('Duplicate mail. Please check again');
      }

      await Promise.all(
        data.map(async (item) => {
          await this.mailService.sendMailWithTemplate('ads-mail.hbs', item);
        }),
      );

      const mailLogger: CreateMailLoggerDto[] = data.map((item) => {
        return new CreateMailLoggerDto(accountId, item.to, 'Promotion');
      });

      await this.mailLoggerService.create(mailLogger);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async sendOtpMessage(data: AdsMailOptionsDto[], otp: string) {
    try {
      const mailSet = new Set();
      data.forEach((item) => {
        mailSet.add(item.to);
        item['subject'] =
          'Trải nghiệm miễn phí';
        item['otp'] = otp;
        item['email'] = item.to;
      });

      await Promise.all(
        data.map(async (item) => {
          await this.mailService.sendMailWithTemplate('sign-up.hbs', item);
        }),
      );

    } catch (error) {
      throw error;
    }
  }

  async sendLinkUniqueService(data: AdsMailOptionsDto[], link: string) {
    try {
      const mailSet = new Set();
      data.forEach((item) => {
        mailSet.add(item.to);
        item['subject'] =
          'Trải nghiệm miễn phí';
        item['link'] = link;
        item['email'] = item.to;
      });

      await Promise.all(
        data.map(async (item) => {
          await this.mailService.sendLinkUnique('unique-link.hbs', item);
        }),
      );

    } catch (error) {
      throw error;
    }
  }


  async verifyEmailService(data: AdsMailOptionsDto[], name:string, link:string) {
    try {
      const mailSet = new Set();
      data.forEach((item) => {
        mailSet.add(item.to);
        item['subject'] =
          'Trải nghiệm miễn phí';
        item['email'] = item.to;
        item['name'] = name;
        item['link'] = link;
      });

      await Promise.all(
        data.map(async (item) => {
          await this.mailService.sendMailVerifyEmail('verify-email.hbs', item);
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  async notifyBlockUser(data: AdsMailOptionsDto[], name: string, reason: string) {
    try {
      const mailSet = new Set();
      data.forEach((item) => {
        mailSet.add(item.to);
        item['subject'] =
          'Thông báo khóa tài khoản';
        item['email'] = item.to;
        item['name'] = name;
        item['reason'] = reason;
      });

      await Promise.all(
        data.map(async (item) => {
          await this.mailService.sendMailNotifyBlockUser('block-user.hbs', item);
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  async forgotPasswordForApp(data: AdsMailOptionsDto[], otp: string) {
    try {
      const mailSet = new Set();
      data.forEach((item) => {
        mailSet.add(item.to);
        item['subject'] =
          'Quên mật khẩu';
        item['otp'] = otp;
        item['email'] = item.to;
      });

      await Promise.all(
        data.map(async (item) => {
          await this.mailService.sendMailForgotPasswordApp('send-otp.hbs', item);
        }),
      );

    } catch (error) {
      throw error;
    }
  }
}
