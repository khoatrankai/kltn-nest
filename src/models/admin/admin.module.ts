import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AuthModule } from "src/authentication/auth.module";
import { JwtAccessTokenServiceModule } from "src/providers/jwt/atk.provider.module";
import { MailService } from "src/services/mail/mail.service";
import { AdminController } from "./admin.controller";
// import { MailLoggerService } from "../log/mail-logger/mail-logger.service";
import { MailLoggerModule } from "../log/mail-logger/mail-logger.module";
import { QueueModule } from "src/providers/queue/provider.module";

@Module({
    imports: [
        AuthModule,
        JwtAccessTokenServiceModule,
        QueueModule,
        MailLoggerModule
    ],
    providers: [AdminService, MailService],
    controllers: [AdminController]
})

export class AdminModule { }