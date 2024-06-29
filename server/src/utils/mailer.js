const nodemailer = require("nodemailer");
const logger = require("./logger");

class Mailer {
    from = process.env.GMAIL;
    transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAILER_MAIL,
                pass: process.env.MAILER_SECRET,
            },
        });
        this.sendMail = this.sendMail.bind(this);
    }

    async sendMail(to, subject, body) {
        return await this.transporter.sendMail({
            from: { name: process.env.MAILER_NAME, address: process.env.MAILER_MAIL }, // sender address
            to, // list of receivers
            subject: subject, // Subject line
            ...body
        })
    }

    async sendVerificationLink(email, link) {
        try {
            const body = {
                html: `<p>Click on the link to verify your email: <strong>${link}</strong>.`
            }
            await this.sendMail([email], 'Verify account', body);

        } catch (error) {
            logger.error(`[/forgotpassword/resetpassword] - Something went wrong`);
        }

    }


}

module.exports = new Mailer();