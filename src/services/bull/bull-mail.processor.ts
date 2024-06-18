
/**
 * @fileoverview Bull mail processor.
 * 
 * @module services/bull/bull-mail.processor
 */

import { OnQueueActive, OnQueueCleaned, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { MAIL_QUEUE } from 'src/common/constants';
import { MailService } from '../mail/mail.service';
import { Logger } from '@nestjs/common';

@Processor(MAIL_QUEUE)
export class BullMailProcessor {

    constructor(
        private readonly mailService: MailService
    ) { }

    @Process(MAIL_QUEUE)
    async sendMail(job: any) {
        try {
            // show all jobs in queue
            await this.mailService.sendMailWithTemplate('ads-mail.hbs', job.data);
        }
        catch (error) {
            Logger.error(`Failed job ${job.id} of type ${job.name}: ${error}`);
        }
    }

    @OnQueueActive()
    onActive(job: any) {
        Logger.log(`Processing job ${job.id} of type ${job.name}`);
    }

    @OnQueueCompleted()
    onComplete(job: any) {
        Logger.log(`Completed job ${job.id} of type ${job.name}`);
    }

    @OnQueueCleaned()
    onClean(job: any, status: any) {
        Logger.log(`Cleaned job ${job.id} of type ${job.name}: ${status}`);
    }

    @OnQueueFailed()
    onError(job: any, error: any) {
        Logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`);
    }
}
