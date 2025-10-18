const crypto = require('crypto');
const { User } = require('../models');
const emailService = require('./emailService');

const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

const requestPasswordReset = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      // Don't reveal if email exists for security
      return {
        success: true,
        message: 'If an account with this email exists, a password reset link has been sent',
      };
    }

    const resetToken = generateResetToken();
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    const resetExpires = new Date(Date.now() + 3600000); // 1 hour

    await user.update({
      passwordResetToken: resetTokenHash,
      passwordResetExpires: resetExpires,
    });

    // Send email with reset link
    await emailService.sendPasswordResetEmail(email, resetToken, user.firstName);

    return {
      success: true,
      message: 'If an account with this email exists, a password reset link has been sent',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to process password reset request',
      error: error.message,
    };
  }
};

const validateResetToken = async (token) => {
  try {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      where: {
        passwordResetToken: tokenHash,
        passwordResetExpires: {
          [require('sequelize').Op.gt]: new Date(),
        },
      },
    });

    if (!user) {
      return {
        valid: false,
        message: 'Invalid or expired reset token',
      };
    }

    return {
      valid: true,
      userId: user.id,
      email: user.email,
    };
  } catch (error) {
    return {
      valid: false,
      message: 'Error validating reset token',
    };
  }
};

const resetPassword = async (token, newPassword) => {
  try {
    const validation = await validateResetToken(token);

    if (!validation.valid) {
      return {
        success: false,
        message: validation.message,
      };
    }

    if (newPassword.length < 6) {
      return {
        success: false,
        message: 'Password must be at least 6 characters',
      };
    }

    const user = await User.findByPk(validation.userId);
    await user.update({
      password: newPassword,
      passwordResetToken: null,
      passwordResetExpires: null,
    });

    // Send confirmation email
    await emailService.sendPasswordResetConfirmation(user.email, user.firstName);

    return {
      success: true,
      message: 'Password has been reset successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to reset password',
      error: error.message,
    };
  }
};

module.exports = {
  generateResetToken,
  requestPasswordReset,
  validateResetToken,
  resetPassword,
};
