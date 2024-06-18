import { ApiProperty } from "@nestjs/swagger";

export class UploadWordDto {
    @ApiProperty({
        type: 'file',
        required: false
    })
    file?: any;
}
