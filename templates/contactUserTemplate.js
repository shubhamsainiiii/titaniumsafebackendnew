const contactUserTemplate = (name) => {
    return `
        <div style="font-family: Arial, sans-serif; padding:20px;">
            <h2>Hello ${name},</h2>

            <p>
                Thank you for contacting Titanium Safe.
            </p>

            <p>
                We have received your inquiry and our team
                will get back to you as soon as possible.
            </p>

            <br/>

            <p>Regards,</p>
            <p><strong>Titanium Safe Team</strong></p>
        </div>
    `;
};

module.exports = contactUserTemplate;