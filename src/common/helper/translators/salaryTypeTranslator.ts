import { SalaryType } from 'src/models/salary-types/entities/salary-type.entity';
import { Language } from 'src/common/enum';


export class SalaryTypeResponse {
    id!: number;
    fullName!: string;
}


export function salaryTypeTranslator(salaryType: SalaryType, lang: Language) {
    if (!salaryType) return null;
    const jobTypeResponse: SalaryTypeResponse = new SalaryTypeResponse();

    jobTypeResponse.id = salaryType.id;
    jobTypeResponse.fullName = 
        lang === Language.VI ? salaryType.value : 
        lang === Language.EN ? salaryType.valueEn : salaryType.valueKo;

    return jobTypeResponse;
}