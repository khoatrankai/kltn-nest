/**
 * Location translator
 * @param {ILocation, lang} location
 * @returns {} locationText
 * 
 * @example
 * lang = 'vi'
 * const location = {
 * "id": "01",
 * "name": "Hà Nội",
 * fullName: "Thành phố Hà Nội",
 * codeName: "ha_noi",
 * nameEn: "Ha Noi",
 * fullNameEn: "Ha Noi City",
 * }
 * return {
 * "id": "01",
 * fullName: "Thành phố Hà Nội",
 * }
 * 
 * 
*/
import { Language } from 'src/common/enum';
import { District } from 'src/models/locations/districts/entities';
import { Province } from 'src/models/locations/provinces/entities';
import { Ward } from 'src/models/locations/wards/entities';

class WardResponse {
    id!: string;
    fullName!: string;
    district?: DistrictResponse | null = null;
}

class DistrictResponse {
    id!: string;
    fullName!: string;

    province?: ProvinceResponse | null = null;
}

class ProvinceResponse {
    id!: string;
    fullName!: string;
}

export const locationTranslator = (
        location: Ward | District | Province,
        lang: Language
) => {
    // console.log('location', location);
    if (!location) return null;
    if (location instanceof Ward) {
        const ward = location as Ward;
        const wardResponse = new WardResponse();
        wardResponse.id = ward.id;
        wardResponse.fullName = lang === Language.VI ? ward.fullName : ward.fullNameEn;
        if (ward.district) {
            const district = ward.district;
            const districtResponse = new DistrictResponse();
            districtResponse.id = district.id;
            districtResponse.fullName = lang === Language.VI ? district.fullName : district.fullNameEn;
            if (district.province) {
                const province = district.province;
                const provinceResponse = new ProvinceResponse();
                provinceResponse.id = province.id;
                provinceResponse.fullName = lang === Language.VI ? province.fullName : province.fullNameEn;
                districtResponse.province = provinceResponse;
            }
            wardResponse.district = districtResponse;
        }
        return wardResponse;
    }
    if (location instanceof District) {
        const district = location as District;
        const districtResponse = new DistrictResponse();
        districtResponse.id = district.id;
        districtResponse.fullName = lang === Language.VI ? district.fullName : district.fullNameEn;
        if (district.province) {
            const province = district.province;
            const provinceResponse = new ProvinceResponse();
            provinceResponse.id = province.id;
            provinceResponse.fullName = lang === Language.VI ? province.fullName : province.fullNameEn;
            districtResponse.province = provinceResponse;
        }
        return districtResponse;
    }
    if (location instanceof Province) {
        const province = location as Province;
        const provinceResponse = new ProvinceResponse();
        provinceResponse.id = province.id;
        provinceResponse.fullName = lang === Language.VI ? province.fullName : province.fullNameEn;
        return provinceResponse;
    }
    return null;
}



