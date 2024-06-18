import { Entity, PrimaryColumn } from "typeorm";

@Entity('keyword_districts')
export class KeywordDistrict {
    
    @PrimaryColumn({type: 'int', name: 'keyword_id', nullable: false})
    keywordId!: number;

    @PrimaryColumn({type: 'varchar', name: 'district_id', nullable: false})
    districtId!: string;
}
