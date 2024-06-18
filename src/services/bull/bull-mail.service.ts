/**
 * @file - Bull Mail Service
 * 
 * @class BullMailService
 */

import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { MAIL_QUEUE } from "src/common/constants";
// import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class BullMailService {
    constructor(
        // private mailService: MailerService,
        @InjectQueue(MAIL_QUEUE) private readonly mailQueue: Queue,
    ) {}

    async sendMail(data: any) {
        await this.mailQueue.add(MAIL_QUEUE, data);
    }

    async sendMailToAdmin(data: any) {
        await this.mailQueue.add(MAIL_QUEUE, data);
    }

}