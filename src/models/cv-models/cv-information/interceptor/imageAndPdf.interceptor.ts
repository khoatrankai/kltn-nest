import { BadRequestException, Injectable } from '@nestjs/common';
import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express';

@Injectable()
export class ImageAndPdfInterceptor implements MulterOptionsFactory {
    createMulterOptions(): MulterModuleOptions {
        return {
            fileFilter: (_req, file, cb) => {
                console.log(file);
                if (file.mimetype.match(/\/(doc|docx)$/)) {
                    cb(null, true); 
                } else {
                    cb(new BadRequestException('Only doc files are allowed'), false); 
                }
            },
        };
    }
}
