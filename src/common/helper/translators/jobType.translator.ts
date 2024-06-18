import { Language } from 'src/common/enum';
import { JobType } from '../../../models/job-types/entities/job-type.entity';


export class JobTypeResponse {
    id!: number;
    fullName!: string;
}


export function jobTypeTranslator(jobType: JobType, lang: Language) {
    if (!jobType) return null;
    const jobTypeResponse: JobTypeResponse = new JobTypeResponse();

    jobTypeResponse.id = jobType.id;
    jobTypeResponse.fullName = 
        lang === Language.VI ? jobType.name : 
        lang === Language.EN ? jobType.nameEn : jobType.nameKo;

    return jobTypeResponse;
}