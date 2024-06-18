import { Injectable } from '@nestjs/common';
import { CreatePostsImageDto } from './dto/create-posts-image.dto';
import { UpdatePostsImageDto } from './dto/update-posts-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostImages } from './entities/post-images.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsImagesService {
  constructor(
    @InjectRepository(PostImages)
    private readonly postsImagesRepository: Repository<PostImages>,
  ) { }

  findAll() {
    return `This action returns all postsImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postsImage`;
  }

  update(id: number, _updatePostsImageDto: UpdatePostsImageDto) {
    return `This action updates a #${id} postsImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} postsImage`;
  }

  async create(dto: CreatePostsImageDto): Promise<PostImages> {
    const newPostImage = this.postsImagesRepository.create(dto);
    return this.postsImagesRepository.save(newPostImage);
  }

  async createPostImages(dto: CreatePostsImageDto[]): Promise<PostImages[]> {
    const newPostImages = dto.map((item) => {
      return this.postsImagesRepository.create(item);
    });

    return this.postsImagesRepository.save(newPostImages);
  }
}
