import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostCategories } from './entities/posts-categories.entity';
import { Repository } from 'typeorm';
import { CreatePostCategoriesDto } from './dto/create-posts-categories.dto';

@Injectable()
export class PostsCategoriesService {
    constructor(
        @InjectRepository(PostCategories)
        private readonly postCategoriesRepository: Repository<PostCategories>,
    ) { }

    async create(dto: CreatePostCategoriesDto): Promise<PostCategories> {
        const newPostCategory = this.postCategoriesRepository.create(dto);
        return this.postCategoriesRepository.save(newPostCategory);
    }

    async createPostCategories(dto: CreatePostCategoriesDto[]): Promise<PostCategories[]> {
        const newPostCategories = dto.map((item) => {
            return this.postCategoriesRepository.create(item);
        });

        return this.postCategoriesRepository.save(newPostCategories);
    }
}
