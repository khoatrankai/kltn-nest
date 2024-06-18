import { registerAs } from "@nestjs/config";

/**
 * Aws configuration service
 */

export default registerAs('aws', () => ({
    accessId: process.env["AWS_ACCESS_KEY_ID"],
    secretKey: process.env["AWS_SECRET_ACCESS_KEY"],
    region: process.env["AWS_REGION"],
    bucket: process.env["AWS_BUCKET_NAME"],
    prefixUrl: process.env["AWS_BUCKET_PREFIX_URL"],
}));