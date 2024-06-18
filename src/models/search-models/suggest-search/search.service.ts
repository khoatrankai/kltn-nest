import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuggestSearch } from './entities/search.entity';
import { Repository } from 'typeorm';
import { CreateSuggestSearchDto } from './dto/create-search.dto';
import { UpdateSuggestSearchDto } from './dto/update-search.sto';

@Injectable()
export class SearchService {
    constructor(
        @InjectRepository(SuggestSearch)
        private readonly searchRepository: Repository<SuggestSearch>,
    ) { }
    
    async search() {
        return this.searchRepository
        .createQueryBuilder('suggest_search')
        .select([
            'suggest_search.id', 
            'suggest_search.keyword', 
            'suggest_search.status',
            'suggest_search.order',
            'suggest_search.createdAt', 
            'suggest_search.updatedAt'
        ])
        .orderBy('suggest_search.order', 'ASC')
        .getMany();
    }

    async create(createSearch : CreateSuggestSearchDto) {
        try {

            const search = this.searchRepository.create(createSearch);

            return await this.searchRepository.save(search);
        } catch (error) {
            throw new Error('Error creating search')
        }
    }

    async update(id : number, update: UpdateSuggestSearchDto) {
        const newUpdate = this.searchRepository.create(update);
        return this.searchRepository.update(id, newUpdate)
    }

    async searchById(idNumber: number) {

        const search = await this.searchRepository.findOne({where: {id: idNumber}})

        if (!search) {
            throw new NotFoundException('Search suggest not found');
        }

        return search;
    }
}
