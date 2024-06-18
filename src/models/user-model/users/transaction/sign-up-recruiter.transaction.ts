import { BaseTransaction } from 'src/providers/database/mariadb/transaction';
import { SignUpDto } from '../entities/sign-up.dto';
import { User } from '../entities';
import { DataSource, EntityManager } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Profile } from 'src/models/profile-models/profiles/entities';
import { RecruiterSignUpDto } from '../dto/recruiter-sign-up.dto';
import { Company } from 'src/models/company-models/companies/entities/company.entity';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { BUCKET_IMAGE_COMPANIES_LOGO_UPLOAD } from 'src/common/constants';

@Injectable()
export class SignUpRecruiterTransaction extends BaseTransaction<SignUpDto, User> {
    constructor(
        private readonly cloudinaryService: CloudinaryService,
        dataSource: DataSource,
    ) {
        super(dataSource);
    }
    protected async execute(
        recruiterSignUpDto: RecruiterSignUpDto,
        manager: EntityManager,
    ): Promise<any> {
        try {
            const dataAccount = await manager.findOne(User, {
                where: {
                    email: recruiterSignUpDto.email,
                },
            });

            if (dataAccount !== null) {
                throw new BadRequestException('Email already registered');
            }

            // Create new user
            const newUser = new User();
            newUser.email = recruiterSignUpDto.email;
            newUser.password = await bcrypt.hash(recruiterSignUpDto.password, 10);
            newUser.role = 3;

            const dataUser = await manager.save(newUser);

            // Create new user profile
            const newProfile = new Profile();
            newProfile.accountId = dataUser.id;
            newProfile.email = recruiterSignUpDto.email;
            newProfile.name = recruiterSignUpDto.name;

            await manager.save(newProfile);

            //   create companies
            const newCompany = manager.create(Company, {
                accountId: dataUser.id,
                name: recruiterSignUpDto.name,
                taxCode: recruiterSignUpDto.taxCode ? recruiterSignUpDto.taxCode : '',
                address: recruiterSignUpDto.address,
                phone: recruiterSignUpDto.phone,
                logo: '',
                description: recruiterSignUpDto.description,
                website: recruiterSignUpDto.website,
                companyRoleId: recruiterSignUpDto.companyRoleId,
                categoryId: recruiterSignUpDto.categoryId,
                email: recruiterSignUpDto.email,
            });

            const newDataCompany = await manager.save(Company, newCompany);

            // upload cloud

            const logoUploaded = await this.cloudinaryService.uploadImage(
                recruiterSignUpDto.logoFile,
                {
                    BUCKET: BUCKET_IMAGE_COMPANIES_LOGO_UPLOAD,
                    id: newDataCompany.id,
                },
            );

            await manager.update(Company, { id: newDataCompany.id }, { logo: logoUploaded });

            return dataUser;


        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
