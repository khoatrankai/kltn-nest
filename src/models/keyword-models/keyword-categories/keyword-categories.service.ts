import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KeywordCategory } from './entities/keyword-categories.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateKeywordCategoriesDto } from './dto/create-keyword-categories.dto';

@Injectable()
export class KeywordCategoriesService {
    constructor(
        @InjectRepository(KeywordCategory)
        private readonly keywordCategoryRepository: Repository<KeywordCategory>,
        private readonly globalEntityManager: EntityManager
    ) { }

    async create(createKeywordCategoriesDto: CreateKeywordCategoriesDto[], transactionalManager?: EntityManager) {
        const manager = transactionalManager ?? this.globalEntityManager;
        return await manager.save(createKeywordCategoriesDto);
    }

    /**
     * 
     * @param createKeywordCategoriesDto 
     * @param transactionalManager 
     * @returns 
     * 
     * @description
     * Create many keyword categories in a TRANSACTION
     * if transactionalManager is not passed, rollback all changes
     */
    async createMany(createKeywordCategoriesDto: CreateKeywordCategoriesDto[], transactionalManager?: EntityManager) {
        const manager = transactionalManager ?? this.globalEntityManager;
        return await manager.getRepository(KeywordCategory).save(createKeywordCategoriesDto);
    }

    // async findAll() {
    //     await this.keywordCategoryRepository.find();
    // }

    async deteleAllByKeywordId(keywordId: number) {
        await this.keywordCategoryRepository.delete({ keywordId });
    }

    async delete(keywordId: number, transactionalManager?: EntityManager) {
        const manager = transactionalManager ?? this.globalEntityManager;
        await manager.getRepository(KeywordCategory).delete({ keywordId });
    }
}
