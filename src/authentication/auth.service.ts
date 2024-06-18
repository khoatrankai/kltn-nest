import {  Injectable } from "@nestjs/common";
import { UserService } from "src/models/user-model/users/users.service";
// import { getMetadataArgsStorage } from "typeorm";
// import { SignInEmailDto } from "./dto/auth.dto";


@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }
    
    async signInEmail(email: string): Promise<any> {
        return await this.userService.findByEmail(email);
    }
}