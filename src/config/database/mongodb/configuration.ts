import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule, MongooseModuleOptions } from "@nestjs/mongoose";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [".env.development", ".env.production", ".env.test"],
            // load: [configuration],
        }),
        MongooseModule.forRoot((process.env as { MONGO_URL: string }).MONGO_URL, createMongooseOptions()),
    ],
})
export class MongoDBModule { }

function createMongooseOptions(): MongooseModuleOptions {
    return {
        
    };
}




