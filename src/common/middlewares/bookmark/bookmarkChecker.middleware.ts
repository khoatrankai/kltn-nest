import { Injectable, NestMiddleware } from "@nestjs/common";
import { CustomRequest } from "src/common/interfaces/customRequest.interface";
import { BookmarksService } from "src/models/bookmarks/bookmarks.service";

@Injectable()   
export class BookmarksCheckerMiddleware implements NestMiddleware {

    constructor(
        private readonly bookmarksService: BookmarksService
    ) {}

    async use(req: CustomRequest, _res: any, next: () => void) {
        if (!req.user) {
            next();
        }

        const userId = req.user?.id || "";
        
        const list = await this.bookmarksService.findByUserId(userId);

        req['bookmarks'] = list;

        next();
    }
}