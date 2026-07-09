import nodemailer from 'nodemailer';

export const sendEmail = async (options) => {
  try {
    // Note: To make this work, add EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS to .env
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: process.env.EMAIL_PORT || 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER || "dummy@gmail.com",
        pass: process.env.EMAIL_PASS || "dummy_password",
      },
    });

    const mailOptions = {
      from: `Tour World <${process.env.EMAIL_USER || "dummy@gmail.com"}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${options.email}`);
  } catch (err) {
    console.error("Email could not be sent. Check your SMTP credentials in .env.", err);
    // For development, we don't throw error if SMTP isn't set up so the flow continues
  }
};
