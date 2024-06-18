import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
// import { memoryStorage } from "multer";

@Module({
    imports: [
        MulterModule.register({
            // storage: memoryStorage(),
            dest: './uploads',
            
        })
    ],
    providers: [
    ],
    exports: [
        MulterModule,
    ]
})

export class MulterConfigModule {}