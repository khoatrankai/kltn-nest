import { SetMetadata } from "@nestjs/common";
import { Role } from "src/common/enum";


export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);