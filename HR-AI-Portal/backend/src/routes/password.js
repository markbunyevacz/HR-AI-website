const express = require('express');
const router = express.Router();
const { requestPasswordReset, resetPassword, validateResetToken } = require('../services/passwordService');

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    const result = await requestPasswordReset(email);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to process password reset request',
      error: error.message,
    });
  }
});

router.post('/validate-reset-token', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Reset token is required',
      });
    }

    const validation = await validateResetToken(token);
    return res.status(validation.valid ? 200 : 400).json({
      success: validation.valid,
      message: validation.message,
      ...validation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error validating reset token',
      error: error.message,
    });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    if (!token || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      });
    }

    const result = await resetPassword(token, newPassword);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to reset password',
      error: error.message,
    });
  }
});

module.exports = router;
