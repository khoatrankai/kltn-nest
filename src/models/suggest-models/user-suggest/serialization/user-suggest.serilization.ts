import { Exclude, Expose } from 'class-transformer';
import { Profile } from 'src/models/profile-models/profiles/entities';
import { BUCKET_IMAGE_AVATAR } from 'src/common/constants/cloudinary.contrant';

export class UserSuggestSerialization extends Profile {
  constructor(profile: Profile) {
    super();
    Object.assign(this, profile);
  }

  @Exclude()
  override avatar!: string;

  @Expose()
  get avatarPath() {
    if (!this.avatar) return null;
    return `${BUCKET_IMAGE_AVATAR}/${this.avatar}`;
  }
}
