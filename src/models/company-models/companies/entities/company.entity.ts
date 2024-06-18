import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyRole } from '../../company-roles/entities/company-role.entity';
import { CompanySize } from '../../company-sizes/entities/company-size.entity';
import { Ward } from 'src/models/locations/wards/entities';
import { Profile } from 'src/models/profile-models/profiles/entities';
import { ParentCategory } from 'src/models/categories/parents/entities/parent.entity';
import { CompanyImage } from '../../company-images/entities/company-image.entity';
import { Post } from 'src/models/post-models/posts/entities';
import { FollowCompany } from '../../follow-companies/entities/follow-company.entity';
import { ViewProfile } from 'src/models/view_profiles/entities/view_profile.entity';
import { CompanyRating } from '../../company-ratings/entities/company-rating.entity';

@Entity('companies')
export class Company {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'varchar', length: 50, nullable: false, name: 'account_id', default: '' })
    accountId!: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    logo!: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name!: string;

    @Column({ type: 'varchar', length: 255, nullable: true, name: 'tax_code' })
    taxCode?: string | null;

    @Column({ type: 'varchar', length: 255, nullable: false })
    address!: string;

    @Column({ type: 'varchar', length: 20, nullable: false, name: 'ward_id' })
    wardId!: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    phone!: string;

    @Column({ type: 'tinyint', nullable: false, default: 0, name: 'is_active' })
    isActive!:number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    email!: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    website!: string;

    @Column({ type: 'varchar', length: 1000, nullable: false })
    description!: string;

    @Column({ type: 'tinyint', nullable: false, default: 1 })
    status!: number;

    @Column({
        type: 'tinyint',
        nullable: false,
        default: 1,
        name: 'company_role_id',
    })
    companyRoleId!: number;

    @Column({
        type: 'tinyint',
        nullable: false,
        default: 1,
        name: 'company_size_id',
    })
    companySizeId!: number;

    @Column({ type: 'int', nullable: false, default: 1, name: 'category_id' })
    categoryId!: number;

    @Column({
        type: 'datetime',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    createdAt!: Date;

    @Column({
        type: 'datetime',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updatedAt!: Date;

    @ManyToOne(() => CompanyRole, (companyRole) => companyRole.id)
    @JoinColumn({ name: 'company_role_id' })
    companyRole!: CompanyRole;

    @ManyToOne(() => CompanySize, (companySize) => companySize.id)
    @JoinColumn({ name: 'company_size_id' })
    companySize!: CompanySize;

    @ManyToOne(() => Ward, (ward) => ward.id)
    @JoinColumn({ name: 'ward_id' })
    ward!: Ward;

    @ManyToOne(() => ParentCategory, (parentCategory) => parentCategory.id)
    @JoinColumn({ name: 'category_id' })
    category!: ParentCategory;

    // @OneToOne()

    @OneToOne(() => Profile, (profile) => profile.accountId)
    @JoinColumn({ name: 'account_id', referencedColumnName: 'accountId' })
    profile!: Profile;

    @OneToMany(() => CompanyImage, (companyImage) => companyImage.company, {
        cascade: true,
    })
    @JoinColumn({ name: 'company_id' })
    companyImages!: CompanyImage[];

    @OneToMany(() => Post, (post) => post.companyInformation)
    @JoinColumn({ name: 'id' })
    posts!: Post[];

    @OneToMany(() => FollowCompany, (followCompany) => followCompany.company)
    @JoinColumn({ name: 'id', referencedColumnName: 'account_id' })
    followCompanies!: FollowCompany[];

    @OneToOne(() => ViewProfile, (viewProfile) => viewProfile.company)
    viewProfile!: ViewProfile;

    @OneToMany(() => CompanyRating, (companyRating) => companyRating.company)
    @JoinColumn({ name: 'id' })
    companyRatings!: CompanyRating[];

}
