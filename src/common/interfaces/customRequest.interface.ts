import { Request } from 'express';
import { JwtPayload } from './jwtPayload.interface';
import { Bookmark } from 'src/models/bookmarks/entities/bookmark.entity';
import { Language } from '../enum';

export interface CustomRequest extends Request {
    // Add custom properties here
    sort?:string;

    type: number;

    unlock?:string;

    cvIndex?:string;

    // default language is Vietnamese
    lang: Language;

    user: JwtPayload | undefined;

    page?: number;

    limit?: number;

    checkOverLimit?: number;

    bookmarks?: Bookmark[] | undefined;
}