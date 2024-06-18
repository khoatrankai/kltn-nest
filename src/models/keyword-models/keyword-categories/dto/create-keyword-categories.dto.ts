import { IsNotEmpty } from "class-validator";
import { IsArrayNumberOrNumber } from "src/common/decorators/validation/isArrayNumberOrNumber.validator";


export class CreateKeywordCategoriesDto {

    constructor(keywordId: number, categoryId: number) {
        this.keywordId = keywordId;
        this.categoryId = categoryId;
    }

    @IsNotEmpty()
    keywordId!: number 

    @IsArrayNumberOrNumber()
    @IsNotEmpty()
    categoryId!: number;
}