import nodemailer from 'nodemailer';

const handleTransport = () => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.sparkpostmail.com',
        port: 587,
        secure: true,
        auth: {
            user: process.env.NM_EMAIL,
            pass: process.env.NM_PASS
        },
        requireTLS: true
    });

    return transporter;
};

const handleMailOptions = (to, subject, text) => ({
    from: 'nikestore@mail.jitenderkumar.in',
    to,
    subject,
    text
});

export { handleTransport, handleMailOptions };
