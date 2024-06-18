import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/common/enum/role.enum";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        Logger.log('RoleGuard: canActivate');
        const roles = this.reflector.get<Role[]>('roles', context.getHandler());
        
        if (!roles) {
            Logger.log('RoleGuard: canActivate: !roles');
            throw new UnauthorizedException()
        }

        const request = context.switchToHttp().getRequest();

        const user = request.user;

        const hasRole = () => user.role && roles.includes(user.role);

        if (user && user.role && hasRole()) {

            Logger.log('RoleGuard: canActivate: ' + user.role + ' ' + user.id);
            return true;
        } else {
            Logger.log('RoleGuard: canActivate: else');
            // Permission denied
            throw new HttpException('Permission denied', HttpStatus.UNAUTHORIZED);
        }
    }

}