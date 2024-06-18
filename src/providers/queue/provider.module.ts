import { Module } from "@nestjs/common";
import { BullModule } from '@nestjs/bull';
import { BullConfigModule } from "src/config/queue/bull/config.module";
import { BullConfigService } from "src/config/queue/bull/config.service";
import { BullMailService } from "src/services/bull/bull-mail.service";
import { MailService } from "src/services/mail/mail.service";
import { MAIL_QUEUE } from "src/common/constants";
import { BullMailProcessor } from "src/services/bull/bull-mail.processor";
// import { join } from "path";
// import { MailService } from "src/services/mail/mail.service";

@Module({
    imports: [
        BullModule.forRootAsync({
            imports: [BullConfigModule],
            useFactory: async (bullConfigService: BullConfigService) => ({
                redis: {
                    host: bullConfigService.redis?.host,
                    port: bullConfigService.redis?.port,
                },
            }),
            inject: [BullConfigService],
        }),
        BullModule.registerQueueAsync({
            name: MAIL_QUEUE,
            
            imports: [BullConfigModule],
            useFactory: async (bullConfigService: BullConfigService) => ({
                redis: {
                    host: bullConfigService.redis?.host,
                    port: bullConfigService.redis?.port,
                },
                processors: ['src/services/bull/bull-mail.processor.ts'],
            }),
            inject: [BullConfigService],
        }),
    ],
    providers: [BullMailService, MailService, BullMailProcessor],
    exports: [BullMailService, BullModule],
})

export class QueueModule { }