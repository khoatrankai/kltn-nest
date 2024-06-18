import { registerAs } from "@nestjs/config";


export default registerAs('database', () => ({
    type: process.env["DB_TYPE"],
    host: process.env["DB_HOST"],
    port: parseInt(process.env["DB_PORT"] as string, 10),
    username: process.env["DB_USERNAME"],
    password: process.env["DB_PASSWORD"],
    database: process.env["DB_DATABASE"],
    // synchronize: process.env.DB_SYNCHRONIZE,
    logging: process.env["DB_LOGGING"],
    mode: process.env["APP_ENV"],
    entities: [
        // process.env.DB_ENTITIES
    ],
    // migrations: [
    //     process.env.DB_MIGRATIONS
    // ],
    // subscribers: [
    //     process.env.DB_SUBSCRIBERS
    // ],
}));