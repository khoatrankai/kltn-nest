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
export class CommunicationImagesPipe
  implements PipeTransform<Express.Multer.File, Promise<Express.Multer.File>>
{
  constructor() {}
  MAX_TOTAL_SIZE = 1024 * 1024 * 5; // 5MB

  async transform(files: any): Promise<any> {
    try {
      if (!files) {
        return {
          images: null,
        };
      }

      const { images } = files;

      if (!images) {
        return
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

      return await Promise.all(
        images.map(async (image: Express.Multer.File) => {
          return await createResizeImage(image, {
            width: 500,
            height: 500,
            ext: 'jpg',
          });
        }),
      );
    } catch (error) {
      throw error;
    }
  }
}
