import { ChildCategory } from "src/models/categories/children/entities/child.entity";
import { JobType } from "src/models/job-types/entities/job-type.entity";
import { Ward } from "src/models/locations/wards/entities";
import { PostImages } from "src/models/post-models/posts-images/entities/post-images.entity";
import { SalaryType } from "src/models/salary-types/entities/salary-type.entity";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostResource } from "../../post-resource/entities/post-resource.entity";
import { Bookmark } from "src/models/bookmarks/entities/bookmark.entity";
import { Company } from "src/models/company-models/companies/entities/company.entity";
import { Profile } from "src/models/profile-models/profiles/entities";
import { CompanyResource } from "src/models/company-resources/entities/company-resources.entity";
import { ViewJob } from "src/models/view-jobs/entities/view-job.entity";
import { User } from "src/models/user-model/users/entities";
import { Application } from "src/models/application-model/applications/entities/application.entity";
import { CvsPost } from "src/models/cvs-posts/entities/cvs-post.entity";


@Entity('posts')
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;
    
    @Column({ type: 'varchar', length: 50, name: 'account_id' })
    accountId!: string;

    @Column({ type: 'varchar', length: 255, name: 'title' })
    title!: string;

    @Column({ type: 'varchar', length: 255, name: 'company_name' })
    companyName!: string;

    @Column({ type: 'varchar', length: 255, name: 'address' })
    address!: string;

    @Column({ type: 'decimal', precision: 10, scale: 6, default: null, name: 'latitude' })
    latitude!: number;

    @Column({ type: 'decimal', precision: 10, scale: 6, default: null, name: 'longitude' })
    longitude!: number;

    @Column({ type: 'varchar', length: 20, name: 'ward_id' })
    wardId!: string;

    @Column({ type: 'tinyint', default: 0, name: 'is_date_period' })
    isDatePeriod!: number;

    @Column({ type: 'varchar', length: 20, default: null, name: 'start_date' })
    startDate!: string | null ;

    @Column({ type: 'varchar', length: 20, default: null, name: 'end_date' })
    endDate!: string | null;

    @Column({ type: 'varchar', length: 20, default: null, name: 'start_time' })
    startTime!: string;

    @Column({ type: 'varchar', length: 20, default: null, name: 'end_time' })
    endTime!: string;
    
    // @Column({ type: 'time', default: null, name: 'new_start_time' })
    // newStartTime!: string;

    // @Column({ type: 'time', default: null, name: 'new_end_time' })
    // newEndTime!: string;

    @Column({ type: 'tinyint', default: 0, name: 'is_working_weekend' })
    isWorkingWeekend!: number;

    @Column({ type: 'enum', enum:['0', '1'], default: '0', name: 'is_remotely' })
    isRemotely!: string;

    @Column({ type: 'double', default: 0, name: 'salary_min' })
    salaryMin!: number;

    @Column({ type: 'double', default: 0, name: 'salary_max' })
    salaryMax!: number;

    @Column({ type: 'int', default: 0, name: 'salary_type' })
    salaryType!: number;

    @Column({ type: 'enum', enum:['1', '2'], default: '1', name: 'money_type' })
    moneyType!: string;

    @Column({ type: 'varchar', length: 4000, default: null })
    description!: string;

    @Column({ type: 'varchar', length: 15, default: null, name: 'phone_contact' })
    phoneContact!: string | null;

    @Column({ type: 'varchar', length: 255, default: null, name: 'email' })
    email!: string | null;

    @Column({ type: 'enum', enum:['0', '1'], default: '0', name: 'is_inhouse_data' })
    isInHouseData!: string;

    @Column({ type: 'datetime', default: null, name: 'expired_date' })
    expiredDate!: Date | null;

    @Column({ type: 'tinyint', default: 0, name: 'job_type' })
    jobType!: number;

    @Column({ type: 'datetime', name: 'created_at', default: 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ type: 'tinyint', default: 0, name: 'created_at_date' })
    createdAtDate!: Date;

    @Column({ type: 'datetime', name: 'updated_at', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    @Column({ type: 'tinyint', default: 0, name: 'status' })
    status!: number;

    @Column({name: 'company_resource_id', default: 2, type: 'tinyint'})
    companyResourceId!: number;

    @Column({ type: 'varchar', length: 255, name: 'url', default: 'https://hbt.vn' })
    url!: string;

    @ManyToOne(() => CompanyResource, companyResource => companyResource.id)
    @JoinColumn({ name: 'company_resource_id' })
    companyResource!: CompanyResource;

    // Account relation
    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'account_id' })
    account!: User | undefined;

    // Category relation
    @ManyToMany(() => ChildCategory, childCategory => childCategory.posts)
    @JoinTable({
        name: 'posts_categories',
        joinColumn: {
            name: 'post_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'category_id',
            referencedColumnName: 'id'
        }
    })
    categories!: ChildCategory[];

    //Ward relation
    @ManyToOne(() => Ward, ward => ward.posts)
    @JoinColumn({ name: 'ward_id' })
    ward!: Ward;
    

    @OneToMany(() => PostImages, postImages => postImages.post)
    @JoinColumn({ name: 'id' })
    postImages: PostImages[] | undefined;

    @ManyToOne(() => JobType, jobType => jobType.posts)
    @JoinColumn({ name: 'job_type' })
    jobTypeData!: JobType;

    @ManyToOne(() => SalaryType, salaryType => salaryType.posts)
    @JoinColumn({ name: 'salary_type' })
    salaryTypeData!: SalaryType;

    @OneToOne(() => PostResource, postResource => postResource.post)
    @JoinColumn({ name: 'id' })
    postResource!: PostResource;
    
    @OneToMany(() => Bookmark, bookmark => bookmark.post)
    @JoinColumn({ name: 'id' })
    bookmarks: Bookmark[] | undefined;
    // companyResourceData: any;
    
    @ManyToOne(() => Company, company => company.posts)
    @JoinColumn({ name: 'account_id', referencedColumnName: 'accountId' })
    companyInformation!: Company;

    @ManyToOne(() => Profile, profile => profile.accountId)
    @JoinColumn({ name: 'account_id', referencedColumnName: 'accountId' })
    profile!: Profile;

    @OneToMany(() => ViewJob, viewJob => viewJob.post)
    viewJobs: ViewJob[] | undefined;

    @OneToMany(() => Application, application => application.post)
    applications: Application[] | undefined;

    @OneToMany(() => CvsPost, cvsPost => cvsPost.post)
    cvsPosts: CvsPost[] | undefined;
}
