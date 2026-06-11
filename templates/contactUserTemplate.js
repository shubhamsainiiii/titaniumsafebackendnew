const contactUserTemplate = (name) => {
    return `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; padding: 40px 20px; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid #d1d5db;">

                <div style="background-color: #1a202c; padding: 30px 20px; text-align: center; border-bottom: 4px solid #d4af37;">
                    <h2 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: 1px; display: flex; align-items: center; justify-content: center;">
                        <img src="https://img.icons8.com/ios-filled/50/ffffff/shield.png" alt="Titanium Shield" width="26" height="26" style="vertical-align: middle; margin-right: 10px;" />
                        Titanium Safe
                    </h2>
                </div>

                <div style="padding: 40px 30px; text-align: center;">
                    
                    <img src="https://img.icons8.com/fluency/96/ok--v1.png" alt="Success" width="60" height="60" style="margin-bottom: 20px;" />
                    
                    <h3 style="margin: 0 0 15px; color: #2d3748; font-size: 20px;">Hello ${name},</h3>
                    
                    <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                        Thank you for reaching out to <strong>Titanium Safe</strong>. We have successfully received your inquiry.
                    </p>
                    
                    <div style="background-color: #f7fafc; border-left: 4px solid #d4af37; padding: 18px 20px; border-radius: 4px; color: #2d3748; font-size: 15px; text-align: left; margin-bottom: 30px;">
                        <img src="https://img.icons8.com/ios/50/d4af37/info--v1.png" alt="Info" width="18" height="18" style="vertical-align: middle; margin-right: 8px; margin-bottom: 3px;" />
                        Our security experts are currently reviewing your request and will get back to you with the required details as soon as possible.
                    </div>

                    <p style="color: #718096; font-size: 15px; margin-bottom: 5px;">Best Regards,</p>
                    <p style="color: #1a202c; font-size: 18px; font-weight: bold; margin: 0;">The Titanium Safe Team</p>
                </div>

                <div style="background-color: #edf2f7; padding: 15px 20px; text-align: center; font-size: 12px; color: #718096;">
                    <p style="margin: 0;">&copy; Titanium Safe. All rights reserved.</p>
                    <p style="margin: 5px 0 0;">This is an automated confirmation, please do not reply directly to this email.</p>
                </div>

            </div>
        </div>
    `;
};

module.exports = contactUserTemplate;