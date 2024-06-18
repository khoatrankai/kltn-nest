import { IsEmail, IsNotEmpty } from "class-validator";

export class AdsMailOptionsDto {
    @IsNotEmpty()
    @IsEmail()
    to!: string;

    // @IsNotEmpty()
    // @IsString()
    // name: string;

    // @IsNotEmpty()
    // @IsString()
    // content: string;

    // @IsNotEmpty()
    // @IsString()
    // link: string;
    [key: string]: any;
}
