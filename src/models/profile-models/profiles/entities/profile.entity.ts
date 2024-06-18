import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { ProfilesEducation } from '../../profiles-educations/entities/profiles-education.entity';
import { ProfilesExperiences } from '../../profiles-experiences/entities/profiles-experiences.entity';
import { ChildCategory } from 'src/models/categories/children/entities/child.entity';
import { District } from 'src/models/locations/districts/entities';
import { Company } from 'src/models/company-models/companies/entities/company.entity';
import { Province } from 'src/models/locations/provinces/entities';
import { CommunicationLike } from 'src/models/communication-models/communication-likes/entities/communication-like.entity';
import { CommunicationView } from 'src/models/communication-models/communication-views/entities/communication-view.entity';
import { Communication } from 'src/models/communication-models/communications/entities/communication.entity';
import { CommunicationComment } from 'src/models/communication-models/communication-comments/entities/communication-comment.entity';
import { ProfilesAward } from '../../profiles-awards/entities/profiles-award.entity';
import { ProfilesCourse } from '../../profiles-courses/entities/profiles-course.entity';
import { ProfilesActivity } from '../../profiles-activities/entities/profiles-activity.entity';
import { ProfilesIntership } from '../../profiles-interships/entities/profiles-intership.entity';
import { ProfilesHobby } from '../../profiles-hobbies/entities/profiles_hobby.entity';
import { ProfilesReference } from '../../profiles-references/entities/profiles-reference.entity';
import { ProfilesSkill } from '../../profiles-skills/entities/profiles-skill.entity';
import { ProfileLanguage } from '../../profile-languages/entities/profile-language.entity';
import { JobType } from 'src/models/job-types/entities/job-type.entity';
import { ProfilesCv } from '../../profiles-cvs/entities/profiles_cv.entity';
import { CandidateBookmark } from 'src/models/candidate-bookmarks/entities/candidate-bookmark.entity';
import { User } from 'src/models/user-model/users/entities';

@Entity('profiles') // table name
export class Profile {
  @PrimaryColumn({ type: 'varchar', length: 50, nullable: false, name: 'id' })
  accountId!: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  name!: string;

  @Column({ type: 'varchar', length: 20, nullable: false, name: 'birthday' })
  birthday!: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  address!: string;

  // @Transform(({ value }) => +value)
  @Column({ type: 'tinyint', nullable: false })
  gender!: number;

  @Column({ type: 'varchar', length: 500, nullable: false })
  introduction!: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  phone!: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  email!: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  facebook!: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  linkedin!: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  avatar!: string;

  @Column({ type: 'datetime', nullable: false, name: 'created_at' })
  createdAt!: Date;

  @Column({ type: 'datetime', nullable: false, name: 'updated_at' })
  updatedAt!: Date;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'cv_url' })
  cvUrl!: string;

  @Column({ type: 'tinyint', nullable: true, name: 'job_type_id' })
  jobTypeId!: number;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'job_name' })
  jobTypeName!: string;

  @Column({type: 'tinyint', nullable: false, name: 'is_search', default: 0})
  isSearch!:number;

  @Column({type: 'tinyint', nullable: false, name: 'point', default: 1})
  point!:number;

  @OneToMany(
    () => ProfilesEducation,
    (profilesEducation) => profilesEducation.profile,
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'accountId' })
  profilesEducations!: ProfilesEducation[];

  @OneToMany(
    () => ProfilesExperiences,
    (profilesExperiences) => profilesExperiences.profile,
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'accountId' })
  profilesExperiences!: ProfilesExperiences[];

  @ManyToMany(() => District, (district) => district.id)
  @JoinTable({
    name: 'profiles_locations',
    joinColumn: {
      name: 'account_id',
      referencedColumnName: 'accountId',
    },
    inverseJoinColumn: {
      name: 'location_id',
      referencedColumnName: 'id',
    },
  })
  profilesLocations!: District[];

  @ManyToMany(() => ChildCategory, (childCategory) => childCategory.id)
  @JoinTable({
    name: 'profiles_categories',
    joinColumn: {
      name: 'account_id',
      referencedColumnName: 'accountId',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  childCategories!: ChildCategory[];

  @OneToOne((_) => Company, (company) => company.profile)
  // @JoinColumn({ name: 'id', referencedColumnName: 'accountId' })
  company!: Company;

  @ManyToOne(() => JobType, (jobType) => jobType.id)
  @JoinColumn({ name: 'job_type_id', referencedColumnName: 'id' })
  jobType!: JobType;

  @ManyToOne(() => Province, (province) => province.id)
  @JoinColumn({ name: 'address', referencedColumnName: 'id' })
  province!: Province;

  @OneToMany(
    () => CommunicationLike,
    (communicationLike) => communicationLike.profile,
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'accountId' })
  communicationLikes!: CommunicationLike[];

  @OneToMany(
    () => CommunicationView,
    (communicationView) => communicationView.profile,
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'accountId' })
  communicationViews!: CommunicationView[];

  @OneToMany(() => Communication, (communication) => communication.profile)
  @JoinColumn({ name: 'id', referencedColumnName: 'accountId' })
  communications!: Communication[];

  @OneToMany(
    () => CommunicationComment,
    (commmunicationComment) => commmunicationComment.profile,
  )
  communicationComments!: CommunicationComment[];

  @OneToMany(() => ProfilesAward, (profilesAward) => profilesAward.profile)
  profilesAward!: ProfilesAward[];

  @OneToMany(() => ProfilesCourse, (profilesCourse) => profilesCourse.profile)
  profilesCourse!: ProfilesCourse[];

  @OneToMany(
    () => ProfilesActivity,
    (profilesActivity) => profilesActivity.profile,
  )
  profilesActivity!: ProfilesActivity[];

  @OneToMany(
    () => ProfilesIntership,
    (profilesIntership) => profilesIntership.profile,
  )
  profilesIntership!: ProfilesIntership[];

  @OneToOne(() => ProfilesHobby, (profilesHobby) => profilesHobby.profile)
  profilesHobby!: ProfilesHobby;

  @OneToMany(
    () => ProfilesReference,
    (profilesReference) => profilesReference.profile,
  )
  profilesReference!: ProfilesReference[];

  @OneToMany(() => ProfilesSkill, (profilesSkill) => profilesSkill.profile)
  profilesSkill!: ProfilesSkill[];

  @OneToMany(
    () => ProfileLanguage,
    (profileLanguage) => profileLanguage.profile,
  )
  profileLanguage!: ProfileLanguage[];

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  user!: User;

  // @OneToMany(() => ProfilesJob, (profilesJob) => profilesJob.profile)
  // profilesJob!: ProfilesJob[];

  @OneToMany(() => ProfilesCv, (profilesCv) => profilesCv.profile)
  profilesCv!: ProfilesCv[];

  @OneToMany(
    () => CandidateBookmark,
    (candidateBookmark) => candidateBookmark.profile,
  )
  candidateBookmarked!: CandidateBookmark[];
}
