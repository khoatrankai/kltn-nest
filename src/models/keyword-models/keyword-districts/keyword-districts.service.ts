import { Injectable } from '@nestjs/common';
import { CreateKeywordDistrictDto } from './dto/create-keyword-district.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { KeywordDistrict } from './entities/keyword-districts.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class KeywordDistrictsService {  

    constructor(
        @InjectRepository(KeywordDistrict)
        private readonly keywordDistrictRepository: Repository<KeywordDistrict>,
        private readonly globalEntityManager: EntityManager

    ){}


    async create(createKeywordDistrictDto: CreateKeywordDistrictDto[]) {
        return await this.keywordDistrictRepository.save(createKeywordDistrictDto);
    }

    /**
     * 
     * @param createKeywordDistrictDto 
     * @param transactionalManager 
     * @returns 
     * 
     * @description
     * Create many keyword districts in a TRANSACTION
     * if transactionalManager is not passed, rollback all changes
     * if transactionalManager is passed, commit all changes
     */
    async createMany(createKeywordDistrictDto: CreateKeywordDistrictDto[], transactionalManager?: EntityManager) {
        const manager = transactionalManager ?? this.globalEntityManager;
        return await manager.getRepository(KeywordDistrict).save(createKeywordDistrictDto);
    }

    async findAll() {
        return this.keywordDistrictRepository.find();
    }


    async deteleAllByKeywordId(keywordId: number) {
        try {
            await this.keywordDistrictRepository.delete({keywordId})
        } catch (error) {
            throw new Error('Error')
        }
    }

    async delete(keywordId: number, transactionalManager?: EntityManager) {
        const manager = transactionalManager ?? this.globalEntityManager;
        await manager.getRepository(KeywordDistrict).delete({ keywordId });
    }
}
