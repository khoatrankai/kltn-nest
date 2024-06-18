import { User } from "src/models/user-model/users/entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'theme_companies'
})
export class ThemeCompany {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        name: 'account_id'
    })
    accountId!: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    name!: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    description!: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    logo!: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    image!: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    link!: string;


    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'name_button'
    })
    nameButton!: string;

    @Column({
        type: 'timestamp',
        nullable: false,
        name: 'created_at'
    })
    createdAt!: Date;


    @Column({
        type: 'timestamp',
        nullable: false,
        name: 'updated_at'
    })
    updatedAt!: Date;

    @ManyToOne(() => User, user => user.themeCompanies)
    @JoinColumn({ name: 'account_id' })
    user!: User;
}
