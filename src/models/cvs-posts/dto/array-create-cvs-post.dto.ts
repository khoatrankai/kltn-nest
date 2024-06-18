import { ApiProperty } from "@nestjs/swagger";
import { CreateCvsPostDto } from "./create-cvs-post.dto";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateArrayCvsPost{
    @ApiProperty({
        type: 'array',
        items: {
            type: 'object',
            properties: {
                postId: { type: 'int', default: 84517 },
                type: { type: 'int', default: 0, description: '0: posts, 1: cvs'},
                cvIndex: { type: 'int', default: 0 },
                accountId: { type: 'string', default: 'f429b393-8367-4a5d-8b74-48cc3f29c4d8'},
            },
        },
    })
    @IsNotEmpty()
    data!: CreateCvsPostDto[];

    @IsOptional()
    accountId!: string;
}