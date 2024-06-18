export class CreateMailLoggerDto {

    accountId!: string;

    recipient!: string;

    subject!: string;

    // template!: string;

    constructor(accountId: string, recipient: string, subject: string) {
        this.accountId = accountId;
        this.recipient = recipient;
        this.subject = subject;
    }

}
