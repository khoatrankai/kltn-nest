import sharp from 'sharp';
import { FileUpload } from 'src/services/aws/awsService.interface';
import { v4 as uuidv4 } from 'uuid';

/**
 * Resize image to width, height, ext, quanlity
 * 
 * @export
 * @param {Buffer} buffer
 * @param {number} width
 * @param {number} height
 * @param {string} ext
 * 
 * @returns {Promise<Buffer>}
 * 
 * @description
 * This function will:
 * resize image to width, height
 * change ext of image
 * change quanlity of image
 * 
 */

export interface ResizeImageOptions {
    /**
     * width of result image
     * 
     * @type {number}
     * @memberof ResizeImageOptions
     */
    width: number;

    /**
     * height of result image
     * 
     * @type {number}
     * @memberof ResizeImageOptions
     */
    height: number;

    /**
     * quanlity of result image
     * 
     * @type {number}
     * @memberof ResizeImageOptions
     * 
     * if not set, quanlity will be get from size of image
     * @function getQuanlity
     */
    quanlity?: number;

    /**
     * ext of result image
     * 
     * @type {string}
     * @memberof ResizeImageOptions
     * 
     */
    ext: string;
}

export interface ResizeImageResult extends FileUpload {
    /**
     * buffer of result image
     * 
     * @type {Buffer}
     * @memberof ResizeImageResult
     */
    buffer: Buffer;

    /**
     * originalname of result image
     * 
     * @type {string}
     * @memberof ResizeImageResult
     * 
     * @description
     * originalname will be random name by Date.now() and uuidv4()
     */
    originalname: string;
}


/**
 * 
 * @param files 
 * @param options 
 * @returns 
 * 
 * @description
 * This function will:
 * resize image to width, height
 * change ext of image
 * change quanlity of image
 * change name of image to random name by Date.now() and uuidv4()
 * 
 * @returns
 * null if files is null
 * array of object if files is array
 * 
 * 
 */

export async function createResizeImage(
    files: Express.Multer.File | Express.Multer.File,
    options: ResizeImageOptions,
): Promise<ResizeImageResult | ResizeImageResult[] | null> {
    if (!files) {
        return null;
    }

    if (Array.isArray(files)) {
        if (files.length > 1) {
            throw new Error('Images have more than 1 file');
        }
        return await Promise.all(files.map(async (file: Express.Multer.File) => {
            return {
                buffer: await resize(
                    file.buffer,
                    options.width,
                    options.height,
                    options.ext,
                    options.quanlity || getQuanlity(file.size),
                ),
                originalname: `${Date.now()}-${uuidv4()}.${options.ext}`,
            }
        }));        
    } else {
        return {
            buffer: await resize(
                files.buffer,
                options.width,
                options.height,
                options.ext,
                options.quanlity || getQuanlity(files.size),
            ),
            originalname: `${Date.now()}-${uuidv4()}.${options.ext}`
        }
    }
}

/**
 * 
 * @param buffer 
 * @param width 
 * @param height 
 * @param ext 
 * @param quanlity 
 * @returns 
 * 
 * @description
 */

async function resize(
    buffer: Buffer,
    width: number,
    height: number,
    ext: string,
    quanlity: number,
) {
    switch (ext) {
        case 'png':
            try {
                return await sharp(buffer)
                    .resize(width, height)
                    .png({
                        force: false,
                        quality: quanlity,
                    })
                    .toBuffer();
            } catch (error) {
                console.log(error);
                return buffer;
            }
        case 'jpg':
        case 'jpeg':
        case 'gif':
        case 'webp':
        case 'bmp':
            try {
                return await sharp(buffer)
                    .resize(width, height)
                    .jpeg({
                        force: false,
                        quality: quanlity,
                    })
                    .toBuffer();
            } catch (error) {
                console.log(error);
                return buffer;
            }
        default:
            return buffer;
    }
}


/**
 * 
 * @param size 
 * @returns 
 * 
 * @description
 * Calculate quanlity of image by size of image
 * 
 */
function getQuanlity(size: number) {
    if (size > 4000000) {
        return 5;
    } else if (size > 3000000) {
        return 10;
    } else if (size > 2000000) {
        return 30;
    } else if (size > 1000000) {
        return 50;
    } else if (size > 500000) {
        return 70;
    }
    return 100;
}
