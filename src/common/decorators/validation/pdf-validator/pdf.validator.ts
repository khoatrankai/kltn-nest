import { FileValidator, Injectable } from "@nestjs/common";

import { fromBuffer } from 'file-type';

// interface IsFileOptions {
//     mime: ('image/jpg' | 'image/png' | 'image/jpeg' | 'image/gif' | 'image/webp' | 'image/bmp')[];
// }

@Injectable()
export class PdfValidator extends FileValidator<{ mime?: RegExp }> {

    constructor(options?: {
        mime?: RegExp;
    }) {
        super(options ?? { mime: /\/(pdf)$/ });
    }        
    
    buildErrorMessage() {
        return `File type should be pdf`;
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