import { Repository } from 'typeorm/repository/Repository';
import { InitQuerySelectNormallyPost } from './_common.repository';
import { Post } from '../entities';
import {
    QUERY_CHILDREN_CATEGORY_ID,
    QUERY_IS_REMOTELY,
    QUERY_IS_SHORT_TIME_JOBS,
    QUERY_IS_TODAY_JOBS,
    QUERY_JOB_TYPE,
    QUERY_LIST_CHILDREN_CATEGORY_ID,
    QUERY_PARENT_CATEGORY_ID,
} from 'src/common/constants';
import { HotTopicQueriesDto } from '../dto/hot-topic-queries.dto';

function __init__(respository: Repository<Post>, query: HotTopicQueriesDto) {
    const queryBuilder = InitQuerySelectNormallyPost(respository);

    if (query[QUERY_CHILDREN_CATEGORY_ID]) {
        queryBuilder.andWhere(`categories.id = :${QUERY_CHILDREN_CATEGORY_ID}`, {
            [QUERY_CHILDREN_CATEGORY_ID]: query[QUERY_CHILDREN_CATEGORY_ID],
        });
    }

    if (query[QUERY_PARENT_CATEGORY_ID]) {
        queryBuilder.andWhere(
            `categories.parentCategoryId = :${QUERY_PARENT_CATEGORY_ID}`,
            { [QUERY_PARENT_CATEGORY_ID]: query[QUERY_PARENT_CATEGORY_ID] },
        );
    }

    if (query[QUERY_IS_REMOTELY]) {
        queryBuilder.andWhere(`posts.isRemotely = :${QUERY_IS_REMOTELY}`, {
            [QUERY_IS_REMOTELY]: String(query[QUERY_IS_REMOTELY]),
        });
    }

    if (query[QUERY_IS_SHORT_TIME_JOBS] === 1) {
        queryBuilder.andWhere(`posts.start_date IS NOT NULL`);
    }

    if (query[QUERY_IS_TODAY_JOBS] === 1) {
        queryBuilder.andWhere(`posts.createdAt >= :today`, {
            today: new Date().toISOString().split('T')[0],
        });
    }

    if (query[QUERY_JOB_TYPE] !== undefined && query[QUERY_JOB_TYPE] !== null) {
        queryBuilder.andWhere(`posts.jobType = :${QUERY_JOB_TYPE}`, {
            [QUERY_JOB_TYPE]: query[QUERY_JOB_TYPE],
        });
    }

    if (query[QUERY_LIST_CHILDREN_CATEGORY_ID]) {
        queryBuilder.andWhere(
            `categories.id IN (:...${QUERY_LIST_CHILDREN_CATEGORY_ID})`,
            {
                [QUERY_LIST_CHILDREN_CATEGORY_ID]:
                    query[QUERY_LIST_CHILDREN_CATEGORY_ID],
            },
        );
    }

    if (query.provinceId) {
        queryBuilder.andWhere(`province.id = :provinceId`, {
            provinceId: query.provinceId,
        });
    }

    return queryBuilder;
}

export function countByHotTopicQuery(
    respository: Repository<Post>,
    query: HotTopicQueriesDto,
) {
    const queryBuilder = __init__(respository, query);
    return queryBuilder.getCount();
}

export async function findByHotTopicQuery(
    respository: Repository<Post>,
    query: HotTopicQueriesDto,
    page: number,
    limit: number,
) {
    const queryBuilder = __init__(respository, query);
    const data = await queryBuilder
        .orderBy('posts.createdAt', 'DESC')
        .skip(page * limit)
        .take(limit)
        .getMany();

    const total = await queryBuilder.getCount();

    return {
        data,
        total,
    };


}
