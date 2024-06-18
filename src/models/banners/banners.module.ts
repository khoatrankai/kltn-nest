import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannersController } from './banners.controller';
import { BannersService } from './banners.service';
import {Banner} from './entities/banner.entity'
import { AWSConfigService } from 'src/config/storage/aws/config.service';
import { JwtAccessTokenService } from 'src/services/jwt/atk.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';

@Module({ 
    imports: [
        TypeOrmModule.forFeature([Banner]),
        JwtAccessTokenServiceModule
    ],
        
    controllers: [BannersController],
    providers: [BannersService, CloudinaryService, AWSConfigService, JwtAccessTokenService, JwtService],
    exports: [BannersService ]})
export class BannersModule {
    
}
