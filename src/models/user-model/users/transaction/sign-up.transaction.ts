import { BaseTransaction } from 'src/providers/database/mariadb/transaction';
import { SignUpDto } from '../entities/sign-up.dto';
import { User } from '../entities';
import { DataSource, EntityManager } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Profile } from 'src/models/profile-models/profiles/entities';

@Injectable()
export class SignUpTransaction extends BaseTransaction<SignUpDto, User> {
  constructor(
    dataSource: DataSource,
  ) {
    super(dataSource);
  }
  protected async execute(
    signUpDto: SignUpDto,
    manager: EntityManager,
  ): Promise<any> {
    try {
      const dataAccount = await manager.findOne(User, {
        where: {
          email: signUpDto.email,
        },
      });

      if (dataAccount !== null) {
        throw new BadRequestException('Email already registered');
      }

      // Create new user
      const newUser = new User();
      newUser.email = signUpDto.email;
      newUser.password = await bcrypt.hash(signUpDto.password, 10);
      newUser.role = 0;

      const dataUser = await manager.save(newUser);

      // Create new user profile
      const newProfile = new Profile();
      newProfile.accountId = dataUser.id;
      newProfile.email = signUpDto.email;
      newProfile.name = signUpDto.name;

      await manager.save(newProfile);

    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
