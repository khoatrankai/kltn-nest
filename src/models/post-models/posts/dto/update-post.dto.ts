import { PartialType } from "@nestjs/swagger";
import { CreatePostDto } from "./create-post.dto";
import { IsOptional } from "class-validator";

export class UpdatePostDto extends PartialType(CreatePostDto as new () => CreatePostDto) {
    
    id!: number;

    @IsOptional()
    deletedImages!: any[];
}