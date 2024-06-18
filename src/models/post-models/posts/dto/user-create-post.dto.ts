import { Post } from "../entities";
import { CreatePostDto } from "./create-post.dto";

export class CreatePostByUserDto extends CreatePostDto {

    override toEntity(): Post {
        const post = new Post();
        post.accountId = this.accountId;
        post.title = this.title;
        post.companyName = this.companyName;
        post.wardId = this.wardId;
        post.address = this.address;
        post.email = this.email;
        post.phoneContact = this.phone;
        post.description = this.description;
        post.isDatePeriod = this.isDatePeriod;
        post.isWorkingWeekend = this.isWorkingWeekend;
        post.isRemotely = this.isRemotely.toString();
        post.startDate = this.startDate?.toString() || null;
        post.endDate = this.endDate?.toString() || null;
        // post.startTime = (61200000 + this.newStartTime.split(':').reduce((acc, cur) => acc * 60 + +cur, 0) * 60000).toString();
        // post.endTime = (61200000 + this.newEndTime.split(':').reduce((acc, cur) => acc * 60 + +cur, 0) * 60000).toString();
        // post.newStartTime = this.newStartTime;
        // post.newEndTime = this.newEndTime;
        post.salaryMin = this.salaryMin;
        post.salaryMax = this.salaryMax;
        post.salaryType = this.salaryType;
        post.moneyType = this.moneyType.toString();
        post.jobType = this.jobTypeId;
        post.isInHouseData = '0';
        post.status = 1;

        return post;
    }
}