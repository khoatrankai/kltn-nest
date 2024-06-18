/**
 * @packageDocumentation
 * @module models.locations.wards
 * This file contains the serializer for the wards entity.
 * Use to transform the data before sending it to the client.
 * 
 * - Camel case to underscore case.
 * - Remove fields that are not supposed to be sent to the client.
 * - Language translation.
 */

import { Language } from "src/common/enum";
import { Ward } from "./entities";

/**
 * Ward serializer
 * 
 * @param Ward
 * @param lang
 * 
 * @returns
 * ```json
 * {
 *  "id": "string",
 * "full_name": "string",
 * "district_id": "string"
 * }
 * ```
 * Full name if the language is Vietnamese, otherwise full name in English.
 */

export class WardSerializer {
    id!: string;
    full_name!: string;
    district_id!: string;

    constructor(ward: Ward | null, lang: string) {
        this.id = ward?.id || '';
        this.full_name = lang === Language.VI ? ward?.fullName || '' : ward?.fullNameEn || '';
        this.district_id = ward?.districtId || '';
    }

    static serialize(ward: Ward | null, lang: string) {
        return new WardSerializer(ward, lang);
    }
}