import { Injectable, PipeTransform } from '@nestjs/common';
import { ImageValidator } from 'src/common/decorators/validation/image-validator/image.validator';
import { createResizeImage } from 'src/common/helper/transform/resize-image';
// import sharp from 'sharp';
// import { LOGO_COMPANY_HEIGHT, LOGO_COMPANY_WIDTH } from "src/common/constants";
// import { Readable } from "stream";
// import { v4 as uuidv4 } from "uuid";

/**
 * image interceptor for images and logo company
 *
 * @export
 * @class CompanyImagesPipe
 *
 * @param
 * logo: Express.Multer.File
 * images: Express.Multer.File[]
 *
 * @description
 * This pipe will:
 * validate images and logo
 * create, resize logo (format png)
 * create, resize, reduce images (format jpg)
 *
 */

@Injectable()
export class CompanyImagesPipe
    implements PipeTransform<Express.Multer.File, Promise<Express.Multer.File>>
{
    constructor() { }
    MAX_TOTAL_SIZE = 1024 * 1024 * 6; // 6MB
    // MAX_EACH_SIZE = 1024 * 1024 * 2; // 1MB

    async transform(files: any): Promise<any> {
        try {
            // console.log('files', files);

            if (!files) {
                return {
                    logo: null,
                    images: null,
                };
            }

            if (Array.isArray(files)) {
                return {
                    logo: null,
                    images: files
                        ? await Promise.all(
                            files.map(async (image: Express.Multer.File) => {
                                return await createResizeImage(image, {
                                    width: 800,
                                    height: 600,
                                    ext: 'jpg',
                                });
                            }),
                        )
                        : null,
                };
            }

            const { logo, images } = files;

            if (Array.isArray(logo)) {
                if (logo.length > 1) {
                    throw new Error('Logo must be 1 file');
                }

                if (!(await new ImageValidator().isValid(logo[0].buffer))) {
                    throw new Error('Logo must be image');
                }
            }

            if (Array.isArray(images)) {
                if (images.length > 5) {
                    throw new Error('Images must be less than 5 files');
                }

                for (const image of images) {
                    if (!(await new ImageValidator().isValid(image.buffer))) {
                        throw new Error('Images must be image');
                    }
                }
            }

            return {
                logo: logo
                    ? await createResizeImage(logo[0], {
                        width: 200,
                        height: 200,
                        ext: 'png',
                    })
                    : null,
                images: images
                    ? await Promise.all(
                        images.map(async (image: Express.Multer.File) => {
                            return await createResizeImage(image, {
                                width: 800,
                                height: 600,
                                ext: 'jpg',
                            });
                        }),
                    )
                    : null,
            };
        } catch (error) {
            throw error;
        }
    }
}
