import { registerAs } from "@nestjs/config";


export default registerAs('bull', () => ({
    redis: {
        host: process.env["BULL_REDIS_HOST"],
        port: parseInt(process.env["BULL_REDIS_PORT"] as string, 10),
        // password: process.env["BULL_REDIS_PASSWORD"],
    },
}));