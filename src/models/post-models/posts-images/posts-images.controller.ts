import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsImagesService } from './posts-images.service';
import { CreatePostsImageDto } from './dto/create-posts-image.dto';
import { UpdatePostsImageDto } from './dto/update-posts-image.dto';

@Controller('posts-images')
export class PostsImagesController {
  constructor(private readonly postsImagesService: PostsImagesService) {}

  @Post()
  create(@Body() createPostsImageDto: CreatePostsImageDto) {
    return this.postsImagesService.create(createPostsImageDto);
  }

  @Get()
  findAll() {
    return this.postsImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostsImageDto: UpdatePostsImageDto) {
    return this.postsImagesService.update(+id, updatePostsImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsImagesService.remove(+id);
  }
}
