

/**
 * Mail service
 * 
 * @class
 */

import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
    constructor(private sender: MailerService) { }

    async sendMailWithTemplate(pathFile: string, data: any) {
        return await this.sender.sendMail({
            to: data.to,
            subject: data['subject'] || "Promotion",
            // context: data.context,
            context: {
                email: data.to,
                otp: data.otp,
            },
            template: pathFile,
        });
    }

    async sendLinkUnique(pathFile: string, data: any) {
        return await this.sender.sendMail({
            to: data.to,
            subject: data['subject'] || "Promotion",
            context: {
                email: data.to,
                link: data.link,
            },
            template: pathFile,
        });
    }

    async sendMail(data: any) {
        await this.sender.sendMail({
            to: data.to,
            subject: data.subject,
            context: data.context,
            html: data.html,
        });
    }

    async sendMailTest(to: string) {
        await this.sender.sendMail({
            to: to,
            subject: "Welcome to NestJS Boilerplate",
            context: {
                email: to,
            },
            html: "<h1>Welcome to NestJS Boilerplate</h1>",
        });
    }

    async sendMailVerifyEmail(pathFile: string, data: any) {
        await this.sender.sendMail({
            to: data.to,
            subject: "Verify Email",
            context: {
                email: data.to,
                link: data.link,
                name: data.name,
            },
            template: pathFile
        });
    }

    async sendMailNotifyBlockUser(pathFile: string, data: any) {
        await this.sender.sendMail({
            to: data.to,
            subject: "Block User",
            context: {
                email: data.to,
                name: data.name,
                reason: data.reason,
            },
            template: pathFile
        });
    }

    async sendMailForgotPasswordApp(pathFile: string, data: any) {
        await this.sender.sendMail({
            to: data.to,
            subject: "Reset Password",
            context: {
                email: data.to,
                otp: data.otp,
            },
            template: pathFile
        });
    }

}