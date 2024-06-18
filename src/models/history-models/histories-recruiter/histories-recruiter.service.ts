import { Injectable } from '@nestjs/common';
import { CreateHistoriesRecruiterDto } from './dto/create-histories-recruiter.dto';
import { UpdateHistoriesRecruiterDto } from './dto/update-histories-recruiter.dto';

@Injectable()
export class HistoriesRecruiterService {
  create(_createHistoriesRecruiterDto: CreateHistoriesRecruiterDto) {
    return 'This action adds a new historiesRecruiter';
  }

  findAll() {
    return `This action returns all historiesRecruiter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historiesRecruiter`;
  }

  update(id: number, _updateHistoriesRecruiterDto: UpdateHistoriesRecruiterDto) {
    return `This action updates a #${id} historiesRecruiter`;
  }

  remove(id: number) {
    return `This action removes a #${id} historiesRecruiter`;
  }
}
