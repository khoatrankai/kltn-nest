import { Repository } from 'typeorm';
import { Post } from '../entities';
import { NewestPostQueriesDto } from '../dto/newest-queries.dto';

/**
 * @description
 * This class is used to build query for posts
 *
 * @return
 *
 */
export class PostsQueryBuilder {
    repository: Repository<Post>;

    fields: string[] = [
        'posts.id',
        'posts.title',
        'posts.accountId',
        'posts.companyName',
        'posts.address',
        'posts.description',
        'posts.salaryMin',
        'posts.salaryMax',
        'posts.moneyType',
        'posts.createdAt',
        'posts.createdAtDate',
        'posts.companyResourceId',
    ];

    statusCondition = `posts.status = 1`;
    expiredDateCondition = `(posts.expiredDate IS NULL OR posts.expiredDate >= NOW())`;
    endDateCondition = `(posts.end_date IS NULL OR posts.end_date >= UNIX_TIMESTAMP(CURRENT_TIMESTAMP()) * 1000)`;

    HBT_RESOURCE_ID = 2;

    constructor(repository: Repository<Post>, fields?: string[]) {
        this.repository = repository;
        if (fields) {
            this.fields = this.fields.concat(fields);
        }
    }

    /**
     * @description
     * init query builder
     */
    init() {
        return this.repository.createQueryBuilder('posts').select(this.fields);
    }

    /**
     * @description
     * Get newest posts
     * - Sort by createdAtDate desc
     * -> Sort by fileds (Posts from company resource id  from HBT will be first)
     * -> Sort by createdAt desc
     *
     * @param page
     * @param limit
     *
     */
    async getNewestPosts(
        _page: number,
        limit: number,
        _queries?: NewestPostQueriesDto,
        _threshold?: number,
    ): Promise<{ currentPage: number, totalPage: number, posts: Post[] }> {
        const currentPage = _page;

        const totalCountQuery = await this.repository.query(`
            SELECT COUNT(DISTINCT posts.id) AS count
            FROM posts USE INDEX(rev_id_idx)
            INNER JOIN wards ON wards.id = posts.ward_id ${_queries?.districtIds
                ? `AND wards.district_id IN (${_queries.districtIds})`
                : ''
            }
            INNER JOIN districts ON districts.id = wards.district_id ${_queries?.provinceId
                ? `AND districts.province_id = ${_queries.provinceId}`
                : ''
            }
            INNER JOIN posts_categories ON posts_categories.post_id = posts.id ${_queries?.childrenCategoryId
                ? `AND posts_categories.category_id IN (${_queries.childrenCategoryId})`
                : ''
            }
            INNER JOIN child_categories ON child_categories.id = posts_categories.category_id ${_queries?.parentCategoryId
                ? `AND child_categories.parent_category_id = ${_queries.parentCategoryId}`
                : ''
            }
            WHERE posts.status = 1
                AND (posts.expired_date IS NULL OR posts.expired_date >= NOW())
                AND (posts.end_date IS NULL OR posts.end_date >= UNIX_TIMESTAMP(CURRENT_TIMESTAMP()) * 1000)
        `);
        const totalCount = totalCountQuery[0].count;

        const totalPage = Math.ceil(totalCount / limit);

        const offset = limit * (currentPage);

        const listIds = await this.repository.query(`
            SELECT
                posts.id
            FROM posts USE INDEX(rev_id_idx)
            INNER JOIN wards ON wards.id = posts.ward_id ${_queries?.districtIds
                        ? `AND wards.district_id IN (${_queries.districtIds})`
                        : ''
                    }
            INNER JOIN districts ON districts.id = wards.district_id ${_queries?.provinceId
                        ? `AND districts.province_id = ${_queries.provinceId}`
                        : ''
                    }
            INNER JOIN posts_categories ON posts_categories.post_id = posts.id ${_queries?.childrenCategoryId
                        ? `AND posts_categories.category_id IN (${_queries.childrenCategoryId})`
                        : ''
                    }
            INNER JOIN child_categories ON child_categories.id = posts_categories.category_id ${_queries?.parentCategoryId
                        ? `AND child_categories.parent_category_id = ${_queries.parentCategoryId}`
                        : ''
                    }
            WHERE posts.status = 1
                AND (posts.expired_date IS NULL OR posts.expired_date >= NOW())
            GROUP BY posts.id
            ORDER BY posts.id desc
            LIMIT ${limit} OFFSET ${offset}
        `);


        if (!listIds.length) {
            return { currentPage, totalPage, posts: [] };
        }

        // Truy vấn và trả về các bài viết kèm theo currentPage, totalPage
        const posts = await this.init()
            .innerJoinAndSelect('posts.categories', 'categories')
            .innerJoinAndSelect('categories.parentCategory', 'parentCategory')
            .innerJoinAndSelect('posts.ward', 'ward')
            .innerJoinAndSelect('ward.district', 'district')
            .innerJoinAndSelect('district.province', 'province')
            .leftJoinAndSelect('posts.postImages', 'postImages')
            .innerJoinAndSelect('posts.jobTypeData', 'jobTypeData')
            .innerJoinAndSelect('posts.salaryTypeData', 'salaryTypeData')
            .innerJoinAndSelect('posts.companyResource', 'companyResource')
            .where(`posts.id IN (:...ids)`, {
                ids: listIds.map((item: any) => item.id),
            })
            .orderBy(
                `FIELD(posts.id, ${listIds.map((item: any) => item.id).join(',')})`,
            )
            .getMany();

        return { currentPage, totalPage, posts };
    }
}

export function InitQuerySelectNormallyPost(respository: Repository<Post>) {
    return respository
        .createQueryBuilder('posts')
        .select([
            'posts.id',
            'posts.title',
            'posts.accountId',
            'posts.companyName',
            'posts.description',
            'posts.address',
            'posts.salaryMin',
            'posts.salaryMax',
            'posts.createdAt',
            'posts.moneyType',
        ])
        .leftJoinAndSelect('posts.categories', 'categories')
        .leftJoinAndSelect('categories.parentCategory', 'parentCategory')
        .leftJoinAndSelect('posts.ward', 'ward')
        .leftJoinAndSelect('ward.district', 'district')
        .leftJoinAndSelect('district.province', 'province')
        .leftJoinAndSelect('posts.postImages', 'postImages')
        .leftJoinAndSelect('posts.jobTypeData', 'jobTypeData')
        .leftJoinAndSelect('posts.salaryTypeData', 'salaryTypeData')
        .leftJoinAndSelect('posts.companyResource', 'companyResource')
        // .leftJoinAndSelect('companyResource', 'companyResource')
        .where(`posts.status = 1`)
        .andWhere(`(posts.expiredDate IS NULL OR posts.expiredDate >= NOW())`)
        .andWhere(
            `(posts.end_date IS NULL OR posts.end_date >= UNIX_TIMESTAMP(CURRENT_TIMESTAMP()) * 1000)`,
        );
}
