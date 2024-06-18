import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

/**
 * Service dealing with app config based operations.
 * 
 * @class
 */

@Injectable()
export class AppConfigService {
    constructor(private configService: ConfigService) {}

    get name(): string | undefined {
        return this.configService.get<string>('app.name')
    }

    get env(): string | undefined {
        return this.configService.get<string>('app.env')
    }

    get url(): string | undefined {
        return this.configService.get<string>('app.url')
    }

    get port(): number | undefined {
        return this.configService.get<number>('app.port')
    }

    get mode(): string | undefined {
        return this.configService.get<string>('app.mode')
    }    

    get firebase(): any | undefined {
        return {
            type: this.configService.get<string>('app.firebase.type'),
            projectId: this.configService.get<string>('app.firebase.project_id'),
            privateKeyId: this.configService.get<string>('app.firebase.private_key_id'),
            privateKey: this.configService.get<string>('app.firebase.private_key'),
            clientEmail: this.configService.get<string>('app.firebase.client_email'),
            clientId: this.configService.get<string>('app.firebase.client_id'),
            authUri: this.configService.get<string>('app.firebase.auth_uri'),
            tokenUri: this.configService.get<string>('app.firebase.token_uri'),
            authProviderX509CertUrl: this.configService.get<string>('app.firebase.auth_provider_x509_cert_url'),
            clientX509CertUrl: this.configService.get<string>('app.firebase.client_x509_cert_url'),
        }
    }
}