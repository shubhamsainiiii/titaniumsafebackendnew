const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async ({
    to,
    subject,
    html,
    replyTo,
}) => {
    try {
        const info = await transporter.sendMail({
            from: `"Titanium Safe" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
            replyTo,
        });

        return info;
    } catch (error) {
        console.error("Email Error:", error);
        throw error;
    }
};

module.exports = sendEmail;