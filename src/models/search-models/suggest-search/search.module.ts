import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { SuggestSearch } from './entities/search.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';

@Module(
    {
    imports: [
        TypeOrmModule.forFeature([SuggestSearch]),
        JwtAccessTokenServiceModule
    ],
    controllers: [SearchController],
    providers: [SearchService],
    exports: [SearchService]})
export class SearchModule {
    
}
