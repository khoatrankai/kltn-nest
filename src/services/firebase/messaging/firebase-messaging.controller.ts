import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FirebaseMessagingService } from "./firebase-messaging.service";
import { FcmTokensService } from "src/models/fcm-tokens/fcm-tokens.service";
import { Notification } from "firebase-admin/lib/messaging/messaging-api";

@ApiTags('firebase-messaging')
@Controller('firebase-messaging')
export class FirebaseMessagingController {
    constructor(
        private readonly _firebaseMessagingService: FirebaseMessagingService,
        private readonly fcmTokensService: FcmTokensService
    ) { }

    @Get('test')
    async test() {
        const tokens = await this.fcmTokensService.readByAccountId('c53fe2a4-52c3-4332-b7e8-9b3baae27764');

        const notification: Notification = {
            title: 'test',
            body: 'test',
        }

        return await this._firebaseMessagingService.sendMulticast(
            tokens.map(token => token.token),
            notification,
        )
    }
        
}