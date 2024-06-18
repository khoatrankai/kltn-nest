
import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { MariadbConfigService } from "src/config/database/mariadb/config.service";
import { MariadbConfigModule } from "src/config/database/mariadb/config.module";
import { DataSource } from "typeorm";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            // name: 'aiwork_gig_app',
            imports: [MariadbConfigModule],
            inject: [MariadbConfigService],
            // useClass: MariadbConfigService,
            useFactory: async (mariadbConfigService: MariadbConfigService) => ({
                type: 'mysql',
                host: mariadbConfigService.host,
                port: mariadbConfigService.port,
                username: mariadbConfigService.username,
                password: mariadbConfigService.password,
                database: mariadbConfigService.database,
                // synchronize: true,
                // autoLoadEntities: true,
                logging: mariadbConfigService.mode === 'development' ? true : false,
                entities: [...mariadbConfigService.entities],
                // entities: 
                // migrations: mariadbConfigService.migrations,
                // subscribers: mariadbConfigService.subscribers,
                // migrationsRun: mariadbConfigService.migrationsRun,
            } as TypeOrmModuleAsyncOptions),

            dataSourceFactory: async (options) => {
                const dataSource = await new DataSource(options as any).initialize();
                return dataSource;
              },
        }),
        
    ],
    providers: [MariadbConfigService],
    exports: [MariadbConfigService],
})

export class DatabaseConfigModule {}