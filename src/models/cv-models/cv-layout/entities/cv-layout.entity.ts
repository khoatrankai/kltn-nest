import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'cv_layouts' })
export class CvLayout {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'int',
        nullable: false,
        name: 'cv_index'
    })
    cvIndex!: number;

    @Column({
        type: 'varchar',
        nullable: false,
        name: 'account_id',
        length: 50
    })
    accountId!: string;

    @Column({
        type: 'varchar',
        nullable: false,
        name: 'layout',
        length: 255
    })
    layout!: string;

    @Column({
        type: 'varchar',
        nullable: false,
        name: 'color',
        length: 255
    })
    color!: string;

    @Column({
        type: 'varchar',
        nullable: false,
        name: 'pad',
        length: 255
    })
    pad!: string;

    @Column({
        type: 'varchar',
        nullable: false,
        name: 'pad_part',
        length: 255
    })
    padPart!: string;

    @Column({
        type: 'varchar',
        nullable: false,
        name: 'color_text',
        length: 255
    })
    colorText!: string;

    @Column({
        type: 'varchar',
        nullable: false,
        name: 'color_topic',
        length: 255
    })
    colorTopic!: string;

    @Column({
        type: 'int',
        nullable: false,
        name: 'index_topic',
        default: 0
    })
    indexTopic!: number;
}
