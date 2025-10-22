const { sequelize, Certificate, User, Course, UserCourseProgress, UserQuizAttempt, Quiz } = require('./src/models');
const crypto = require('crypto');

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

async function seedCertificates() {
  try {
    console.log('🎓 Starting certificate seeding...\n');

    // Get first user (usually the logged-in user)
    const user = await User.findOne({
      order: [['createdAt', 'DESC']]
    });

    if (!user) {
      console.log('⚠️  No users found in database. Please create a user first.');
      return;
    }

    console.log('✅ Found user:', user.email, '\n');

    // Get available courses
    const courses = await Course.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']]
    });

    if (courses.length === 0) {
      console.log('⚠️  No courses found in database. Please seed courses first.');
      return;
    }

    console.log(`✅ Found ${courses.length} courses\n`);

    // Create certificates for the user
    console.log('🎖️  Creating certificates...');
    
    const certificatesToCreate = [];
    for (let i = 0; i < Math.min(3, courses.length); i++) {
      const course = courses[i];
      
      // Check if certificate already exists
      const existing = await Certificate.findOne({
        where: { userId: user.id, courseId: course.id }
      });

      if (!existing) {
        certificatesToCreate.push({
          userId: user.id,
          courseId: course.id,
          certificateNumber: generateCertificateNumber(),
          verificationCode: generateVerificationCode(),
          issuedAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000), // Random date in last 90 days
          expiresAt: new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000), // 3 years from now
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    if (certificatesToCreate.length === 0) {
      console.log('ℹ️  All certificates already exist for this user.');
    } else {
      // Create certificates
      const created = await Certificate.bulkCreate(certificatesToCreate);
      
      created.forEach((cert, index) => {
        const course = courses[index];
        console.log(`  ✅ Created certificate for: ${course.title}`);
        console.log(`     Certificate #: ${cert.certificateNumber}`);
        console.log(`     Verification Code: ${cert.verificationCode}\n`);
      });

      console.log(`\n🎉 ${created.length} certificates created successfully!\n`);
    }

    // Display all user certificates
    console.log('📋 Your Certificates:\n');
    const userCerts = await Certificate.findAll({
      where: { userId: user.id },
      include: {
        model: Course,
        as: 'course',
        attributes: ['id', 'title', 'category']
      },
      order: [['issuedAt', 'DESC']]
    });

    if (userCerts.length === 0) {
      console.log('No certificates yet.');
    } else {
      userCerts.forEach((cert, index) => {
        console.log(`${index + 1}. ${cert.course.title}`);
        console.log(`   Certificate #: ${cert.certificateNumber}`);
        console.log(`   Verification: ${cert.verificationCode}`);
        console.log(`   Issued: ${cert.issuedAt.toLocaleDateString()}`);
        console.log(`   Expires: ${cert.expiresAt.toLocaleDateString()}\n`);
      });
    }

  } catch (error) {
    console.error('❌ Error during certificate seeding:', error);
  } finally {
    await sequelize.close();
  }
}

// Run seeder
seedCertificates();
