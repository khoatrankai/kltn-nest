import { ApiProperty } from '@nestjs/swagger';
import {
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { IsTimestamp } from 'src/common/decorators/validation';
import { Post } from '../entities';
import { CreatePostDto } from './create-post.dto';

export class CreatePostByAdminDto extends CreatePostDto {
    @ApiProperty({ type: 'string', format: 'string', required: false })
    @IsOptional()
    @IsTimestamp()
    expiredDate!: Date | null;

    @ApiProperty({ type: 'string', format: 'string', required: true })
    // @IsOptional()
    @IsString()
    siteUrl!: string;

    @ApiProperty({ type: 'number', format: 'binary', required: true, default: 0 })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    companyResourceId!: number;

    @ApiProperty({
        type: 'decimal',
        format: 'decimal',
        required: true,
        default: 0,
    })
    @IsOptional()
    @IsNumber()
    latitude!: number;

    @ApiProperty({
        type: 'decimal',
        format: 'decimal',
        required: true,
        default: 0,
    })
    @IsOptional()
    @IsNumber()
    longitude!: number;


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
        post.startTime = this.startTime?.toString();
        post.endTime = this.endTime?.toString();
        // post.startTime = (61200000 + this.newStartTime.split(':').reduce((acc, cur) => acc * 60 + +cur, 0) * 60000).toString();
        // post.endTime = (61200000 + this.newEndTime.split(':').reduce((acc, cur) => acc * 60 + +cur, 0) * 60000).toString();
        // post.newStartTime = this.newStartTime;
        // post.newEndTime = this.newEndTime;
        post.salaryMin = this.salaryMin;
        post.salaryMax = this.salaryMax;
        post.salaryType = this.salaryType;
        post.moneyType = this.moneyType.toString();
        post.jobType = this.jobTypeId;
        post.expiredDate = this.expiredDate ? new Date(+this.expiredDate) : null;
        post.isInHouseData = '1';
        post.status = 1;
        post.url = this.siteUrl;
        post.companyResourceId = this.companyResourceId;
        post.latitude = this.latitude;
        post.longitude = this.longitude;
        // post.images = this.images;

        return post;
    }
}
