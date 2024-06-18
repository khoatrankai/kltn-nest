// configuration (redis/configuration.ts):

import { registerAs } from "@nestjs/config";

export default registerAs('redis', () => ({
    host: process.env["REDIS_HOST"],
    port: parseInt(process.env["REDIS_PORT"] as string, 10),
    // password: process.env["REDIS_PASSWORD"],
}));



