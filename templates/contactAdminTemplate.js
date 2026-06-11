const contactAdminTemplate = ({
    name,
    email,
    phone,
    message,
}) => {
    return `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; padding: 40px 20px; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid #d1d5db;">

                <div style="background-color: #1a202c; padding: 30px 20px; text-align: center; border-bottom: 4px solid #d4af37;">
                    <h2 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: 1px; display: flex; align-items: center; justify-content: center;">
                        <img src="https://img.icons8.com/ios-filled/50/ffffff/lock.png" alt="Vault Lock" width="26" height="26" style="vertical-align: middle; margin-right: 10px;" />
                        Secure Vault Inquiry
                    </h2>
                    <p style="margin: 8px 0 0; color: #a0aec0; font-size: 14px;">
                        New customer request received from your portal.
                    </p>
                </div>

                <div style="padding: 30px;">
                    
                    <table style="width: 100%; border-collapse: collapse; font-size: 16px;">
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #edf2f7; width: 40%; color: #718096; font-weight: bold;">
                                <img src="https://img.icons8.com/ios/50/718096/user--v1.png" alt="User" width="18" height="18" style="vertical-align: middle; margin-right: 8px; margin-bottom: 3px;" />
                                Client Name:
                            </td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #edf2f7; color: #2d3748; font-weight: 500;">
                                ${name}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #edf2f7; color: #718096; font-weight: bold;">
                                <img src="https://img.icons8.com/ios/50/718096/new-post.png" alt="Email" width="18" height="18" style="vertical-align: middle; margin-right: 8px; margin-bottom: 3px;" />
                                Email Address:
                            </td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #edf2f7;">
                                <a href="mailto:${email}" style="color: #3182ce; text-decoration: none; font-weight: 500;">
                                    ${email}
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #edf2f7; color: #718096; font-weight: bold;">
                                <img src="https://img.icons8.com/ios/50/718096/phone.png" alt="Phone" width="18" height="18" style="vertical-align: middle; margin-right: 8px; margin-bottom: 3px;" />
                                Phone Number:
                            </td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #edf2f7; color: #2d3748; font-weight: 500;">
                                ${phone}
                            </td>
                        </tr>
                    </table>

                    <div style="margin-top: 35px;">
                        <h3 style="margin: 0 0 12px; color: #4a5568; font-size: 18px; font-weight: 600;">
                            <img src="https://img.icons8.com/ios/50/4a5568/document.png" alt="Message" width="20" height="20" style="vertical-align: middle; margin-right: 8px; margin-bottom: 3px;" />
                            Message / Requirements:
                        </h3>
                        <div style="background-color: #f7fafc; border-left: 4px solid #1a202c; padding: 20px; border-radius: 4px; color: #2d3748; line-height: 1.6; white-space: pre-wrap; font-size: 15px;">${message}</div>
                    </div>
                </div>

                <div style="background-color: #edf2f7; padding: 15px 20px; text-align: center; font-size: 12px; color: #718096;">
                    <p style="margin: 0;">This is an automated alert from your Secure Vaults system.</p>
                </div>

            </div>
        </div>
    `;
};

module.exports = contactAdminTemplate;