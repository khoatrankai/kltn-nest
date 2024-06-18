import { Entity, PrimaryColumn } from "typeorm";

@Entity('keyword_categories')
export class KeywordCategory {

    @PrimaryColumn({type: 'int', name: 'keyword_id', nullable: false})
    keywordId!: number;

    @PrimaryColumn({type: 'int', name: 'category_id', nullable: false})
    categoryId!: number;
}
