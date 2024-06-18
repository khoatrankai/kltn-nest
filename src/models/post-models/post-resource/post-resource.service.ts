import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostResource } from './entities/post-resource.entity';
import { Repository } from 'typeorm';
import { CreatePostResourceDto } from './dto/create-post-resource.dto';

@Injectable()
export class PostResourceService {
    constructor(
        @InjectRepository(PostResource)
        private readonly postResourceRepository: Repository<PostResource>
    ) { }

    async create(dto: CreatePostResourceDto): Promise<PostResource> {
        return await this.postResourceRepository.save(dto);
    }
}
