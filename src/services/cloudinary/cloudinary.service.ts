import { v2 as cloudinary } from 'cloudinary';
import { UploadOpions } from './cloudService.interface';
import { v4 as uuidv4 } from 'uuid';
import {
  BUCKET_IMAGE_PARENT,
  BUCKET_IMAGE_PARENT_DEFAULT,
} from 'src/common/constants';

export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: 'ddwjnjssj',
      api_key: '928543254767848',
      api_secret: 'w8JEy_kZ8uyV99aHKnUZPI7NSiQ',
    });
  }
  async uploadImage(
    file: Express.Multer.File,
    options: UploadOpions,
  ): Promise<any> {
    try {

      const buffer = Buffer.from(file.buffer);

      const public_id = `${options.BUCKET}${
        options.id ? '/' + options.id.toString() : ''
      }/${Date.now()}-${uuidv4()}`;

      const results = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              public_id: public_id,
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            },
          )
          .end(buffer);
      });

      const dataSplit = (results as any).public_id.split('/');
      return dataSplit[dataSplit.length - 1];
    } catch (error) {
      throw new Error('Error uploading images to Cloudinary');
    }
  }

  async uploadImages(
    files: Express.Multer.File[],
    options: UploadOpions,
  ): Promise<any> {
    try {
      const uploadPromises = files.map(async (file) => {
        const buffer = Buffer.from(file.buffer);

        const public_id = `${options.BUCKET}${
          options.id ? '/' + options.id.toString() : ''
        }/${Date.now()}-${uuidv4()}`;

        return new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                public_id: public_id,
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              },
            )
            .end(buffer);
        });
      });

      const results = await Promise.all(uploadPromises);

      const data = results.map((result: any) => {
        const dataSplit = result.public_id.split('/');
        return dataSplit[dataSplit.length - 1];
      });

      return data;
    } catch (error) {
      throw new Error('Error uploading images to Cloudinary');
    }
  }

  // delete images from cloudinary

  async deleteImage(publicId: string) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      if (result.result === 'ok') {
        console.log(`Deleted ${publicId} successfully.`);
      } else {
        console.error(`Failed to delete ${publicId}.`);
      }
    } catch (error) {
      throw new Error('Error deleting directories from Cloudinary');
    }
  }

  async deleteMultipleFiles(publicId: string[]) {
    try {
      for (const directoryName of publicId) {
        const result = await cloudinary.uploader.destroy(directoryName);
        if (result.result === 'ok') {
          console.log(`Deleted ${directoryName} successfully.`);
        } else {
          console.error(`Failed to delete ${directoryName}.`);
        }
      }
    } catch (error) {
      throw new Error('Error deleting directories from Cloudinary');
    }
  }

  // delete directory from cloudinary

  async deleteDirectory(directoryName: string) {
    try {
      const { resources } = await cloudinary.api.resources({
        prefix: directoryName,
        type: 'upload',
        max_results: 500,
      });

      await Promise.all(
        resources.map(async (resource: { public_id: string }) => {
          await cloudinary.uploader.destroy(resource.public_id);
        }),
      );

      const result = await cloudinary.api.delete_folder(directoryName);

      return result;
    } catch (error) {
      throw new Error('Error deleting directory from Cloudinary');
    }
  }

  async deleteDirectories(directoryNames: string[]) {
    try {
      const results = await Promise.all(
        directoryNames.map(async (directoryName) => {
          const { resources } = await cloudinary.api.resources({
            prefix: directoryName,
            type: 'upload',
            max_results: 500,
          });

          await Promise.all(
            resources.map(async (resource: { public_id: string }) => {
              await cloudinary.uploader.destroy(resource.public_id);
            }),
          );

          return cloudinary.api.delete_folder(directoryName);
        }),
      );

      return results;
    } catch (error) {
      throw new Error('Error deleting directories from Cloudinary');
    }
  }

  async checkFolderExist(folderName: any) {
    try {
      const { resources } = await cloudinary.api.resources({
        prefix: folderName,
        type: 'upload',
        max_results: 500,
      });

      if (resources.length > 0) {
        return true;
      }

      return false;
    } catch (error) {
      throw error;
    }
  }

  async uploadImageDefaultToCloud(buffer: Buffer, originalname: string) {
    try {
      const dataBuffer = Buffer.from(buffer);

      const public_id = `${BUCKET_IMAGE_PARENT_DEFAULT}/${originalname}`;

      const results = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              public_id: public_id,
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            },
          )
          .end(dataBuffer);
      });

      const dataSplit = (results as any).public_id.split('/');
      return dataSplit[dataSplit.length - 1];
    } catch (error) {
      throw error;
    }
  }

  async uploadImageToCloud(buffer: Buffer, originalname: string) {
    try {
      const dataBuffer = Buffer.from(buffer);

      const public_id = `${BUCKET_IMAGE_PARENT}/${originalname}`;

      const results = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              public_id: public_id,
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            },
          )
          .end(dataBuffer);
      });

      const dataSplit = (results as any).public_id.split('/');
      return dataSplit[dataSplit.length - 1];
    } catch (error) {
      throw error;
    }
  }

  async uploadFileCV(file: any, options: UploadOpions) {
    try {
      // update file pdf to cloudinary

      const buffer = Buffer.from(file.buffer);

      const resData: any[] = [];

      // Generate public_id

      const public_id =
        options.BUCKET +
        '/' +
        `${options.accountId ? options.accountId + '/' : ''}` +
        `${options.id ? options.id + '/' : ''}` +
        `${file.originalname}`;
      // Return a Promise for each upload

      await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              public_id: public_id,
              resource_type: 'image',
              overwrite: true,
              use_filename: true,
              filename_override: file.originalname,
              discard_original_filename: true,
              // allow delivery
              // allowed_formats: ['pdf'],
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resData.push(result?.public_id);
                resolve(result?.public_id);
              }
            },
          )
          .end(buffer);
      });

      return resData.map((resData) => {
        const dataSplit = resData.split('/');
        return dataSplit[dataSplit.length - 1];
      }) as any[];
    } catch (error) {
      throw error;
    }
  }
}
