import { Module } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { ChildrenController } from './children.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildCategory } from './entities/child.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChildCategory
    ]),
    JwtAccessTokenServiceModule
  ],
  controllers: [ChildrenController],
  providers: [ChildrenService],
  exports: [ChildrenService]
})
export class ChildrenModule {}
