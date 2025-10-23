/**
 * Auto-seed Blog Posts on Startup
 * This ensures blog posts exist in the database without manual intervention
 */

const { BlogPost, User } = require('../models');
const { v4: uuidv4 } = require('uuid');

const BLOG_POSTS = [
  {
    id: uuidv4(),
    title: 'The Hidden Cost of AI: Why 95% of Implementations Fail',
    slug: 'hidden-cost-ai-implementations-fail',
    excerpt: 'Organizations spend millions on AI technology but overlook the critical human factor. Discover why most AI projects fail and what successful companies do differently.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    category: 'Industry Insights',
    tags: ['AI Adoption', 'Change Management', 'Digital Transformation'],
    featuredImage: 'https://via.placeholder.com/800x400?text=AI+Implementation+Failures',
    isPublished: true,
    publishedAt: new Date('2024-09-15'),
    viewCount: 1247,
  },
  {
    id: uuidv4(),
    title: 'Case Study: How Morgan Stanley Achieved 98% AI Adoption',
    slug: 'morgan-stanley-98-percent-ai-adoption',
    excerpt: 'A deep dive into Morgan Stanley\'s successful AI transformation strategy that prioritized change management over technology.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.',
    category: 'Case Studies',
    tags: ['Success Stories', 'Financial Services', 'Best Practices'],
    featuredImage: 'https://via.placeholder.com/800x400?text=Morgan+Stanley+Case+Study',
    isPublished: true,
    publishedAt: new Date('2024-09-28'),
    viewCount: 892,
  },
  {
    id: uuidv4(),
    title: 'Navigating Employee Resistance: 5 Proven Strategies',
    slug: 'employee-resistance-proven-strategies',
    excerpt: 'Learn practical techniques for addressing and overcoming employee resistance during AI transformations.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae cum dixisset paulumque institisset, Quid est? Inquit, Piso, quod confidis quicquam nobis hoc dicere?',
    category: 'Best Practices',
    tags: ['Employee Engagement', 'Change Management', 'Communication'],
    featuredImage: 'https://via.placeholder.com/800x400?text=Employee+Resistance+Strategies',
    isPublished: true,
    publishedAt: new Date('2024-10-05'),
    viewCount: 1456,
  },
  {
    id: uuidv4(),
    title: 'The Klarna Controversy: What Went Wrong',
    slug: 'klarna-controversy-what-went-wrong',
    excerpt: 'An analysis of Klarna\'s AI customer service rollout that led to public backlash and eventual reversal.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qui autem de summo bono dissentit de tota philosophiae ratione dissentit. Cum enim ad inveniendam veritatem omnis philosophia effecta sit.',
    category: 'Case Studies',
    tags: ['Failure Analysis', 'Customer Service', 'Crisis Management'],
    featuredImage: 'https://via.placeholder.com/800x400?text=Klarna+Controversy',
    isPublished: true,
    publishedAt: new Date('2024-10-12'),
    viewCount: 2134,
  },
  {
    id: uuidv4(),
    title: 'Building Trust During AI Transformation',
    slug: 'building-trust-ai-transformation',
    excerpt: 'Trust is the foundation of successful AI adoption. Learn how to establish and maintain it throughout your transformation journey.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quamquam tu hanc copiosiorem etiam soles dicere. Sic enim censent, oportunitatis esse beate vivere.',
    category: 'Best Practices',
    tags: ['Trust Building', 'Leadership', 'Organizational Culture'],
    featuredImage: 'https://via.placeholder.com/800x400?text=Building+Trust',
    isPublished: true,
    publishedAt: new Date('2024-10-18'),
    viewCount: 1089,
  },
  {
    id: uuidv4(),
    title: 'The ROI of Human-Centered AI Implementation',
    slug: 'roi-human-centered-ai-implementation',
    excerpt: 'Quantifying the business value of investing in the human side of AI transformation.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quarum omnium una definitio satis magna cum securitate est cognitio, quae certior vel verior probari non potest.',
    category: 'Industry Insights',
    tags: ['ROI', 'Business Value', 'Metrics'],
    featuredImage: 'https://via.placeholder.com/800x400?text=ROI+Human-Centered+AI',
    isPublished: true,
    publishedAt: new Date('2024-10-20'),
    viewCount: 743,
  },
  {
    id: uuidv4(),
    title: 'Communication Strategies for AI Announcements',
    slug: 'communication-strategies-ai-announcements',
    excerpt: 'How to craft and deliver AI transformation announcements that inspire rather than frighten your workforce.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ad rem redeamus. Satisne ergo pudori consulat si quis sine teste libidini pareat?',
    category: 'Tips & Tricks',
    tags: ['Communication', 'Leadership', 'Messaging'],
    featuredImage: 'https://via.placeholder.com/800x400?text=Communication+Strategies',
    isPublished: true,
    publishedAt: new Date('2024-10-21'),
    viewCount: 967,
  },
  {
    id: uuidv4(),
    title: 'Legal Compliance in AI HR Systems: A 2024 Guide',
    slug: 'legal-compliance-ai-hr-systems-2024',
    excerpt: 'Navigate the evolving regulatory landscape including NYC Local Law 144, EU AI Act, and Colorado AI Act.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quod si ita est, sequitur id ipsum quod te velle video, omnes semper beatos esse sapientes.',
    category: 'Industry Insights',
    tags: ['Compliance', 'Legal', 'Regulation', 'HR Technology'],
    featuredImage: 'https://via.placeholder.com/800x400?text=Legal+Compliance+AI',
    isPublished: true,
    publishedAt: new Date('2024-10-22'),
    viewCount: 1523,
  },
  {
    id: uuidv4(),
    title: 'Creating Your AI Human Impact Assessment Framework',
    slug: 'creating-ai-human-impact-assessment-framework',
    excerpt: 'A step-by-step guide to building your organization\'s Human Impact Assessment process.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tum Lucius: Mihi vero ista valde probata sunt, quod item fratri puto. Tum mihi Piso: Quid ergo?',
    category: 'Best Practices',
    tags: ['Assessment', 'Framework', 'Methodology'],
    featuredImage: 'https://via.placeholder.com/800x400?text=Impact+Assessment+Framework',
    isPublished: true,
    publishedAt: new Date('2024-10-23'),
    viewCount: 1891,
  },
  {
    id: uuidv4(),
    title: 'The Future of Work: Humans and AI Collaboration',
    slug: 'future-of-work-humans-ai-collaboration',
    excerpt: 'Exploring the evolving relationship between human workers and AI systems in the workplace of tomorrow.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quod quidem mihi videatur, etsi satis est ad id ipsum me cognosse ut id possim, tamen eius rei libet cognoscere.',
    category: 'General',
    tags: ['Future of Work', 'Collaboration', 'Innovation'],
    featuredImage: 'https://via.placeholder.com/800x400?text=Future+of+Work',
    isPublished: true,
    publishedAt: new Date('2024-10-24'),
    viewCount: 658,
  },
];

async function autoSeedBlog() {
  try {
    // Check if blog posts already exist
    const count = await BlogPost.count();
    
    if (count > 0) {
      console.log('✅ Blog posts already seeded, skipping...');
      return;
    }

    console.log('🌱 Auto-seeding blog posts...');

    // Get or create an admin user
    let admin = await User.findOne({ where: { role: 'admin' } });
    
    if (!admin) {
      admin = await User.findOne({ limit: 1 });
    }

    if (!admin) {
      console.log('⚠️  No users found, cannot seed blog posts');
      return;
    }

    // Add author ID to each post
    const postsWithAuthor = BLOG_POSTS.map(post => ({
      ...post,
      authorId: admin.id,
    }));

    // Seed posts
    await BlogPost.bulkCreate(postsWithAuthor, { 
      ignoreDuplicates: true 
    });

    console.log('✅ Blog posts seeded successfully! (10 posts)');
  } catch (error) {
    console.error('⚠️  Error auto-seeding blog posts:', error.message);
    // Don't throw - this is non-critical
  }
}

module.exports = { autoSeedBlog };
