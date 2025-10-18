const nodemailer = require('nodemailer');

// Initialize email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'localhost',
  port: process.env.EMAIL_PORT || 1025,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: process.env.EMAIL_USER ? {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  } : undefined,
});

// Email templates
const templates = {
  passwordReset: (firstName, resetLink) => ({
    subject: 'HR AI Portal - Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">HR AI Portal</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
          <h2 style="color: #333;">Hello ${firstName},</h2>
          <p style="color: #666; line-height: 1.6;">
            We received a request to reset the password for your HR AI Portal account. If you didn't make this request, you can ignore this email.
          </p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Reset Password
            </a>
          </p>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            This link will expire in 1 hour. If you didn't request this, please ignore this email and your password will remain unchanged.
          </p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">
            © 2025 HR AI Portal. All rights reserved.
          </p>
        </div>
      </div>
    `,
  }),

  passwordResetConfirmation: (firstName) => ({
    subject: 'HR AI Portal - Password Changed Successfully',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">HR AI Portal</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
          <h2 style="color: #333;">Hello ${firstName},</h2>
          <p style="color: #666; line-height: 1.6;">
            Your password has been successfully changed. You can now log in with your new password.
          </p>
          <div style="background: #e8f5e9; border-left: 4px solid #4caf50; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p style="color: #2e7d32; margin: 0;">✓ Your account is secure and ready to use.</p>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            If you didn't make this change, please contact support immediately.
          </p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">
            © 2025 HR AI Portal. All rights reserved.
          </p>
        </div>
      </div>
    `,
  }),

  welcomeEmail: (firstName) => ({
    subject: 'Welcome to HR AI Portal - Your Certification Journey Begins',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">Welcome to HR AI Portal</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
          <h2 style="color: #333;">Hello ${firstName},</h2>
          <p style="color: #666; line-height: 1.6;">
            Welcome to the HR AI Certification Portal! We're excited to have you join our community of HR and AI professionals.
          </p>
          <p style="color: #666; line-height: 1.6;">
            You can now access:
          </p>
          <ul style="color: #666; line-height: 1.8;">
            <li>CAHIS™ Certification Training Program</li>
            <li>Interactive Quizzes and Exams</li>
            <li>Professional Blog and Case Studies</li>
            <li>Community Chat with Experts</li>
            <li>Exclusive Training Materials</li>
          </ul>
          <p style="color: #666; line-height: 1.6;">
            Start exploring your dashboard to begin your certification journey today!
          </p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">
            © 2025 HR AI Portal. All rights reserved.
          </p>
        </div>
      </div>
    `,
  }),
};

const sendPasswordResetEmail = async (email, resetToken, firstName) => {
  try {
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;
    const template = templates.passwordReset(firstName, resetLink);

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@hrai-portal.com',
      to: email,
      ...template,
    });

    return { success: true, message: 'Password reset email sent' };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, message: 'Failed to send email', error: error.message };
  }
};

const sendPasswordResetConfirmation = async (email, firstName) => {
  try {
    const template = templates.passwordResetConfirmation(firstName);

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@hrai-portal.com',
      to: email,
      ...template,
    });

    return { success: true, message: 'Confirmation email sent' };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { success: false, message: 'Failed to send email', error: error.message };
  }
};

const sendWelcomeEmail = async (email, firstName) => {
  try {
    const template = templates.welcomeEmail(firstName);

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@hrai-portal.com',
      to: email,
      ...template,
    });

    return { success: true, message: 'Welcome email sent' };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, message: 'Failed to send email', error: error.message };
  }
};

module.exports = {
  sendPasswordResetEmail,
  sendPasswordResetConfirmation,
  sendWelcomeEmail,
};
