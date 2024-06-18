import { Injectable } from '@nestjs/common';
// import { CreateUserHistoryDto } from './dto/create-user-history.dto';
// import { UpdateUserHistoryDto } from './dto/update-user-history.dto';

@Injectable()
export class UserHistoriesService {
  // create(createUserHistoryDto: CreateUserHistoryDto) {
  //   return 'This action adds a new userHistory';
  // }

  findAll() {
    return `This action returns all userHistories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userHistory`;
  }

  // update(id: number, updateUserHistoryDto: UpdateUserHistoryDto) {
  //   return `This action updates a #${id} userHistory`;
  // }

  remove(id: number) {
    return `This action removes a #${id} userHistory`;
  }
}
