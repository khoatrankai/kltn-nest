import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCandidateBookmarkDto } from './dto/create-candidate-bookmark.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CandidateBookmark } from './entities/candidate-bookmark.entity';
import { Repository } from 'typeorm';
import { ProfilesService } from '../profile-models/profiles/profiles.service';

@Injectable()
export class CandidateBookmarksService {
  constructor(
    @InjectRepository(CandidateBookmark)
    private readonly candidateBooKmarkedRepository: Repository<CandidateBookmark>,
    private readonly profileService: ProfilesService,
  ) {}
  async createCandidateBookmarked(
    createCandidateBookmarkDto: CreateCandidateBookmarkDto,
  ) {
    try {
      const candidate = await this.profileService.findOne(
        createCandidateBookmarkDto.candidateId,
      );

      if (!candidate) {
        throw new BadRequestException('Candidate not found');
      }

      const bookmarked = await this.candidateBooKmarkedRepository.findOne({
        where: {
          candidateId: createCandidateBookmarkDto.candidateId,
          recruitId: createCandidateBookmarkDto.recruitId,
        },
      });

      if (bookmarked) {
        await this.candidateBooKmarkedRepository.delete({
          candidateId: createCandidateBookmarkDto.candidateId,
          recruitId: createCandidateBookmarkDto.recruitId,
        });
        return;
      }

      const newCandidateBookmarked = this.candidateBooKmarkedRepository.create({
        candidateId: createCandidateBookmarkDto.candidateId,
        recruitId: createCandidateBookmarkDto.recruitId,
      });

      return await this.candidateBooKmarkedRepository.save(
        newCandidateBookmarked,
      );
    } catch (error) {
      throw error;
    }
  }

  async find(accountId: string, limit: number, page: number) {
    try {
      const query = this.candidateBooKmarkedRepository.createQueryBuilder('candidate_bookmarked')
      .leftJoinAndSelect('candidate_bookmarked.profile', 'profile')
      .leftJoinAndSelect('profile.childCategories', 'childCategory')
      .leftJoinAndSelect('profile.profilesEducations', 'profilesEducations')
      .leftJoinAndSelect('profile.profilesLocations', 'profilesLocations')
      .leftJoinAndSelect('childCategory.parentCategory', 'parentCategory')
      .leftJoinAndSelect('profilesEducations.academicType', 'academicType')
      .where('candidate_bookmarked.recruitId = :recruitId', { recruitId : accountId})
      .take(limit)
      .skip(page * limit);

      const check = await query.getCount()

      const data = await query.getMany()

      return {
        total : check,
        data,
        is_over: data.length === check ? true : data.length < limit ? true : false,
      }
    } catch (error) {
      throw error;
    }
  }
}
