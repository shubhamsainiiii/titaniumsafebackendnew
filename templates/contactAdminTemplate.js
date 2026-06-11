const contactAdminTemplate = ({
    name,
    email,
    phone,
    message,
}) => {
    return `
        <div style="font-family: Arial, sans-serif; padding:20px;">
            <h2>New Contact Inquiry</h2>

            <p><strong>Name:</strong> ${name}</p>

            <p><strong>Email:</strong> ${email}</p>

            <p><strong>Phone:</strong> ${phone}</p>

            <p><strong>Message:</strong></p>

            <p>${message}</p>
        </div>
    `;
};

module.exports = contactAdminTemplate;