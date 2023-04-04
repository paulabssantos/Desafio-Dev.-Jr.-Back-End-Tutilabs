import { createTransport } from 'nodemailer';

const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    tls: {
        rejectUnauthorized: true,
    },
    auth: {
        user: 'pb.santos@icomp.ufam.edu.br',
        pass: '982239102',
    },
});

export { transporter };