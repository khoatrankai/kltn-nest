

/**
 * @description
 * This file contains the configuration for the nodemailer module.
 * 
 * @see
 * https://nodemailer.com/smtp/
 * https://nodemailer.com/smtp/oauth2/
 * https://nodemailer.com/message/
 * 
 * 
 * @important
 * 
 * @class
 */

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class NodeMailerConfigService {
    constructor(private nodeMailerConfig: ConfigService) {}

    get host(): string | undefined {
        return this.nodeMailerConfig.get<string>('node-mailer.host')
    }

    get port(): number | undefined {
        return this.nodeMailerConfig.get<number>('node-mailer.port')
    }

    get secure(): boolean | undefined {
        return this.nodeMailerConfig.get<boolean>('node-mailer.secure')
    }

    get auth(): {
        user: string | undefined,
        pass: string | undefined,
    } | undefined {
        return this.nodeMailerConfig.get<{
            user: string | undefined,
            pass: string | undefined,
        }>('node-mailer.auth')
    }

    get from(): string | undefined {
        return this.nodeMailerConfig.get<string>('node-mailer.from')
    }
}