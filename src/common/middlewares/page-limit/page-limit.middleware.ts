import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';

@Injectable()
export class PageAndLimitMiddleware implements NestMiddleware {
    use(req: CustomRequest, res: Response , next: NextFunction): Response<any, Record<string, any>> | void {

        if (req.query['page']) {
            if (isNaN(Number(req.query['page']))) {
                return res.status(400).json({
                    status: 'error',
                    code: 400,
                    message: 'Page must be a number',
                    data: null,
                  })
            }

            if (!req.query['limit']){
                return res.status(400).json({
                    status: 'error',
                    code: 400,
                    message: 'Limit is required when page is provided',
                    data: null,
                }) 
            }
        }


        if (req.query['limit']) {
            if (isNaN(Number(req.query['limit']))) {
                return res.status(400).json({
                    status: 'error',
                    code: 400,
                    message: 'Limit must be a number',
                    data: null,
                  })
            }

            if (Number(req.query['limit']) > 20) {
                return res.status(400).json({
                    status: 'error',
                    code: 400,
                    message: 'Limit must be less than 20',
                    data: null,
                  })
            }
        }

        // Delete page and limit from query
        
        req.page = Number(req.query['page']) || 0;

        // Check if limit is over 20
        // If list is over 20, we will return 20 items and a boolean value to check if there are more items
        req.checkOverLimit = Number(req.query['limit']) || 20;
        
        req.limit = req.checkOverLimit + 1;

        // console.log("middleware", req.page, req.limit)
        
        delete req.query['page'];
        delete req.query['limit'];

        next();
    }


}