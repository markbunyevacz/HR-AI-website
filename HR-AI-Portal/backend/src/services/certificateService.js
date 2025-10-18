const crypto = require('crypto');
const { Certificate, User, Course } = require('../models');

// Generate unique certificate number
const generateCertificateNumber = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `CERT-${timestamp}-${random}`;
};

// Generate verification code
const generateVerificationCode = () => {
  return crypto.randomBytes(6).toString('hex').toUpperCase();
};

// Check if user can receive certificate
const canReceiveCertificate = async (userId, courseId) => {
  try {
    const { UserCourseProgress, UserQuizAttempt, Quiz } = require('../models');

    // Check if course is completed
    const courseProgress = await UserCourseProgress.findOne({
      where: { userId, courseId, isCompleted: true },
    });

    if (!courseProgress) {
      return { eligible: false, reason: 'Course not completed' };
    }

    // Check if all quizzes passed
    const quizzes = await Quiz.findAll({
      where: { courseId },
      attributes: ['id'],
    });

    if (quizzes.length === 0) {
      return { eligible: true, reason: 'No quizzes in course' };
    }

    for (const quiz of quizzes) {
      const passedAttempt = await UserQuizAttempt.findOne({
        where: {
          userId,
          quizId: quiz.id,
          passed: true,
        },
      });

      if (!passedAttempt) {
        return { eligible: false, reason: `Quiz ${quiz.id} not passed` };
      }
    }

    return { eligible: true, reason: 'All requirements met' };
  } catch (error) {
    console.error('Error checking certificate eligibility:', error);
    throw new Error('Failed to check certificate eligibility');
  }
};

// Issue certificate
const issueCertificate = async (userId, courseId) => {
  try {
    // Check eligibility
    const eligibility = await canReceiveCertificate(userId, courseId);
    if (!eligibility.eligible) {
      return { success: false, message: eligibility.reason };
    }

    // Check if certificate already exists
    const existing = await Certificate.findOne({
      where: { userId, courseId },
    });

    if (existing) {
      return { success: false, message: 'Certificate already issued for this course', certificate: existing };
    }

    // Create certificate
    const certificateNumber = generateCertificateNumber();
    const verificationCode = generateVerificationCode();

    const certificate = await Certificate.create({
      userId,
      courseId,
      certificateNumber,
      verificationCode,
      issuedAt: new Date(),
      expiresAt: new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000), // 3 years
    });

    return {
      success: true,
      message: 'Certificate issued successfully',
      certificate,
    };
  } catch (error) {
    console.error('Error issuing certificate:', error);
    throw new Error('Failed to issue certificate');
  }
};

// Get user certificates
const getUserCertificates = async (userId) => {
  try {
    const certificates = await Certificate.findAll({
      where: { userId },
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['id', 'title', 'category'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email'],
        },
      ],
      order: [['issuedAt', 'DESC']],
    });

    return certificates;
  } catch (error) {
    console.error('Error fetching user certificates:', error);
    throw new Error('Failed to fetch certificates');
  }
};

// Verify certificate
const verifyCertificate = async (verificationCode) => {
  try {
    const certificate = await Certificate.findOne({
      where: { verificationCode },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email'],
        },
        {
          model: Course,
          as: 'course',
          attributes: ['id', 'title', 'category'],
        },
      ],
    });

    if (!certificate) {
      return { valid: false, message: 'Certificate not found' };
    }

    // Check if expired
    if (certificate.expiresAt && new Date() > certificate.expiresAt) {
      return { valid: false, message: 'Certificate has expired' };
    }

    return {
      valid: true,
      certificate: {
        number: certificate.certificateNumber,
        issuedAt: certificate.issuedAt,
        expiresAt: certificate.expiresAt,
        user: certificate.user,
        course: certificate.course,
      },
    };
  } catch (error) {
    console.error('Error verifying certificate:', error);
    throw new Error('Failed to verify certificate');
  }
};

// Get course statistics for progress tracking
const getCourseStatistics = async (courseId) => {
  try {
    const { UserCourseProgress } = require('../models');

    const stats = await UserCourseProgress.findAll({
      where: { courseId },
      attributes: [
        [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'totalEnrolled'],
        [require('sequelize').fn('SUM', require('sequelize').where(
          require('sequelize').col('isCompleted'), '=', true
        )), 'totalCompleted'],
      ],
      raw: true,
    });

    const avgProgress = await UserCourseProgress.findAll({
      where: { courseId },
      attributes: [
        [require('sequelize').fn('AVG', require('sequelize').col('progressPercentage')), 'averageProgress'],
      ],
      raw: true,
    });

    return {
      totalEnrolled: stats[0]?.totalEnrolled || 0,
      totalCompleted: stats[0]?.totalCompleted || 0,
      averageProgress: Math.round(avgProgress[0]?.averageProgress || 0),
      completionRate: stats[0]?.totalEnrolled ? Math.round((stats[0]?.totalCompleted / stats[0]?.totalEnrolled) * 100) : 0,
    };
  } catch (error) {
    console.error('Error fetching course statistics:', error);
    throw new Error('Failed to fetch course statistics');
  }
};

module.exports = {
  generateCertificateNumber,
  generateVerificationCode,
  canReceiveCertificate,
  issueCertificate,
  getUserCertificates,
  verifyCertificate,
  getCourseStatistics,
};
