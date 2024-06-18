import { HotTopic } from '../entities/hot-posts.entity';
import generateQuery from 'src/models/post-models/posts/helper/generateQuery.hotopic';
import { HotTopicQueriesDto } from 'src/models/post-models/posts/dto/hot-topic-queries.dto';
import { QUERY_LIST_CHILDREN_CATEGORY_ID } from 'src/common/constants';

export class HotTopicSerializer {
    id!: number;
    title!: string;
    type!: number;
    image!: string;
    themeId!: number;
    query!: HotTopicQueriesDto;
    count!: number;
    api!: string;

    constructor(partial: Partial<HotTopicSerializer>) {
        Object.assign(this, partial);
    }

    static from(dto: Partial<HotTopicSerializer>) {
        return new HotTopicSerializer(dto);
    }

    static fromEntity(entity: HotTopic) {
        return this.from({
            id: entity.id,
            type: entity.type,
            title: entity.title,
            image: entity.image,
            themeId: entity.themeId,
            query: entity.id !== 6 ? [generateQuery(entity.id)] : [{[QUERY_LIST_CHILDREN_CATEGORY_ID]: "394,370"}],
            api: `/api/v3/posts/topic/${entity.id}`,
        });
    }
}
