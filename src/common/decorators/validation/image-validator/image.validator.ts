import { FileValidator, Injectable } from "@nestjs/common";

import { fromBuffer } from 'file-type';

// interface IsFileOptions {
//     mime: ('image/jpg' | 'image/png' | 'image/jpeg' | 'image/gif' | 'image/webp' | 'image/bmp')[];
// }

@Injectable()
export class ImageValidator extends FileValidator<{ mime?: RegExp }> {

    constructor(options?: {
        mime?: RegExp;
    }) {
        super(options ?? { mime: /\/(jpg|jpeg|png|gif|bmp|webp)$/ });
    }        
    
    buildErrorMessage() {
        return `File type should be jpg, jpeg, png, gif, bmp, webp`;
    }

    async isValid(file: any) {

        const { mime } = this.validationOptions;

        const { buffer } = file;

        const fileType = await fromBuffer(buffer);

        if (fileType && mime?.test(fileType.mime)) {
            return true;
        }
        
        return false;
    }
    
}