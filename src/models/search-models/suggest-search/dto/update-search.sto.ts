import { PartialType } from "@nestjs/swagger";
import { CreateSuggestSearchDto } from "./create-search.dto";

export class UpdateSuggestSearchDto extends PartialType(CreateSuggestSearchDto) {
    constructor() {
        super();
    }
}