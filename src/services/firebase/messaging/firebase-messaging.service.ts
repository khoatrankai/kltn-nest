import { Injectable } from "@nestjs/common";
import { FirebaseMessagingInterface } from "./firebase-messaging.interface";
import * as firebase from 'firebase-admin';
import { MulticastMessage, Notification, SendResponse } from "firebase-admin/lib/messaging/messaging-api";
import { Logger } from "@nestjs/common";


@Injectable()
export class FirebaseMessagingService implements FirebaseMessagingInterface {

    ERROR_CODE_NOT_REGISTER = "messaging/registration-token-not-registered"

    constructor() {}

    /**
     * Send multicast message to devices
     * fcmtokens: array of tokens - recived from database
     * message: message to send
     * 
     * dryRun: true/false - test mode
     * data: data to send
     * 
     * 
     * @param _tokens 
     * @param _message 
     * @param _dryRun 
     * @param _data
     * @returns 
     * 
     */
    async sendMulticast(_tokens: string[], notification: Notification, _dryRun?: boolean, _data?: any): Promise<any> {

        const message: MulticastMessage = {
            tokens: _tokens,
            notification: notification,
            data: _data,
        };
        
        const jobs = await firebase.messaging().sendEachForMulticast(
            message,            
        ).then((response) => {
            return response.responses;
        })

        return jobs;
    }

    async sendNotificationWhenNewPost(tokens: string[], notification: Notification, data: any): Promise<any> {            

        if (tokens.length === 0) {
            Logger.log('No token to send notification');
            return [];
        }

        const jobs: SendResponse[] = await this.sendMulticast(tokens, notification, false, data);
        return [jobs, tokens];
    }
    static sendMulticast(_tokens: string[], _notification: Notification) {
        throw new Error("Method not implemented.");
    }

}