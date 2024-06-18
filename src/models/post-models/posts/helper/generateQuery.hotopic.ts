import { BadRequestException } from "@nestjs/common";
import { QUERY_CHILDREN_CATEGORY_ID, QUERY_IS_REMOTELY, QUERY_IS_SHORT_TIME_JOBS, QUERY_IS_TODAY_JOBS, QUERY_JOB_TYPE, QUERY_LIST_CHILDREN_CATEGORY_ID } from "src/common/constants";
import { HotTopicQueriesDto } from "../dto/hot-topic-queries.dto";


const generateQuery = (id: number, provinceId?: string) => {
    let query: HotTopicQueriesDto = {};
    switch (id) {
        case 1:
          query[QUERY_CHILDREN_CATEGORY_ID] = "460"; //Influencer category
          break;
        case 2:
          query[QUERY_IS_REMOTELY] = "1"; //Remote job
          break;
        case 3:
          query[QUERY_IS_SHORT_TIME_JOBS] = 1; //Short time job
          break;
        case 4:
          query[QUERY_IS_TODAY_JOBS] = 1; //Today job
          break;
        case 5:
          query[QUERY_JOB_TYPE] = 4; //Freelance job
          break;
        case 6:
          query[QUERY_LIST_CHILDREN_CATEGORY_ID] = [394, 370]; //Delivery, Driver category
          break;
        default:
          throw new BadRequestException('Hot topic id is not valid');
      }

    // Add provinceId to query
    if (provinceId) {
      query.provinceId = provinceId;
    }
    
    return query;
}

export default generateQuery;