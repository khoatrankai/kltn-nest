import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "../interfaces/users.interface";
import { Post } from "src/models/post-models/posts/entities/post.entity";
import { Bookmark } from "src/models/bookmarks/entities/bookmark.entity";
import { CommunicationBookmarked } from "src/models/communication-models/communication-bookmarked/entities/communication-bookmarked.entity";
import { Profile } from "src/models/profile-models/profiles/entities";
import { CompanyRating } from "src/models/company-models/company-ratings/entities/company-rating.entity";
import { ServiceHistory } from "src/models/service-model/service-history/entities/service-history.entity";
import { ThemeCompany } from "src/models/company-models/theme-companies/entities/theme-company.entity";


// The @Entity() decorator tells TypeORM that this class is an entity.
// The @PrimaryGeneratedColumn() decorator tells TypeORM that the id property will be generated automatically.
// The @Column() decorator tells TypeORM that the property will be a column in the database.
// The @CreateDateColumn() decorator tells TypeORM that the property will be a timestamp that will be set on creation.

// User Entity

@Entity('accounts')
export class User extends BaseEntity implements IUser {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    email!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    password!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    phone!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    gg_id?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    fb_id!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    apple_id!: string;

    @Column({ type: 'int', default: 0, nullable: true, name: 'is_active' })
    isActive!: number;

    @Column({ type: 'int', nullable: true })
    role!: number;

    @Column({ type: 'tinyint', nullable: true, default: 0 })
    type!: number;

    @Column({ type: 'tinyint', nullable: true, default: 1 })
    status!: number;

    @Column({ type: 'datetime', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @Column({ type: 'datetime', nullable: true, default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at!: Date;

    @OneToMany(() => Post, post => post.account)
    @JoinColumn({ name: 'account_id' })
    posts!: Post[];

    @OneToMany(() => Bookmark, bookmark => bookmark.user)
    @JoinColumn({ name: 'account_id' })
    bookmarks!: Bookmark[];

    @OneToMany(() => CommunicationBookmarked, communicationBookmarked => communicationBookmarked.user)
    @JoinColumn({ name: 'account_id' })
    communicationBookmarkeds!: CommunicationBookmarked[];

    @OneToOne(() => Profile, profile => profile.user)
    @JoinColumn({ name: 'id', referencedColumnName: 'accountId' })
    profile!: Profile

    @OneToMany(() => CompanyRating, companyRating => companyRating.account)
    companyRatings!: CompanyRating[];

    @OneToMany(() => ServiceHistory, serviceHistory => serviceHistory.account)
    serviceHistories!: ServiceHistory[];

    @OneToMany(() => ThemeCompany, themeCompany => themeCompany.user)
    themeCompanies!: ThemeCompany[];
}