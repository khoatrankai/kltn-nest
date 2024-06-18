import { registerAs } from "@nestjs/config";


export default registerAs('node-mailer', () => ({
    host: process.env["NODE_MAILER_HOST"],
    port: parseInt(process.env["NODE_MAILER_PORT"] as string, 10),
    secure: process.env["NODE_MAILER_SECURE"],
    auth: {
        user: process.env["NODE_MAILER_EMAIL"],
        pass: process.env["NODE_MAILER_PASSWORD"],
    },
    // tls: {
    //     rejectUnauthorized: process.env["NODE_MAILER_TLS_REJECT_UNAUTHORIZED"],
    // },
    from: process.env["NODE_MAILER_NAME"],
    // to: process.env["NODE_MAILER_TO"],
    // subject: process.env["NODE_MAILER_SUBJECT"],
    // text: process.env["NODE_MAILER_TEXT"],
    // html: process.env["NODE_MAILER_HTML"],
}));