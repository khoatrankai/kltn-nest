// import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
// import { Response } from 'express';
// import { PostsService } from '../posts.service';
// import { HttpStatus, Injectable } from '@nestjs/common';
// import { isArray } from 'class-validator';
// import { PostNotificationsService } from 'src/models/notifications-model/post-notifications/post-notifications.service';
// import { CreatePostByUserDto } from '../dto/user-create-post.dto';

// /**
//  *
//  * @param _createPostByAdminDto
//  * @param req
//  * @returns
//  *
//  * @description
//  * create post by admin
//  * save post to database -> post_id
//  *
//  * save images to aws s3 -> image_id
//  */

// @Injectable()
// export class CreatePostController {

//     postService: PostsService;
//     req: CustomRequest;
//     res: Response;

//     constructor(
//         private readonly postsService: PostsService,
//         req: CustomRequest,
//         res: Response,
//         private readonly postNotification: PostNotificationsService,
//     ) { 
//         this.postService = postsService;
//         this.req = req;
//         this.res = res;
//     }

//     async createPostController(params: {
//         dto: CreatePostByUserDto,
//         images: Express.Multer.File[] | undefined;
//     }) {
//         const { dto, images } = params;

//         const DEFAULT_COMPANY_RESOURCE_ID = 2;
//         const DEFAULT_URL = 'https://hbt.site';

//         try {
//             // validate dto
//             const isValidDto = dto.validate();
    
//             if (isValidDto instanceof Error) {
//                 return this.res.status(400).json({
//                     statusCode: 400,
//                     message: isValidDto.message,
//                     error: isValidDto.name,
//                 });
//             }
    
//             // add user id to dto
//             dto.addData(this.req.user!.id);
    
//             // create post
//             const postCreated = await this.postsService.create(dto);
    
//             images && (await this.postsService.savePostImages(postCreated.id, images));
    
//             await this.postsService.savePostResource(
//                 postCreated.id,
//                 DEFAULT_URL,
//                 DEFAULT_COMPANY_RESOURCE_ID,
//             );
    
//             await this.postsService.savePostCategories(
//                 postCreated.id,
//                 isArray(dto.categoriesId) ? dto.categoriesId : [dto.categoriesId],
//             );

//             this.postNotification.createWhenCreatePost(dto, postCreated.id);

//             return this.res.status(HttpStatus.CREATED).json({
//                 statusCode: HttpStatus.CREATED,
//                 message: 'Create post successfully',
//                 data: postCreated,
//             });
//         } catch (error: any) {
//             console.log(error);
//             return this.res.status(HttpStatus.BAD_REQUEST).json({
//                 statusCode: HttpStatus.BAD_REQUEST,
//                 message: 'Bad Request',
//             });
//         }
//     }
// }
 