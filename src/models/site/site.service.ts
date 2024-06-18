import { Injectable } from '@nestjs/common';
import { DataSource, } from 'typeorm';

// import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class SiteService {
  constructor(private readonly dataSource: DataSource) {}

  // Count all posts
  async countAllPosts(): Promise<number> {
    const query = `
            SELECT
            COUNT(id) AS total
            FROM
            posts
        `;
    const result = await this.dataSource.query(query);
    // console.log(result[0].total);
    return +result[0].total;
  }

  // async getCvTemplates(parent_category_id?: number) {
  //   const query = `
  //     SELECT * FROM cv_template
  //     WHERE status = 1
  //     ${parent_category_id ? `AND parent_category_id = ${parent_category_id}` : ''}
  //   `

  //   const result = await this.dataSource.query(query);

  //   console.log(result);

  //   return result;
  // }
}
