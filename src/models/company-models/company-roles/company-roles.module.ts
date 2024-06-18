import { Module } from '@nestjs/common';
import { CompanyRolesService } from './company-roles.service';
import { CompanyRolesController } from './company-roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyRole } from './entities/company-role.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyRole
    ])
  ],
  controllers: [CompanyRolesController],
  providers: [CompanyRolesService],
  exports: [CompanyRolesService]
})
export class CompanyRolesModule {}
