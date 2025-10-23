'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First, get a user to be the instructor (or create one)
    const [users] = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE role IN ('admin', 'instructor') LIMIT 1;`
    );

    let instructorId;
    if (users.length === 0) {
      console.log('⚠️  No instructor found. Creating a default instructor user...');
      
      const bcrypt = require('bcryptjs');
      const defaultUserId = uuidv4();
      const hashedPassword = await bcrypt.hash('InstructorPassword123!', 10);
      
      try {
        await queryInterface.sequelize.query(
          `INSERT INTO users (id, email, password, first_name, last_name, role, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
          {
            replacements: [
              defaultUserId,
              'instructor@hrailogy.com',
              hashedPassword,
              'HR',
              'Instructor',
              'instructor',
              new Date(),
              new Date()
            ]
          }
        );
        instructorId = defaultUserId;
        console.log('✅ Default instructor user created');
      } catch (err) {
        console.log('ℹ️  Instructor user may already exist, continuing...');
        // If user already exists, try to fetch it
        const [existingUsers] = await queryInterface.sequelize.query(
          `SELECT id FROM users LIMIT 1;`
        );
        instructorId = existingUsers.length > 0 ? existingUsers[0].id : uuidv4();
      }
    } else {
      instructorId = users[0].id;
    }

    // Define CAHIS courses based on certification documentation
    const courses = [
      // BEGINNER LEVEL COURSES
      {
        id: uuidv4(),
        title: 'Introduction to AI Human Impact Strategy',
        shortDescription: 'Learn the fundamentals of assessing and managing the human consequences of AI implementation in organizations.',
        description: 'This foundational course introduces you to the critical role of AI Human Impact Strategy in modern organizations. You will learn why AI projects fail not due to technology, but due to human factors. Discover how to bridge the gap between technological innovation and human reality, and understand the three core pillars: human impact assessment, C-level advisory, and change management orchestration.',
        category: 'HR AI',
        level: 'Beginner',
        duration: 20,
        instructorId: instructorId,
        imageUrl: 'https://via.placeholder.com/400x300?text=AI+Human+Impact+Strategy',
        isPublished: true,
        enrollmentCount: 156,
        rating: 4.75,
        ratingCount: 45,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
      },
      {
        id: uuidv4(),
        title: 'Fundamentals of AI Technology for HR Professionals',
        shortDescription: 'Understand AI technologies at a depth that enables you to assess their human impact without needing to code.',
        description: 'This course provides HR professionals with essential knowledge about AI and automation technologies. Learn to distinguish between rule-based automation and machine learning models, understand key AI use cases across HR, customer service, and operations. You will gain the technical literacy needed to evaluate how different AI solutions affect employees, without becoming a data scientist.',
        category: 'HR AI',
        level: 'Beginner',
        duration: 25,
        instructorId: instructorId,
        imageUrl: 'https://via.placeholder.com/400x300?text=AI+Fundamentals+for+HR',
        isPublished: true,
        enrollmentCount: 203,
        rating: 4.65,
        ratingCount: 62,
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20'),
      },
      {
        id: uuidv4(),
        title: 'Change Management Basics for AI Adoption',
        shortDescription: 'Master the fundamentals of change management specifically tailored for AI and automation projects.',
        description: 'Explore proven change management frameworks adapted for AI adoption contexts. Learn the Kübler-Ross grief curve in organizational change, understand resistance patterns, and discover how to identify early adopters vs. late adopters. This course covers stakeholder mapping, change readiness assessment, and communication strategies essential for any AI transformation.',
        category: 'AI Strategy',
        level: 'Beginner',
        duration: 18,
        instructorId: instructorId,
        imageUrl: 'https://via.placeholder.com/400x300?text=Change+Management+Basics',
        isPublished: true,
        enrollmentCount: 178,
        rating: 4.70,
        ratingCount: 51,
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01'),
      },

      // INTERMEDIATE LEVEL COURSES
      {
        id: uuidv4(),
        title: 'Human Impact Assessment Methodology',
        shortDescription: 'Learn the comprehensive framework for conducting Human Impact Assessments before AI implementations.',
        description: 'This course teaches the core methodology for creating detailed Human Impact Assessment reports. Master stakeholder interview techniques that reveal hidden concerns, design employee surveys that generate honest responses, and learn to interpret HR metrics (turnover, engagement, absenteeism) to predict AI impact. You will work with real templates and frameworks used by leading organizations.',
        category: 'Data Analysis',
        level: 'Intermediate',
        duration: 35,
        instructorId: instructorId,
        imageUrl: 'https://via.placeholder.com/400x300?text=Human+Impact+Assessment',
        isPublished: true,
        enrollmentCount: 132,
        rating: 4.85,
        ratingCount: 38,
        createdAt: new Date('2024-02-15'),
        updatedAt: new Date('2024-02-15'),
      },
      {
        id: uuidv4(),
        title: 'C-Level Communication and Influence',
        shortDescription: 'Develop the skills to advise senior executives on AI strategy and influence critical decisions.',
        description: 'Learn how to communicate with C-suite executives in their language: data-driven, business-focused, and strategic. This course teaches you to structure arguments using ROI, risk-return trade-offs, and quantitative forecasts. Practice tough conversations, learn to build coalitions among senior stakeholders, and discover how to professionally challenge a CEO when a project is too risky. Includes real-world scenario simulations.',
        category: 'AI Strategy',
        level: 'Intermediate',
        duration: 30,
        instructorId: instructorId,
        imageUrl: 'https://via.placeholder.com/400x300?text=C-Level+Communication',
        isPublished: true,
        enrollmentCount: 98,
        rating: 4.90,
        ratingCount: 29,
        createdAt: new Date('2024-03-01'),
        updatedAt: new Date('2024-03-01'),
      },
      {
        id: uuidv4(),
        title: 'AI Adoption Psychology and Organizational Behavior',
        shortDescription: 'Deep dive into the psychological and cultural factors that determine AI adoption success or failure.',
        description: 'Understand the psychological roots of resistance to change, trust-building mechanisms during technology adoption, and cultural collision points when AI meets organizational norms. Learn to predict emotional reactions, identify fear patterns, and design interventions that address the psychological needs of employees. Case studies include Klarna, IBM AskHR, and Amazon transformations.',
        category: 'HR AI',
        level: 'Intermediate',
        duration: 28,
        instructorId: instructorId,
        imageUrl: 'https://via.placeholder.com/400x300?text=AI+Adoption+Psychology',
        isPublished: true,
        enrollmentCount: 145,
        rating: 4.80,
        ratingCount: 42,
        createdAt: new Date('2024-03-15'),
        updatedAt: new Date('2024-03-15'),
      },

      // ADVANCED LEVEL COURSES
      {
        id: uuidv4(),
        title: 'Complex AI Transformation Leadership',
        shortDescription: 'Lead multi-year, enterprise-wide AI transformations affecting thousands of employees.',
        description: 'This advanced course prepares you to lead large-scale AI transformation programs. Learn to orchestrate change across multiple departments, manage conflicting stakeholder interests, and make real-time strategy adjustments based on organizational pulse. Study failures at Duolingo, Lattice, and successes at Morgan Stanley, Rolls-Royce. Practice crisis prevention and navigate the 10-20-70 approach (10% algorithms, 20% tech/data, 70% people/processes).',
        category: 'AI Strategy',
        level: 'Advanced',
        duration: 45,
        instructorId: instructorId,
        imageUrl: 'https://via.placeholder.com/400x300?text=AI+Transformation+Leadership',
        isPublished: true,
        enrollmentCount: 76,
        rating: 4.95,
        ratingCount: 21,
        createdAt: new Date('2024-04-01'),
        updatedAt: new Date('2024-04-01'),
      },
      {
        id: uuidv4(),
        title: 'Strategic AI Change Management Execution',
        shortDescription: 'Execute comprehensive change programs with advanced techniques for adoption, communication, and training.',
        description: 'Master advanced change execution strategies including communication cascades, internal messaging for diverse audiences, town hall facilitation, and change champion coaching. Learn to measure adoption rates, employee sentiment, and engagement in real-time. Design training programs that transform mindsets, not just teach tools. This course includes simulations where you manage a crisis mid-implementation.',
        category: 'AI Strategy',
        level: 'Advanced',
        duration: 40,
        instructorId: instructorId,
        imageUrl: 'https://via.placeholder.com/400x300?text=Strategic+Change+Execution',
        isPublished: true,
        enrollmentCount: 67,
        rating: 4.88,
        ratingCount: 18,
        createdAt: new Date('2024-04-20'),
        updatedAt: new Date('2024-04-20'),
      },
      {
        id: uuidv4(),
        title: 'Crisis Prevention and Reputation Management',
        shortDescription: 'Protect organizations from reputational catastrophes during AI implementations.',
        description: 'Learn to identify warning signs before they become crises, develop scenario planning for AI announcements, and manage external reputation alongside internal trust. Study catastrophic failures (IgniteTech, CrowdStrike layoffs, Amazon disability discrimination) and learn what could have been done differently. Master the art of timing announcements, crafting authentic narratives, and preventing social media backlash. Includes legal risk assessment and compliance with NYC Local Law 144, Colorado AI Act, and EU AI Act.',
        category: 'AI Strategy',
        level: 'Advanced',
        duration: 38,
        instructorId: instructorId,
        imageUrl: 'https://via.placeholder.com/400x300?text=Crisis+Prevention',
        isPublished: true,
        enrollmentCount: 54,
        rating: 4.92,
        ratingCount: 15,
        createdAt: new Date('2024-05-05'),
        updatedAt: new Date('2024-05-05'),
      },
    ];

    // Insert courses
    await queryInterface.bulkInsert('courses', courses, {});

    // Create lessons for each course
    const lessons = [];
    
    // Lessons for "Introduction to AI Human Impact Strategy"
    const course1Id = courses[0].id;
    lessons.push(
      {
        id: uuidv4(),
        courseId: course1Id,
        title: 'Module 1: Why AI Projects Fail - The Human Factor',
        description: 'Understand the statistics: 95% of AI pilots fail, not due to technology but human resistance.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. McKinsey research shows that organizations spend millions on AI technology but only 10% on change management when they should spend 2x on the human side. This module explores real-world failures and what they teach us about the critical importance of human impact strategy.',
        type: 'Article',
        order: 1,
        duration: 45,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        courseId: course1Id,
        title: 'Module 2: The Three Pillars Framework',
        description: 'Deep dive into Human Impact Assessment, C-Level Advisory, and Change Orchestration.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. The three-pillar framework forms the foundation of effective AI Human Impact Strategy. Learn how each pillar supports organizational transformation and prevents catastrophic failures.',
        type: 'Video',
        order: 2,
        duration: 60,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        courseId: course1Id,
        title: 'Module 3: Case Study - Klarna vs. Morgan Stanley',
        description: 'Compare a failed approach with a successful one to understand what makes the difference.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Klarna replaced 700 customer service agents with AI, faced massive backlash, and had to reverse course. Morgan Stanley invested 2x in change management vs technology and achieved 98% adoption. What can we learn?',
        type: 'Article',
        order: 3,
        duration: 50,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        courseId: course1Id,
        title: 'Module 4: Your Role as the Strategic Bridge',
        description: 'Define your unique value proposition as an AI Human Impact Strategist.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. You are not a technologist, not traditional HR, but a strategic bridge between innovation and humanity. Learn how to position yourself and communicate your value to leadership.',
        type: 'Interactive',
        order: 4,
        duration: 40,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    );

    // Add similar lesson structures for other courses (abbreviated for space)
    for (let i = 1; i < courses.length; i++) {
      for (let j = 1; j <= 4; j++) {
        lessons.push({
          id: uuidv4(),
          courseId: courses[i].id,
          title: `Module ${j}: Core Concept ${j}`,
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
          type: ['Article', 'Video', 'Interactive'][j % 3],
          order: j,
          duration: 30 + (j * 10),
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    // Insert lessons
    await queryInterface.bulkInsert('lessons', lessons, {});

    console.log('✅ Successfully seeded 9 CAHIS certification courses with lessons');
  },

  down: async (queryInterface, Sequelize) => {
    // Delete lessons first (foreign key constraint)
    await queryInterface.bulkDelete('lessons', {
      courseId: {
        [Sequelize.Op.in]: queryInterface.sequelize.literal(
          `(SELECT id FROM courses WHERE title LIKE '%AI Human Impact%' OR title LIKE '%CAHIS%' OR title LIKE '%Change Management Basics%')`
        ),
      },
    }, {});

    // Delete courses
    await queryInterface.bulkDelete('courses', {
      [Sequelize.Op.or]: [
        { title: { [Sequelize.Op.like]: '%AI Human Impact%' } },
        { title: { [Sequelize.Op.like]: '%CAHIS%' } },
        { title: { [Sequelize.Op.like]: '%Change Management Basics%' } },
        { title: { [Sequelize.Op.like]: '%Human Impact Assessment%' } },
        { title: { [Sequelize.Op.like]: '%C-Level Communication%' } },
        { title: { [Sequelize.Op.like]: '%AI Adoption Psychology%' } },
        { title: { [Sequelize.Op.like]: '%AI Transformation Leadership%' } },
        { title: { [Sequelize.Op.like]: '%Strategic AI Change%' } },
        { title: { [Sequelize.Op.like]: '%Crisis Prevention%' } },
      ],
    }, {});

    console.log('✅ Successfully removed CAHIS course seed data');
  },
};

