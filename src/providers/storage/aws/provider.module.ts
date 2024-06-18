import { Module } from "@nestjs/common";
import { AWSConfigModule } from "src/config/storage/aws/config.module";
import { AWSService } from "src/services/aws/aws.service";


@Module({
    imports: [AWSConfigModule],
    providers: [AWSService],
    exports: [AWSService],
})

export class AWSModule { }