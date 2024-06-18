import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

/**
 * Database configuration service
 * 
 * @class
 */

@Injectable()
export class MariadbConfigService {
    constructor(private mariadbConfig: ConfigService) {}

    get type(): string | undefined {
        return this.mariadbConfig.get<string>('database.type')
    }

    get host(): string | undefined {
        return this.mariadbConfig.get<string>('database.host')
    }

    get port(): number | undefined {
        return this.mariadbConfig.get<number>('database.port')
    }

    get username(): string | undefined {
        return this.mariadbConfig.get<string>('database.username')
    }

    get password(): string | undefined {
        return this.mariadbConfig.get<string>('database.password')
    }

    get database(): string | undefined {
        return this.mariadbConfig.get<string>('database.database')
    }

    get mode(): string | undefined {
        return this.mariadbConfig.get<string>('database.mode')
    }


    // get synchronize(): boolean {
    //     return this.mariadbConfig.get<boolean>('database.synchronize')
    // }

    get logging(): boolean | undefined {
        return this.mariadbConfig.get<boolean>('database.logging')
    }

    get entities(): string[] {
        // return this.mariadbConfig.get<string[]>('database.entities')
        return ['dist/**/*.entity{.ts,.js}']
    }

    // get migrations(): string[] {
    //     return this.mariadbConfig.get<string[]>('database.migrations')
    // }

    // get subscribers(): string[] {
    //     return this.mariadbConfig.get<string[]>('database.subscribers')
    // }

    // get migrationsRun(): boolean {
    //     return this.mariadbConfig.get<boolean>('database.migrationsRun')
    // }

    // get cli(): Record<string, any> {
    //     return this.mariadbConfig.get<Record<string, any>>('database.cli')
    // }
}