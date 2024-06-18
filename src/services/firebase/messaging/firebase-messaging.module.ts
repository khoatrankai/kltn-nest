import { Module } from "@nestjs/common";
// import { FirebaseMessagingController } from "./firebase-messaging.controller";
import { FirebaseMessagingService } from "./firebase-messaging.service";
import { FcmTokensModule } from "src/models/fcm-tokens/fcm-tokens.module";

@Module({
    imports: [
        FcmTokensModule,
    ],
    // controllers: [FirebaseMessagingController],
    providers: [FirebaseMessagingService],
    exports: [FirebaseMessagingService],
})
export class FirebaseMessagingModule { }