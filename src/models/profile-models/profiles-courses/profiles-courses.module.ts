import { Module } from '@nestjs/common';
import { ProfilesCoursesService } from './profiles-courses.service';
import { ProfilesCoursesController } from './profiles-courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesCourse } from './entities/profiles-course.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfilesCourse]),
    JwtAccessTokenServiceModule
  ],
  controllers: [ProfilesCoursesController],
  providers: [ProfilesCoursesService],
  exports: [ProfilesCoursesService]
})
export class ProfilesCoursesModule {}
