-- ========================================
-- Blog Posts Seeding Script for Production
-- Run this in your Railway/Render PostgreSQL database
-- ========================================

-- Get admin user ID (assumes at least one exists)
-- If not, create the INSERT statement with the user ID you know exists

INSERT INTO blog_posts (
    id, title, slug, excerpt, content, category, tags, 
    featured_image, author_id, is_published, published_at, 
    view_count, created_at, updated_at
) VALUES 
(
    gen_random_uuid(),
    'The Hidden Cost of AI: Why 95% of Implementations Fail',
    'hidden-cost-ai-implementations-fail',
    'Organizations spend millions on AI technology but overlook the critical human factor. Discover why most AI projects fail and what successful companies do differently.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Industry Insights',
    '["AI Adoption","Change Management","Digital Transformation"]'::jsonb,
    'https://via.placeholder.com/800x400?text=AI+Implementation+Failures',
    (SELECT id FROM users LIMIT 1),
    true,
    '2024-09-15'::timestamp,
    1247,
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'Case Study: How Morgan Stanley Achieved 98% AI Adoption',
    'morgan-stanley-98-percent-ai-adoption',
    'A deep dive into Morgan Stanley''s successful AI transformation strategy that prioritized change management over technology.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit.',
    'Case Studies',
    '["Success Stories","Financial Services","Best Practices"]'::jsonb,
    'https://via.placeholder.com/800x400?text=Morgan+Stanley+Case+Study',
    (SELECT id FROM users LIMIT 1),
    true,
    '2024-09-28'::timestamp,
    892,
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'Navigating Employee Resistance: 5 Proven Strategies',
    'employee-resistance-proven-strategies',
    'Learn practical techniques for addressing and overcoming employee resistance during AI transformations.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae cum dixisset paulumque institisset, Quid est? Inquit, Piso, quod confidis.',
    'Best Practices',
    '["Employee Engagement","Change Management","Communication"]'::jsonb,
    'https://via.placeholder.com/800x400?text=Employee+Resistance+Strategies',
    (SELECT id FROM users LIMIT 1),
    true,
    '2024-10-05'::timestamp,
    1456,
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'The Klarna Controversy: What Went Wrong',
    'klarna-controversy-what-went-wrong',
    'An analysis of Klarna''s AI customer service rollout that led to public backlash and eventual reversal.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qui autem de summo bono dissentit de tota philosophiae ratione dissentit.',
    'Case Studies',
    '["Failure Analysis","Customer Service","Crisis Management"]'::jsonb,
    'https://via.placeholder.com/800x400?text=Klarna+Controversy',
    (SELECT id FROM users LIMIT 1),
    true,
    '2024-10-12'::timestamp,
    2134,
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'Building Trust During AI Transformation',
    'building-trust-ai-transformation',
    'Trust is the foundation of successful AI adoption. Learn how to establish and maintain it throughout your transformation journey.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quamquam tu hanc copiosiorem etiam soles dicere. Sic enim censent.',
    'Best Practices',
    '["Trust Building","Leadership","Organizational Culture"]'::jsonb,
    'https://via.placeholder.com/800x400?text=Building+Trust',
    (SELECT id FROM users LIMIT 1),
    true,
    '2024-10-18'::timestamp,
    1089,
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'The ROI of Human-Centered AI Implementation',
    'roi-human-centered-ai-implementation',
    'Quantifying the business value of investing in the human side of AI transformation.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quarum omnium una definitio satis magna cum securitate est cognitio.',
    'Industry Insights',
    '["ROI","Business Value","Metrics"]'::jsonb,
    'https://via.placeholder.com/800x400?text=ROI+Human-Centered+AI',
    (SELECT id FROM users LIMIT 1),
    true,
    '2024-10-20'::timestamp,
    743,
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'Communication Strategies for AI Announcements',
    'communication-strategies-ai-announcements',
    'How to craft and deliver AI transformation announcements that inspire rather than frighten your workforce.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ad rem redeamus. Satisne ergo pudori consulat si quis sine teste libidini.',
    'Tips & Tricks',
    '["Communication","Leadership","Messaging"]'::jsonb,
    'https://via.placeholder.com/800x400?text=Communication+Strategies',
    (SELECT id FROM users LIMIT 1),
    true,
    '2024-10-21'::timestamp,
    967,
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'Legal Compliance in AI HR Systems: A 2024 Guide',
    'legal-compliance-ai-hr-systems-2024',
    'Navigate the evolving regulatory landscape including NYC Local Law 144, EU AI Act, and Colorado AI Act.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quod si ita est, sequitur id ipsum quod te velle video.',
    'Industry Insights',
    '["Compliance","Legal","Regulation","HR Technology"]'::jsonb,
    'https://via.placeholder.com/800x400?text=Legal+Compliance+AI',
    (SELECT id FROM users LIMIT 1),
    true,
    '2024-10-22'::timestamp,
    1523,
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'Creating Your AI Human Impact Assessment Framework',
    'creating-ai-human-impact-assessment-framework',
    'A step-by-step guide to building your organization''s Human Impact Assessment process.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tum Lucius: Mihi vero ista valde probata sunt, quod item fratri puto.',
    'Best Practices',
    '["Assessment","Framework","Methodology"]'::jsonb,
    'https://via.placeholder.com/800x400?text=Impact+Assessment+Framework',
    (SELECT id FROM users LIMIT 1),
    true,
    '2024-10-23'::timestamp,
    1891,
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'The Future of Work: Humans and AI Collaboration',
    'future-of-work-humans-ai-collaboration',
    'Exploring the evolving relationship between human workers and AI systems in the workplace of tomorrow.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quod quidem mihi videatur, etsi satis est ad id ipsum me cognosse.',
    'General',
    '["Future of Work","Collaboration","Innovation"]'::jsonb,
    'https://via.placeholder.com/800x400?text=Future+of+Work',
    (SELECT id FROM users LIMIT 1),
    true,
    '2024-10-24'::timestamp,
    658,
    NOW(),
    NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- Verify the inserts
SELECT COUNT(*) as "Total Blog Posts Seeded" FROM blog_posts WHERE slug IN (
    'hidden-cost-ai-implementations-fail',
    'morgan-stanley-98-percent-ai-adoption',
    'employee-resistance-proven-strategies',
    'klarna-controversy-what-went-wrong',
    'building-trust-ai-transformation',
    'roi-human-centered-ai-implementation',
    'communication-strategies-ai-announcements',
    'legal-compliance-ai-hr-systems-2024',
    'creating-ai-human-impact-assessment-framework',
    'future-of-work-humans-ai-collaboration'
);

