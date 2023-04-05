import { createTransport } from 'nodemailer';

const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    tls: {
        rejectUnauthorized: true,
    },
    auth: {
        user: process.env.EMAIL,
        pass: process.env.SENHA,
    },
});

export { transporter };