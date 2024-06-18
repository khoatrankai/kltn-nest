import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "typeorm";

/**
 * @description
 * This interface is used to define the structure of a custom response
 * 
 * @useage
 * This interface is used in the following files:
 * - src/common/interceptors/response.interceptors.ts
 */

export interface ICustomResponse<T extends BaseEntity> {
    status: string,
    code: number,
    message: string,
    data: T | Array<T> | any,
    request: {
        api: string,
        method: string
    }
}
  
export type IResponse<T extends BaseEntity> = Promise<ICustomResponse<T>>;

type Constructor<T = {}> = new (...args: any[]) => T | Array<T> | any;

// This is a generic class that will be used to create a custom response
// Use for swagger documentation
export function CustomSuccessResponse<T extends Constructor>(Base: T, options?: { isArray?: boolean }) {
    class CustomSuccessResponseClass {
        @ApiProperty({ type: String })
        status: string | undefined;

        @ApiProperty({ type: Number })
        code: number | undefined;

        @ApiProperty({ type: String })
        message: string | undefined;

        @ApiProperty({ type: options?.isArray ? [Base] : Base, isArray: options?.isArray })
        data: T | Array<T> | any;

        @ApiProperty({ type: Object })
        request: {
            api: string;
            method: string;
        } | undefined
    }    

    return CustomSuccessResponseClass;
}

export function CustomErrorResponse() {
    class CustomErrorResponseClass {
        @ApiProperty({ type: String, example: 'error' })
        status: string | undefined;

        @ApiProperty({ type: Number, example: 500 })
        code: number | undefined;

        @ApiProperty({ type: String, example: 'Internal server error' })
        message: string | undefined;

        @ApiProperty({ type: Object, example: {}})
        data: any;

        @ApiProperty({ type: Object })
        request: {
            api: string;
            method: string;
        } | undefined
    }    

    return CustomErrorResponseClass;
}