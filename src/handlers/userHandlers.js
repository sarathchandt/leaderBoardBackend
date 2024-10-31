import nodemailer from "nodemailer";

export const sentOtpWithMailer = async (email, otp) => {
    try {
        
 
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: `${process.env.EMAIL}`,
          pass: `${process.env.PASSWORD}`,
        },
      });
  
      const mailOptions = {
        from: '"LeaderBoard" <joinus872@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "One Time Password", // Subject line
        text: `We received a request to verify your email address with LeaderBoard. To complete the verification process, please use the following One-Time Password (OTP):
  OTP: ${otp}
  This OTP is valid for the next 10 minutes. If you did not initiate this request, please ignore this email.
  If you have any questions or concerns, feel free to reach out to our support team at support@something.com.
  Thank you for choosing Join Us! `,
        html: `<table cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: none;">
    <tr>
      <td style="border: none; padding: 0;">
        <p style="margin-top: 0;">We received a request to verify your email address with LeaderBoard. To complete the verification process, please use the following One-Time Password (OTP):</p>
        <p style="font-size: 24px; font-weight: bold; margin: 20px 0;">OTP: ${otp}</p>
        <p style="margin-bottom: 0;">This OTP is valid for the next 10 minutes. If you did not initiate this request, please ignore this email.</p>
      </td>
    </tr>
    <tr>
      <td style="border: none; padding: 0;">
        <p style="margin-top: 20px; margin-bottom: 0;">If you have any questions or concerns, feel free to reach out to our support team at <a href="mailto:fakeSupport@joinus.something">support@joinus.com</a>.</p>
        <p style="margin-top: 20px; margin-bottom: 0;">Thank you for choosing LeaderBoard!</p>
      </td>
    </tr>
  </table>`, 
      };
  
      await transporter.sendMail(mailOptions);

    } catch (error) {
        throw new Error('internal server error');
    }
}