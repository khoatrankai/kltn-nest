

/**
 * Bull configuration
 * 
 * @class
 */

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AWSConfigService {
    constructor(
        private awsConfig: ConfigService,
    ) {}

    get accessId(): string | undefined {
        return this.awsConfig.get<string>('aws.accessId')
    }

    get secretKey(): string | undefined {
        return this.awsConfig.get<string>('aws.secretKey')
    }

    get region(): string | undefined {
        return this.awsConfig.get<string>('aws.region')
    }

    get bucket(): string | undefined {
        return this.awsConfig.get<string>('aws.bucket')
    }

    get prefixUrl(): string | undefined {
        return this.awsConfig.get<string>('aws.prefixUrl')
    }

}