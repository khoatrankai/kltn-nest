
export interface FirebaseMessagingInterface {

    sendMulticast(tokens: any, message: any, dryRun?: boolean, options?: any): Promise<any>;

}
