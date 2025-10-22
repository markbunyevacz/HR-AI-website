/**
 * Seed Database with CAHIS Courses and Blog Posts
 * 
 * Run this from the backend directory:
 *   node seed-data.js
 */

const { sequelize, Course, Lesson, BlogPost, User } = require('./src/models');
const { v4: uuidv4 } = require('uuid');

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Get or create an instructor
    let instructor = await User.findOne({ where: { role: 'admin' } });
    if (!instructor) {
      instructor = await User.findOne({ where: { role: 'instructor' } });
    }
    if (!instructor) {
      instructor = await User.findOne();
    }

    const instructorId = instructor ? instructor.id : null;

    if (!instructorId) {
      console.log('⚠️  No users found in database. Please create a user first.');
      return;
    }

    console.log('✅ Found instructor:', instructor.email, '\n');

    // Check if courses already exist
    const existingCourses = await Course.count();
    if (existingCourses > 0) {
      console.log(`ℹ️  Database already has ${existingCourses} courses.`);
      const answer = 'y'; // Auto-yes for now
      if (answer.toLowerCase() !== 'y') {
        console.log('Seeding cancelled.');
        return;
      }
    }

    // Define courses
    const coursesData = [
      {
        title: 'Introduction to AI Human Impact Strategy',
        shortDescription: 'Learn the fundamentals of assessing and managing the human consequences of AI implementation in organizations.',
        description: 'This foundational course introduces you to the critical role of AI Human Impact Strategy in modern organizations. You will learn why AI projects fail not due to technology, but due to human factors.',
        category: 'HR AI',
        level: 'Beginner',
        duration: 20,
        isPublished: true,
        enrollmentCount: 156,
        rating: 4.75,
        ratingCount: 45,
      },
      {
        title: 'Fundamentals of AI Technology for HR Professionals',
        shortDescription: 'Understand AI technologies at a depth that enables you to assess their human impact without needing to code.',
        description: 'This course provides HR professionals with essential knowledge about AI and automation technologies. Learn to distinguish between rule-based automation and machine learning models.',
        category: 'HR AI',
        level: 'Beginner',
        duration: 25,
        isPublished: true,
        enrollmentCount: 203,
        rating: 4.65,
        ratingCount: 62,
      },
      {
        title: 'Change Management Basics for AI Adoption',
        shortDescription: 'Master the fundamentals of change management specifically tailored for AI and automation projects.',
        description: 'Explore proven change management frameworks adapted for AI adoption contexts. Learn the Kübler-Ross grief curve in organizational change, understand resistance patterns.',
        category: 'AI Strategy',
        level: 'Beginner',
        duration: 18,
        isPublished: true,
        enrollmentCount: 178,
        rating: 4.70,
        ratingCount: 51,
      },
      {
        title: 'Human Impact Assessment Methodology',
        shortDescription: 'Learn the comprehensive framework for conducting Human Impact Assessments before AI implementations.',
        description: 'This course teaches the core methodology for creating detailed Human Impact Assessment reports. Master stakeholder interview techniques that reveal hidden concerns.',
        category: 'Data Analysis',
        level: 'Intermediate',
        duration: 35,
        isPublished: true,
        enrollmentCount: 132,
        rating: 4.85,
        ratingCount: 38,
      },
      {
        title: 'C-Level Communication and Influence',
        shortDescription: 'Develop the skills to advise senior executives on AI strategy and influence critical decisions.',
        description: 'Learn how to communicate with C-suite executives in their language: data-driven, business-focused, and strategic. Practice tough conversations and build coalitions.',
        category: 'AI Strategy',
        level: 'Intermediate',
        duration: 30,
        isPublished: true,
        enrollmentCount: 98,
        rating: 4.90,
        ratingCount: 29,
      },
      {
        title: 'AI Adoption Psychology and Organizational Behavior',
        shortDescription: 'Deep dive into the psychological and cultural factors that determine AI adoption success or failure.',
        description: 'Understand the psychological roots of resistance to change, trust-building mechanisms during technology adoption, and cultural collision points.',
        category: 'HR AI',
        level: 'Intermediate',
        duration: 28,
        isPublished: true,
        enrollmentCount: 145,
        rating: 4.80,
        ratingCount: 42,
      },
      {
        title: 'Complex AI Transformation Leadership',
        shortDescription: 'Lead multi-year, enterprise-wide AI transformations affecting thousands of employees.',
        description: 'This advanced course prepares you to lead large-scale AI transformation programs. Study failures at Duolingo, Lattice, and successes at Morgan Stanley, Rolls-Royce.',
        category: 'AI Strategy',
        level: 'Advanced',
        duration: 45,
        isPublished: true,
        enrollmentCount: 76,
        rating: 4.95,
        ratingCount: 21,
      },
      {
        title: 'Strategic AI Change Management Execution',
        shortDescription: 'Execute comprehensive change programs with advanced techniques for adoption, communication, and training.',
        description: 'Master advanced change execution strategies including communication cascades, internal messaging for diverse audiences, and town hall facilitation.',
        category: 'AI Strategy',
        level: 'Advanced',
        duration: 40,
        isPublished: true,
        enrollmentCount: 67,
        rating: 4.88,
        ratingCount: 18,
      },
      {
        title: 'Crisis Prevention and Reputation Management',
        shortDescription: 'Protect organizations from reputational catastrophes during AI implementations.',
        description: 'Learn to identify warning signs before they become crises. Study catastrophic failures and learn what could have been done differently.',
        category: 'AI Strategy',
        level: 'Advanced',
        duration: 38,
        isPublished: true,
        enrollmentCount: 54,
        rating: 4.92,
        ratingCount: 15,
      },
    ];

    console.log('📚 Creating courses...');
    for (const courseData of coursesData) {
      const course = await Course.create({
        ...courseData,
        instructorId,
      });

      // Add 4 lessons per course
      for (let i = 1; i <= 4; i++) {
        await Lesson.create({
          courseId: course.id,
          title: `Module ${i}: Core Concept ${i}`,
          description: `Learn the essential concepts and practical applications in this module.`,
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
          type: ['Article', 'Video', 'Interactive', 'Article'][i - 1],
          order: i,
          duration: 30 + (i * 10),
          isPublished: true,
        });
      }

      console.log(`  ✅ Created: ${course.title}`);
    }

    console.log('\n📝 Creating blog posts...');
    
    const blogPosts = [
      {
        title: 'The Hidden Cost of AI: Why 95% of Implementations Fail',
        slug: 'hidden-cost-ai-implementations-fail',
        excerpt: 'Organizations spend millions on AI technology but overlook the critical human factor.',
        category: 'Industry Insights',
        tags: ['AI Adoption', 'Change Management'],
        viewCount: 1247,
      },
      {
        title: 'Case Study: How Morgan Stanley Achieved 98% AI Adoption',
        slug: 'morgan-stanley-98-percent-ai-adoption',
        excerpt: 'A deep dive into Morgan Stanley\'s successful AI transformation strategy.',
        category: 'Case Studies',
        tags: ['Success Stories', 'Financial Services'],
        viewCount: 892,
      },
      {
        title: 'Navigating Employee Resistance: 5 Proven Strategies',
        slug: 'employee-resistance-proven-strategies',
        excerpt: 'Learn practical techniques for addressing employee resistance during AI transformations.',
        category: 'Best Practices',
        tags: ['Employee Engagement', 'Change Management'],
        viewCount: 1456,
      },
      {
        title: 'The Klarna Controversy: What Went Wrong',
        slug: 'klarna-controversy-what-went-wrong',
        excerpt: 'An analysis of Klarna\'s AI customer service rollout that led to public backlash.',
        category: 'Case Studies',
        tags: ['Failure Analysis', 'Customer Service'],
        viewCount: 2134,
      },
      {
        title: 'Building Trust During AI Transformation',
        slug: 'building-trust-ai-transformation',
        excerpt: 'Trust is the foundation of successful AI adoption.',
        category: 'Best Practices',
        tags: ['Trust Building', 'Leadership'],
        viewCount: 1089,
      },
    ];

    for (const postData of blogPosts) {
      await BlogPost.create({
        ...postData,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        authorId: instructorId,
        isPublished: true,
        publishedAt: new Date(),
      });
      console.log(`  ✅ Created: ${postData.title}`);
    }

    console.log('\n🎉 Database seeding completed successfully!\n');
    console.log('Summary:');
    console.log(`  - ${coursesData.length} courses created`);
    console.log(`  - ${coursesData.length * 4} lessons created`);
    console.log(`  - ${blogPosts.length} blog posts created\n`);

  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    await sequelize.close();
  }
}

// Run seeder
seedDatabase();

