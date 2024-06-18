import { BaseEntity, Column, PrimaryColumn } from "typeorm";
import { ILocation } from "./location.interface";

export class Location extends BaseEntity implements ILocation {
    @PrimaryColumn('varchar', { length: 20 })
    id!: string;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @Column({ type: 'varchar', length: 255, name: 'full_name' })
    fullName!: string;

    @Column({ type: 'varchar', length: 255, name: 'code_name', nullable: true })
    codeName?: string;

    @Column({ type: 'varchar', length: 255, name: 'name_en' })
    nameEn!: string;

    @Column({ type: 'varchar', length: 255, name: 'full_name_en' })
    fullNameEn!: string;
}