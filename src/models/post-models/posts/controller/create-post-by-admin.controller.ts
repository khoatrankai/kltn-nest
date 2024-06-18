import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { CreatePostByAdminDto } from '../dto/admin-create-post.dto';
import { Response } from 'express';
import { PostsService } from '../posts.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { isArray } from 'class-validator';
import { PostNotificationsService } from 'src/models/notifications-model/post-notifications/post-notifications.service';
import { WardsService } from 'src/models/locations/wards/wards.service';

/**
 *
 * @param _createPostByAdminDto
 * @param req
 * @returns
 *
 * @description
 * create post by admin
 * save post to database -> post_id
 *
 * save images to aws s3 -> image_id
 */

@Injectable()
export class CreatePostByAdminController {

    postService: PostsService;
    req: CustomRequest;
    res: Response;

    constructor(
        private readonly postsService: PostsService,
        req: CustomRequest,
        res: Response,
        private readonly postNotification: PostNotificationsService,
        private readonly wardsService: WardsService,
    ) {
        this.postService = postsService;
        this.req = req;
        this.res = res;
    }

    async createPostByAdminController(params: {
        dto: CreatePostByAdminDto;
        images: Express.Multer.File[] | undefined;
    }) {
        const { dto, images } = params;
        const accessToken = 'pk.eyJ1IjoiaGJ0b2FuIiwiYSI6ImNsd29tc2h2NjFhOTEyaW54MmFnYWt3ZDQifQ.ljik1w_nZErIaDyhwXh68w';

        try {
            // validate dto
            const isValidDto = dto.validate();

            if (isValidDto instanceof Error) {
                return this.res.status(400).json({
                    statusCode: 400,
                    message: isValidDto.message,
                    error: isValidDto.name,
                });
            }

            // add user id to dto
            dto.addData(this.req.user!.id);

            const dataWard = await this.wardsService.findDistrictAndProvinceByWardId(dto.wardId);

            if (!dataWard) {
                return this.res.status(HttpStatus.BAD_REQUEST).json({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Ward not found',
                });
            }

            const nameWard = dataWard.fullName;
            const nameDistrict = dataWard.district.fullName;
            const nameProvince = dataWard.district.province.fullName;

            const address = `${dto.address}, ${nameWard}, ${nameDistrict}, ${nameProvince}, Vietnam`;

            // No need for location since it's not available in Node.js
            const url = new URL(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}/forward.json?access_token=${accessToken}`);

            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.features && data.features.length > 0) {
                        const firstFeature = data.features[0];
                        const coordinates = firstFeature.geometry.coordinates;
                        const longitude = coordinates[0];
                        const latitude = coordinates[1];
                        console.log('Location found:', longitude, latitude);
                        if (longitude && latitude) {
                            dto.longitude = longitude;
                            dto.latitude = latitude;
                        }
                    } else {
                        console.error('Location not found for the provided address.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching location:', error);
                });

            const postCreated = await this.postsService.create(dto);

            images && (await this.postsService.savePostImages(postCreated.id, images));

            await this.postsService.savePostResource(
                postCreated.id,
                dto.siteUrl,
                dto.companyResourceId,
            );

            await this.postsService.savePostCategories(
                postCreated.id,
                isArray(dto.categoriesId) ? dto.categoriesId : [dto.categoriesId],
            );

            this.postNotification.createWhenCreatePost(dto, postCreated.id);

            return this.res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                message: 'Create post successfully',
                data: postCreated,
            });

            // create post

        } catch (error: any) {
            console.log(error);
            return this.res.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Bad Request',
            });
        }
    }
}
