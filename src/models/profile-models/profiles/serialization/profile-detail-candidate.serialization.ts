import { Exclude, Expose, Transform } from 'class-transformer';
import { Profile } from '../entities';
import { BUCKET_CV, BUCKET_IMAGE_AVATAR } from 'src/common/constants';
import {
  categoryTranslator,
  genderTranslator,
  locationTranslator,
} from 'src/common/helper/translators';
import { Province } from 'src/models/locations/provinces/entities';
import { District } from 'src/models/locations/districts/entities';
import { Language } from 'src/common/enum';
import { ProfilesAwardSerialization } from '../../profiles-awards/serialization/profiles-award.serialization';
import { ProfilesAward } from '../../profiles-awards/entities/profiles-award.entity';
import { ProfilesCourse } from '../../profiles-courses/entities/profiles-course.entity';
import { ProfileCourseSerialization } from '../../profiles-courses/serialization/profiles-courses.serialization';
import { ProfilesActivity } from '../../profiles-activities/entities/profiles-activity.entity';
import { ProfilesActitvitesSerialization } from '../../profiles-activities/serialization/profiles-activities.serialization';
import { ProfilesIntership } from '../../profiles-interships/entities/profiles-intership.entity';
import { ProfilesIntershipSerialization } from '../../profiles-interships/serialization/profiles-interships.serialization';
import { ProfilesHobby } from '../../profiles-hobbies/entities/profiles_hobby.entity';
import { ProfilesHobbiesSerializtion } from '../../profiles-hobbies/serialization/profiles-hobbies.serialization';
import { ProfilesReference } from '../../profiles-references/entities/profiles-reference.entity';
import { ProfileReferenceSerialization } from '../../profiles-references/serializtion/profile-reference.serialization';
import { ProfilesSkill } from '../../profiles-skills/entities/profiles-skill.entity';
import { ProfileSkillSerialization } from '../../profiles-skills/serialization/profiles-skill.serialization';
import { ProfileLanguage } from '../../profile-languages/entities/profile-language.entity';
import { ProfileLanguageSerialization } from '../../profile-languages/serialization/profiles-language.serialization';
import { JobTypesSerialization } from 'src/models/job-types/serialization/job_types.serialization';
import { ProfilesCv } from '../../profiles-cvs/entities/profiles_cv.entity';
import { ProfilesCvsSerialization } from '../../profiles-cvs/serialization/profiles_cvs.serialization';
import { birthdayTraslator } from 'src/common/helper/translators/birthday.translator';
import { CandidateBookmark } from 'src/models/candidate-bookmarks/entities/candidate-bookmark.entity';

export class ProfileDetailCandidateSerialization extends Profile {
  @Exclude({ toPlainOnly: true })
  lang!: Language;

  @Exclude({ toPlainOnly: true })
  unlock!: boolean;

  constructor(profile: Profile, lang: Language, unlock: boolean = false) {
    super();
    this.lang = lang;
    this.unlock = unlock;
    Object.assign(this, profile);
  }

  // toPlainOnly: true => Exclude when transform to plain object

  // exclude address
  // return addressText
  @Exclude({ toPlainOnly: true })
  override address!: string;

  @Transform(({ value }) => (value ? value : 'Your name'))
  override name!: string;

  // exclude cvUrl
  // return cvUrlPath
  @Exclude({ toPlainOnly: true })
  override cvUrl!: string;

  // exclude avatar
  // return avatarPath
  @Exclude({ toPlainOnly: true })
  override avatar!: string;

  // exclude province
  // return addressText
  @Exclude({ toPlainOnly: true })
  override province!: Province;

  //exclude profilesLocations
  @Exclude({ toPlainOnly: true })
  override profilesLocations!: District[];

  @Exclude({ toPlainOnly: true })
  override childCategories!: any[];

  // Transform createdAt to timestamp
  @Transform(({ value }) => new Date(value).getTime())
  override createdAt!: Date;

  // Transform updatedAt to timestamp
  @Transform(({ value }) => new Date(value).getTime())
  override updatedAt!: Date;

  @Exclude({ toPlainOnly: true })
  override profilesAward!: ProfilesAward[];

  @Exclude({ toPlainOnly: true })
  override profilesCourse!: ProfilesCourse[];

  @Exclude({ toPlainOnly: true })
  override profilesActivity!: ProfilesActivity[];

  @Exclude({ toPlainOnly: true })
  override profilesIntership!: ProfilesIntership[];

  @Exclude({ toPlainOnly: true })
  override profilesHobby!: ProfilesHobby;

  @Exclude({ toPlainOnly: true })
  override profilesReference!: ProfilesReference[];

  @Exclude({ toPlainOnly: true })
  override profilesSkill!: ProfilesSkill[];

  @Exclude({ toPlainOnly: true })
  override profileLanguage!: ProfileLanguage[];

  @Exclude({ toPlainOnly: true })
  override jobType!: any;

  @Exclude({ toPlainOnly: true })
  override user!: any;

  @Exclude({ toPlainOnly: true })
  override profilesCv!: ProfilesCv[];

  // @Exclude({ toPlainOnly: true })
  // override phone!: string;

  // @Exclude({ toPlainOnly: true })
  // override email!: string;

  // @Exclude({ toPlainOnly: true })
  // override linkedin!: string;

  // @Exclude({ toPlainOnly: true })
  // override facebook!: string;

  // @Exclude({ toPlainOnly: true })
  // override birthday!: string;

  @Exclude({ toPlainOnly: true})
  override candidateBookmarked!: CandidateBookmark[]

  // expose addressText
  @Expose()
  get addressText() {
    if (!this.address) return null;
    return locationTranslator(this.province, this.lang);
  }

  @Expose()
  get cvUrlPath() {
    if (!this.cvUrl) return null;
    return `${BUCKET_CV}/${this.accountId}/${this.cvUrl}`;
  }

  @Expose()
  get genderText() {
    if (!this.gender) return null;
    return genderTranslator(this.gender, this.lang);
  }

  @Expose()
  get avatarPath() {
    if (!this.avatar) return null;
    return `${BUCKET_IMAGE_AVATAR}/${this.avatar}`;
  }

  @Expose()
  get profileLocations() {
    if (!this.profilesLocations) return null;
    return this.profilesLocations.map((profileLocation) => {
      return locationTranslator(profileLocation, this.lang);
    });
  }

  @Expose()
  get profileCategories() {
    if (!this.childCategories) return null;
    return this.childCategories.map((category) => {
      return categoryTranslator(category, this.lang);
    });
  }

  @Expose()
  get profileAwards() {
    if (!this.profilesAward) return null;
    return this.profilesAward.map((profileAward: ProfilesAward) => {
      return new ProfilesAwardSerialization(profileAward, this.lang);
    });
  }

  @Expose()
  get profileCourses() {
    if (!this.profilesCourse) return null;
    return this.profilesCourse.map((profileCourse: ProfilesCourse) => {
      return new ProfileCourseSerialization(profileCourse, this.lang);
    });
  }

  @Expose()
  get profileActivities() {
    if (!this.profilesActivity) return null;
    return this.profilesActivity.map((profileActivity: ProfilesActivity) => {
      return new ProfilesActitvitesSerialization(profileActivity, this.lang);
    });
  }

  @Expose()
  get profileInterships() {
    if (!this.profilesIntership) return null;
    return this.profilesIntership.map((profileIntership: ProfilesIntership) => {
      return new ProfilesIntershipSerialization(profileIntership, this.lang);
    });
  }

  @Expose()
  get profileHobbies() {
    if (!this.profilesHobby) return null;
    return new ProfilesHobbiesSerializtion(this.profilesHobby, this.lang);
  }

  @Expose()
  get profilesReferences() {
    if (!this.profilesReference) return null;
    return this.profilesReference.map((profileReference: ProfilesReference) => {
      return new ProfileReferenceSerialization(profileReference, this.lang);
    });
  }

  @Expose()
  get profilesSkills() {
    if (!this.profilesSkill) return null;
    return this.profilesSkill.map((profileSkills: ProfilesSkill) => {
      return new ProfileSkillSerialization(profileSkills, this.lang);
    });
  }

  @Expose()
  get profilesLanguages() {
    if (!this.profileLanguage) return null;
    return this.profileLanguage.map((profileLanguages: ProfileLanguage) => {
      return new ProfileLanguageSerialization(profileLanguages, this.lang);
    });
  }

  @Expose()
  get profilesJobType() {
    if (!this.jobType) return null;
    return new JobTypesSerialization(this.jobType, this.lang);
  }

  @Expose()
  get typeRoleData() {
    return this.user.type;
  }

  @Expose()
  get profilesCvs() {
    if (!this.profilesCv) return null;
    return this.profilesCv.map((profilesCv: ProfilesCv) => {
      return new ProfilesCvsSerialization(profilesCv, this.lang);
    });
  }

  @Expose()
  get phoneData() {
    return this.unlock ? this.phone : 'Unlock Candidates';
  }

  @Expose()
  get emailData() {
    return this.unlock ? this.email : 'Unlock Candidates';
  }

  @Expose()
  get linkedinData() {
    return this.unlock ? this.linkedin : 'Unlock Candidates';
  }

  @Expose()
  get facebookData() {
    return this.unlock ? this.facebook : 'Unlock Candidates';
  }

  @Expose()
  get birthdayData() {
    if (!this.birthday) return null;

    return this.unlock ? +this.birthday : birthdayTraslator(+this.birthday);
  }

  @Expose()
  get isBookmarked() {
    return (this.candidateBookmarked.length > 0)
  }
}
