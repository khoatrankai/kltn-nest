import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPhoneNumber,
    IsString,
    MaxLength,
    Min,
} from 'class-validator';
import { OneOfOptionalRequired, IsTimestamp } from 'src/common/decorators/validation';
import { Post } from '../entities';
import { IsArrayNumberOrNumber } from 'src/common/decorators/validation/isArrayNumberOrNumber.validator';

export abstract class CreatePostDto {
    accountId!: string;

    @ApiProperty({
        type: 'string',
        format: 'string',
        required: true,
        default: 'Test',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    title!: string;

    @ApiProperty({
        type: 'string',
        format: 'string',
        required: true,
        default: 'Test',
    })
    @IsString()
    @MaxLength(100)
    companyName!: string;

    @ApiProperty({
        type: 'string',
        format: 'string',
        required: true,
        default: '00001',
    })
    @IsString()
    wardId!: string;

    @ApiProperty({
        type: 'string',
        format: 'string',
        required: true,
        default: '79 Quoc Huong',
    })
    @IsString()
    @MaxLength(255)
    address!: string;

    @ApiProperty({ type: 'string', format: 'string', required: false })
    @IsOptional()
    @MaxLength(255)
    @IsEmail()
    email: string | null = null;

    @ApiProperty({ type: 'string', format: 'string', required: false })
    @IsOptional()
    @MaxLength(255)
    @IsPhoneNumber('VN')
    phone: string | null = null;

    @ApiProperty({ type: 'string', format: 'string', required: true })
    @IsString()
    @MaxLength(4000)
    description!: string;

    @ApiProperty({
        type: 'string',
        format: 'enum',
        required: true,
        enum: [1, 0],
        default: 0,
        description: '0: false, 1: true',
    })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @OneOfOptionalRequired([1, 0])
    isDatePeriod!: number; // only 0 or 1

    @ApiProperty({
        type: 'string',
        format: 'enum',
        required: true,
        enum: [1, 0],
        default: 0,
        description: '0: false, 1: true',
    })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @OneOfOptionalRequired([1, 0])
    isWorkingWeekend!: number;

    @ApiProperty({
        type: 'string',
        format: 'enum',
        required: true,
        enum: [1, 0],
        default: 0,
        description: '0: false, 1: true',
    })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @OneOfOptionalRequired([1, 0])
    isRemotely!: number;

    @ApiProperty({ type: 'string', format: 'number', required: false })
    @IsOptional()
    @IsTimestamp()
    startDate: number | null = null;

    @ApiProperty({ type: 'string', format: 'number', required: false })
    @IsOptional()
    @IsTimestamp()
    endDate: number | null = null;

    // new start time
    // format: hh:mm
    // @ApiProperty({
    //     type: 'string',
    //     format: 'string',
    //     pattern: '^[0-9]{2}:[0-9]{2}$',
    //     required: true,
    //     default: '00:00',
    // })
    // @IsString()
    // @MaxLength(5)
    // newStartTime!: string;

    // new end time
    // format: hh:mm
    // @ApiProperty({
    //     type: 'string',
    //     format: 'string',
    //     pattern: '^[0-9]{2}:[0-9]{2}$',
    //     required: true,
    //     default: '00:00',
    // })
    // @IsString()
    // @MaxLength(5)
    // newEndTime!: string;

    @ApiProperty({
        type: 'string',
        format: 'number',
        required: true,
        default: 57600000,
    })
    @IsTimestamp()
    startTime!: number;

    @ApiProperty({
        type: 'string',
        format: 'number',
        required: true,
        default: 57600000,
    })
    @IsTimestamp()
    endTime!: number;

    @ApiProperty({ type: 'number', format: 'number', required: true, default: 0 })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @Min(0)
    salaryMin!: number;

    @ApiProperty({ type: 'number', format: 'number', required: true, default: 0 })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @Min(0)
    salaryMax!: number;

    @ApiProperty({
        type: 'number',
        format: 'enum',
        required: true,
        enum: [1, 2, 3, 4, 5, 6],
        description:
            '1: Giờ, 2: Ngày, 3: Tuần, 4: Tháng, 5: Công Việc, 6: Thương Lượng',
    })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @OneOfOptionalRequired([1, 2, 3, 4, 5, 6])
    salaryType!: number;

    @ApiProperty({
        type: 'number',
        format: 'enum',
        required: true,
        enum: [1, 2],
        description: '1: VND, 2: USD',
    })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @OneOfOptionalRequired([1, 2])
    moneyType!: number;

    @ApiProperty({
        type: 'number',
        format: 'enum',
        required: true,
        enum: [1, 2, 4, 7],
        description: '1: Full',
    })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @OneOfOptionalRequired([1, 2, 4, 7])
    jobTypeId!: number;

    @ApiProperty({
        type: 'array',
        format: 'number',
        required: true,
        default: [400],
        description: '400: Nhân viên',
    })
    @IsArrayNumberOrNumber({ maxLength: 2, minLength: 1 })
    categoriesId!: number[] | number;


    @ApiProperty({
        type: 'file',
        format: 'binary',
        required: false,
        isArray: true,
    })
    @IsOptional()
    images?: string[] | [];




    validate(): any {
        if (this.isDatePeriod === 1) {
            if (!this.startDate || !this.endDate) {
                return new BadRequestException('Start date and end date are required when isDatePeriod is true');
            }

            if (this.startDate > this.endDate) {
                return new BadRequestException('Start date must be less than end date');
            }
        }
        
        if (this.salaryMax < this.salaryMin) {
            return new BadRequestException('Salary max must be greater than salary min');
        }
        return true
    }

    // add account id and images to dto
    addData(accountId: string): void {
        this.accountId = accountId;
    }
    toEntity(): Post {
        throw new Error('Method not implemented.');
    }
}
