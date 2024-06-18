import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChildCategory } from './entities/child.entity';
import { Repository } from 'typeorm';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
// import { UpdateChildDto } from './dto/update-child.dto';

@Injectable()
export class ChildrenService {


  constructor( 
    @InjectRepository(ChildCategory)
    private readonly childRepository: Repository<ChildCategory>){}

  findAll() {
    return `This action returns all children`;
  }

  async create(createChildDto: CreateChildDto) {
    try {

      const create = this.childRepository.create(createChildDto);

      await this.childRepository.save(create) 

    } catch (error) {
      throw new Error('Error from server')
    }    
  }

  async findOne(id: number) {
    try {
      return await this.childRepository.findOne({where: {id: id}});
    } catch (error) {
      throw new Error('Error from server')
    }
  }

  async update(id: number, dto: UpdateChildDto) {
    try {
      const newUpdate = this.childRepository.create(dto);
      
      return this.childRepository.update(id, newUpdate)

    } catch (error) {
      throw new Error('Error updating child')
    }
  }

  remove(id: number) {
    return `This action removes a #${id} child`;
  }

  async getChildByIdParent(id: number) : Promise<ChildCategory[] | undefined> {
    const child = await this.childRepository.find({where: {parentCategoryId: id}})
    
    return child;
  }
}
