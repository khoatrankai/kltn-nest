/**
 * @packageDocumentation
 * @module models.locations.districts
 * This file contains the serializer for the District entity.
 * Use to transform the data before sending it to the client.
 * 
 * - Camel case to underscore case.
 * - Remove fields that are not supposed to be sent to the client.
 * - Language translation.
 */

import { Language } from "src/common/enum";
import { District } from "./entities";

/**
 * District serializer
 * 
 * @param district
 * @param lang
 * 
 * @returns
 * ```json
 * {
 *  "id": "string",
 * "full_name": "string",
 * "province_id": "string"
 * }
 * ```
 * Full name if the language is Vietnamese, otherwise full name in English.
 */

export class DistrictSerializer {

    id!: string;
    full_name!: string;
    province_id!: string;

    constructor(district: District | null, lang: string) {
        this.id = district?.id || '';
        this.full_name = lang === Language.VI ? district?.fullName || '' : district?.fullNameEn || '';
        this.province_id = district?.provinceId || '';
    }

    static serialize(district: District | null, lang: string) {
        return new DistrictSerializer(district, lang);
    }
}