const jwt = require('jsonwebtoken');
const { User } = require('../models');

const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );
};

const register = async (userData) => {
  try {
    const { firstName, lastName, email, password } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Create new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    const token = generateToken(newUser.id, newUser.role);

    return {
      success: true,
      message: 'User registered successfully',
      data: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
        token,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const login = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Update last login
    await user.update({ lastLogin: new Date() });

    const token = generateToken(user.id, user.role);

    return {
      success: true,
      message: 'Login successful',
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        token,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

module.exports = { register, login, generateToken };
