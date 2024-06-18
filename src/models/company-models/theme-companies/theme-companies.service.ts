import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateThemeCompanyDto } from './dto/create-theme-company.dto';
import { UpdateThemeCompanyDto } from './dto/update-theme-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ThemeCompany } from './entities/theme-company.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { BUCKET_IMAGE_THEME_COMPANIES, BUCKET_IMAGE_THEME_COMPANIES_LOGO, BUCKET_IMAGE_THEME_COMPANIES_LOGO_UPLOAD, BUCKET_IMAGE_THEME_COMPANIES_UPLOAD } from 'src/common/constants/cloudinary.contrant';

@Injectable()
export class ThemeCompaniesService {
  constructor(
    @InjectRepository(ThemeCompany)
    private themeCompanyRepository: Repository<ThemeCompany>,
    private readonly cloudinaryService: CloudinaryService,
  ) { }
  async create(createThemeCompanyDto: CreateThemeCompanyDto) {
    try {
      if (createThemeCompanyDto.logoData) {
        const logoUploaded = await this.cloudinaryService.uploadImage(
          createThemeCompanyDto.logoData,
          {
            BUCKET: BUCKET_IMAGE_THEME_COMPANIES_LOGO_UPLOAD,
            id: createThemeCompanyDto.accountId,
          },
        );

        createThemeCompanyDto.logo = logoUploaded;
      }

      if (createThemeCompanyDto.imageData) {
        const imageUploaded = await this.cloudinaryService.uploadImage(
          createThemeCompanyDto.imageData,
          {
            BUCKET: BUCKET_IMAGE_THEME_COMPANIES_UPLOAD,
            id: createThemeCompanyDto.accountId,
          },
        );

        createThemeCompanyDto.image = imageUploaded;
      }

      delete createThemeCompanyDto.logoData;
      delete createThemeCompanyDto.imageData;

      const newThemeCompany = this.themeCompanyRepository.create(createThemeCompanyDto);

      const data = await this.themeCompanyRepository.save(newThemeCompany);

      return data;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const themeCompanies = await this.themeCompanyRepository.find({
        relations: ['user', 'user.serviceHistories'],
      });

      const currentTime = new Date();
      const companiesWithServiceStatus: any = [];

      themeCompanies.forEach(company => {
        const activeServiceTypes: any = [];
        const expiredServiceTypes: any = [];

        company.user.serviceHistories.forEach(history => {
          const expirationDate = new Date(history.createdAt);
          expirationDate.setDate(expirationDate.getDate() + history.serviceExpiration);

          const isActive = expirationDate > currentTime;

          if (isActive) {
            activeServiceTypes.push(history.serviceType);
          } else {
            expiredServiceTypes.push(history.serviceType);
          }
        });

        companiesWithServiceStatus.push({
          id: company.id,
          name: company.name,
          description: company.description,
          logo: `${BUCKET_IMAGE_THEME_COMPANIES_LOGO}/${company.user.id}/${company.logo}`,
          image: `${BUCKET_IMAGE_THEME_COMPANIES}/${company.user.id}/${company.image}`,
          link: company.link,
          nameButton: company.nameButton,
          createdAt: new Date(company.createdAt).getTime(),
          updatedAt: new Date(company.updatedAt).getTime(),
          accountId: company.user.id,
          isServiceActive: activeServiceTypes.length > 0, 
          activeServiceTypes: [...new Set(activeServiceTypes)],
          expiredServiceTypes: [...new Set(expiredServiceTypes)],
        });
      });

      companiesWithServiceStatus.sort((a: any, b: any) => {
        if (a.isServiceActive && !b.isServiceActive) return -1;
        if (!a.isServiceActive && b.isServiceActive) return 1;
        return 0;
      });

      return companiesWithServiceStatus.slice(0, 5);
    } catch (error) {
      throw error;
    }
  }
  async findOne(accountId: string) {
    try {
      return await this.themeCompanyRepository.findOne({
        where: { accountId },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, _updateThemeCompanyDto: UpdateThemeCompanyDto) {
    try {
      const themeCompany = await this.themeCompanyRepository.findOne({
        where: { id },
      });

      if (!themeCompany) {
        throw new BadRequestException('Theme company not found');
      }

      if (_updateThemeCompanyDto.logoData) {
        const logoUploaded = await this.cloudinaryService.uploadImage(
          _updateThemeCompanyDto.logoData,
          {
            BUCKET: BUCKET_IMAGE_THEME_COMPANIES_LOGO_UPLOAD,
            id: themeCompany.accountId,
          },
        );

        _updateThemeCompanyDto.logo = logoUploaded;
      }

      if (_updateThemeCompanyDto.imageData) {
        const imageUploaded = await this.cloudinaryService.uploadImage(
          _updateThemeCompanyDto.imageData,
          {
            BUCKET: BUCKET_IMAGE_THEME_COMPANIES_UPLOAD,
            id: themeCompany.accountId,
          },
        );

        _updateThemeCompanyDto.image = imageUploaded;
      }

      delete _updateThemeCompanyDto.logoData;
      delete _updateThemeCompanyDto.imageData;

      const data = await this.themeCompanyRepository.update({ id }, _updateThemeCompanyDto);

      return data;

    } catch (error) {
      throw error;
    }
  }
}
