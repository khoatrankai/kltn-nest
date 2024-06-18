
import { Injectable, Logger, PipeTransform } from "@nestjs/common";
import sharp from 'sharp';
import { LOGO_COMPANY_HEIGHT, LOGO_COMPANY_WIDTH } from "src/common/constants";
import { Readable } from "stream";
import { v4 as uuidv4 } from "uuid";

/**
 * Transfrom images to thumbnail, original and resized
 * 
 * @export
 * @class ImagesPipe
 * 
 */

export interface ImageTransformed {
    image: Express.Multer.File;
}

@Injectable()
export class ImagePipe implements PipeTransform<Express.Multer.File, Promise<Express.Multer.File>> {
    constructor() { }
    MAX_TOTAL_SIZE = 1024 * 1024 * 2; // 5MB

    async transform(files: Express.Multer.File): Promise<any> {

        if (!files) return null;
        
        const fileTransformed: ImageTransformed = {
            image: {} as Express.Multer.File,
        };

        // console.log('files', files);
        
        if (Array.isArray(files)) {

            if (files.length === 0) {
                return null;
            }

            let totalSize = 0;
            
            for (const file of files) {
                totalSize += file.size;
            }

            Logger.log(`Total size of files: ${totalSize}`);
            Logger.log(`Max total size of files: ${this.MAX_TOTAL_SIZE}`);

            if (totalSize > this.MAX_TOTAL_SIZE) {
                throw new Error('Total size of files is too large');
            }

            fileTransformed.image = await createResizeImage(files[0], LOGO_COMPANY_WIDTH, LOGO_COMPANY_HEIGHT);

        }
        return fileTransformed.image; 
    }
}

async function createResizeImage(file: Express.Multer.File, width: number = 500, height: number = 500) {
    const { buffer } = file;
    const EXT_IMAGE = '.png';
    const name = `${Date.now()}-${uuidv4()}`

    let quanlity = 100;
    if (file.size > 4000000) {
        quanlity = 5;
    } else if (file.size > 3000000) {
        quanlity = 10;
    } else if (file.size > 2000000) {
        quanlity = 30;
    } else if (file.size > 1000000) {
        quanlity = 50;
    } else if (file.size > 500000) {
        quanlity = 70;
    }

    const fileBuffer = await sharp(buffer)
        .resize(width, height)
        .png({
            adaptiveFiltering: false,
            force: false,
            quality: quanlity,
        })
        .toBuffer();

    const resizedFile: Express.Multer.File = {
        buffer: fileBuffer,
        originalname: `${name}${EXT_IMAGE}`,
        fieldname: "",
        encoding: "",
        mimetype: "",
        size: 0,
        stream: Readable.from(fileBuffer),
        destination: "",
        filename: "",
        path: ""
    };

    return resizedFile;
}