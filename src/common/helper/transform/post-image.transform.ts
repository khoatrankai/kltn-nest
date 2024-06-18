import { Injectable, PipeTransform } from "@nestjs/common";
import sharp from 'sharp';
import { THUMNAIL_HEIGHT, THUMNAIL_WIDTH } from "src/common/constants";
import { Readable } from "stream";
import { v4 as uuidv4 } from "uuid";


interface ResizeImageOptions {
    width: number;
    height: number;
    quanlity: number;
    type: 'png' | 'jpg';

}
/**
 * Transfrom images to thumbnail, original and resized
 * 
 * @export
 * @class ImagesPipe
 * 
 */
@Injectable()
export class PostImagesPipe implements PipeTransform<Express.Multer.File, Promise<Express.Multer.File[]>> {
    constructor() { }
    EXT_IMAGE = '.jpg';
    MAX_TOTAL_SIZE = 1024 * 1024 * 5; // 5MB

    async transform(files: Express.Multer.File): Promise<any> {

        if (!files || !Array.isArray(files) || !files[0]) return null;

        const filesFormated = [];

        if (Array.isArray(files)) {
            let totalSize = 0;
            
            for (const file of files) {
                totalSize += file.size;
            }

            if (totalSize > this.MAX_TOTAL_SIZE) {
                throw new Error('Total size of files is too large');
            }

            files.forEach(file => {
                file.originalname = this.generateFileName(file.mimetype.split('/')[1] || 'jpg');
            });

            // console.log('files', files);

            // first image will be thumbnail
            const thumnail = await this.createThumbnail(files[0]);

            filesFormated.push(thumnail, ...files);
        }
        return filesFormated; 
    }

    async createThumbnail(file: Express.Multer.File) {  

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
    
        return await this.createResized(file, {
            width: THUMNAIL_WIDTH,
            height: THUMNAIL_HEIGHT,
            quanlity,
            type: 'png',
        });
    }

    async createResized(file: Express.Multer.File, option: ResizeImageOptions) {
        const { buffer } = file;
        const name = this.generateFileName(option.type);
        
        let newBuff;

        if (option.type === 'png') {
            newBuff = await sharp(buffer)
                .resize(option.width, option.height)
                .png({ quality: option.quanlity })
                .toBuffer();
        } else {
            newBuff = await sharp(buffer)
                .resize(option.width, option.height)
                .jpeg({ quality: option.quanlity })
                .toBuffer();
        }
    
        const newFile: Express.Multer.File = {
            buffer: newBuff,
            originalname: name,
            fieldname: "",
            encoding: "",
            mimetype: "",
            size: 0,
            stream: Readable.from(newBuff),
            destination: "",
            filename: name,
            path: ""
        };
    
        return newFile;
    }

    generateFileName(ext: String) {
        const name = `${Date.now()}-${uuidv4()}`
        return `${name}.${ext}`;
    }
}    

