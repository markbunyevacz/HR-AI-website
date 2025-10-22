'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get a user to be the author
    const [users] = await queryInterface.sequelize.query(
      `SELECT id FROM users LIMIT 1;`
    );

    if (users.length === 0) {
      console.log('⚠️  No users found. Please create users before seeding blog posts.');
      return;
    }

    const authorId = users[0].id;

    const blogPosts = [
      {
        id: uuidv4(),
        title: 'The Hidden Cost of AI: Why 95% of Implementations Fail',
        slug: 'hidden-cost-ai-implementations-fail',
        excerpt: 'Organizations spend millions on AI technology but overlook the critical human factor. Discover why most AI projects fail and what successful companies do differently.',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`,
        category: 'Industry Insights',
        tags: ['AI Adoption', 'Change Management', 'Digital Transformation'],
        featuredImage: 'https://via.placeholder.com/800x400?text=AI+Implementation+Failures',
        authorId: authorId,
        isPublished: true,
        publishedAt: new Date('2024-09-15'),
        viewCount: 1247,
        createdAt: new Date('2024-09-15'),
        updatedAt: new Date('2024-09-15'),
      },
      {
        id: uuidv4(),
        title: 'Case Study: How Morgan Stanley Achieved 98% AI Adoption',
        slug: 'morgan-stanley-98-percent-ai-adoption',
        excerpt: 'A deep dive into Morgan Stanley\'s successful AI transformation strategy that prioritized change management over technology.',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.

Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.

Hanc ego cum tene sententiam, quid est cur verear ne ad eam non possim accommodare Torquatos nostros? Quos tu paulo ante cum memoriter, tum etiam erga nos amice et benivole collegisti, nec me tamen laudandis maioribus meis corrupisti nec segniorem ad respondendum reddidisti.

Quamquam id quidem licebit iis existimare qui legerint. Nos commodius agimus. Non enim solum Torquatus dixit quid sentiret sed etiam cur. Quod quidem cum audissem, adiutus sum.`,
        category: 'Case Studies',
        tags: ['Success Stories', 'Financial Services', 'Best Practices'],
        featuredImage: 'https://via.placeholder.com/800x400?text=Morgan+Stanley+Case+Study',
        authorId: authorId,
        isPublished: true,
        publishedAt: new Date('2024-09-28'),
        viewCount: 892,
        createdAt: new Date('2024-09-28'),
        updatedAt: new Date('2024-09-28'),
      },
      {
        id: uuidv4(),
        title: 'Navigating Employee Resistance: 5 Proven Strategies',
        slug: 'employee-resistance-proven-strategies',
        excerpt: 'Learn practical techniques for addressing and overcoming employee resistance during AI transformations.',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae cum dixisset paulumque institisset, Quid est? Inquit, Piso, quod confidis quicquam nobis hoc dicere? Vides me et Triarium studuisse omnem orationem tuam, cuius causa hoc ipsum pateris.

Nam quibusdam  quoquo modo intellegunt quid velint, quid optent, ad id omnia referunt, neque progrediuntur longius, idque faciunt ut autem curam, qua nihil efficiant, quasi negotia aliqua occupati, perseverare se arbitrentur.

Quod si ita se habeat, cur opera philosophiae sit danda nescio. Sin autem ad animorum affectiones animadversae aliquae molestiae sensus aliquis oriatur, cum accedit ratio et intelligitur ea non posse neglegi, tum fit ut opus sit ea curatio adhibenda.

At etiam Athenis, ut e patre audiebam facete et urbane Stoicos irridente, statua est in Ceramico Chrysippi sedentis porrecta manu, quae manus significet illum in hac esse rogatiuncula delectatum.`,
        category: 'Best Practices',
        tags: ['Employee Engagement', 'Change Management', 'Communication'],
        featuredImage: 'https://via.placeholder.com/800x400?text=Employee+Resistance+Strategies',
        authorId: authorId,
        isPublished: true,
        publishedAt: new Date('2024-10-05'),
        viewCount: 1456,
        createdAt: new Date('2024-10-05'),
        updatedAt: new Date('2024-10-05'),
      },
      {
        id: uuidv4(),
        title: 'The Klarna Controversy: What Went Wrong',
        slug: 'klarna-controversy-what-went-wrong',
        excerpt: 'An analysis of Klarna\'s AI customer service rollout that led to public backlash and eventual reversal.',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qui autem de summo bono dissentit de tota philosophiae ratione dissentit. Cum enim ad inveniendam veritatem omnis philosophia effecta sit, ad eam non modo non venitur sed capitur etiam, si summa rerum expetendarum ignoratur.

Quod autem a te disputatum est, ex eo quidem te concedo agere sapienter, sed nihilo magis efficis quo velis. Omnia enim quae dixeris, cum maximae sint momenti ad beatam vitam, quae efficere possit unus quispiam beatae vitae modus, iis ipsis omnibus nihil est nisi dolor remissus.

Nam cum facilius posset voluptatem persequi si ab omni molestia vacaret, et cum id ipsum in quo erat spes omnis esset maxime adipiscendum, videbat tamen ob eam causam se impotentem habere omnia quae voluit.

Nunc autem si dixerimus nos in voluptate conquiescere, statim reprehendetur, quod hominis naturam et dignitatem non intuemur. Sin autem ad omnia aut honestatem aut utilitatem aut voluptatem referemus, nihil dici poterit quod non ad eorum aliquid referatur.`,
        category: 'Case Studies',
        tags: ['Failure Analysis', 'Customer Service', 'Crisis Management'],
        featuredImage: 'https://via.placeholder.com/800x400?text=Klarna+Controversy',
        authorId: authorId,
        isPublished: true,
        publishedAt: new Date('2024-10-12'),
        viewCount: 2134,
        createdAt: new Date('2024-10-12'),
        updatedAt: new Date('2024-10-12'),
      },
      {
        id: uuidv4(),
        title: 'Building Trust During AI Transformation',
        slug: 'building-trust-ai-transformation',
        excerpt: 'Trust is the foundation of successful AI adoption. Learn how to establish and maintain it throughout your transformation journey.',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quamquam tu hanc copiosiorem etiam soles dicere. Sic enim censent, oportunitatis esse beate vivere. Hanc quoque iucunditatem si vis a corpore, perspicuum est quod et a voluptate et ab ulla corporis affectione vacare possis.

Quae est igitur illa causa cur dicas summum bonum esse voluptatem? Nec vero sum nescius esse utilitatem in historia, non modo voluptatem. Prodest enim testimonia cognovisse veteris aevi, et delectat quosdam, et sic audiunt quaedam quae non audierunt antea.

At multis malis affectus Epicurus in diuturno dolore est mortuus. Videsne igitur ut ex una voluptate plures nascantur curae? Ut enim mors contemnitur quae una contemnenda maxime est, sic ceterae molestiae et labores haud magni putantur.

Quod si ita se haberet, non appellareris, sed probareris, modo sine invidia. Nunc autem necesse est et reprehendi et vituperari. Atque haec coniunctio confusioque virtutum tamen a philosophis ratione quadam distinguitur.`,
        category: 'Best Practices',
        tags: ['Trust Building', 'Leadership', 'Organizational Culture'],
        featuredImage: 'https://via.placeholder.com/800x400?text=Building+Trust',
        authorId: authorId,
        isPublished: true,
        publishedAt: new Date('2024-10-18'),
        viewCount: 1089,
        createdAt: new Date('2024-10-18'),
        updatedAt: new Date('2024-10-18'),
      },
      {
        id: uuidv4(),
        title: 'The ROI of Human-Centered AI Implementation',
        slug: 'roi-human-centered-ai-implementation',
        excerpt: 'Quantifying the business value of investing in the human side of AI transformation.',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quarum omnium una definitio satis magna cum securitate est cognitio, quae certior vel verior probari non potest et error quam qui delectat et qui turpis est periculosissimus.

Atque ut odia, invidiae, despicationes adversantur voluptatibus, sic amicitiae non solum fautrices fidelissimae sunt voluptatum sed etiam effectrices magnarum voluptatum et saepe aliarum ex aliarum progressu, quae sunt consecutae ex primis.

Quae cum praeponunt, ut sit aliqua rerum selectio, naturam videtur habere ducem. Prioris generis est docilitas, memoria; quod appello valetudinem, vires, pulchritudo, cetera generis eiusdem. Voluptatem autem inter haec non numerat.

Nec tamen ullo modo summum pecudis bonum et hominis idem esse potest. Nam si ea sola voluptas esset quae quasi titillaret sensus, ut ita dicam, et ad eos cum suavitate afflueret et illaberetur, nec manus nec pes nec pars ulla corporis sentiret.`,
        category: 'Industry Insights',
        tags: ['ROI', 'Business Value', 'Metrics'],
        featuredImage: 'https://via.placeholder.com/800x400?text=ROI+Human-Centered+AI',
        authorId: authorId,
        isPublished: true,
        publishedAt: new Date('2024-10-20'),
        viewCount: 743,
        createdAt: new Date('2024-10-20'),
        updatedAt: new Date('2024-10-20'),
      },
      {
        id: uuidv4(),
        title: 'Communication Strategies for AI Announcements',
        slug: 'communication-strategies-ai-announcements',
        excerpt: 'How to craft and deliver AI transformation announcements that inspire rather than frighten your workforce.',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ad rem redeamus. Satisne ergo pudori consulat si quis sine teste libidini pareat? An vero displicuit ea quae tributa atque a me confessa sunt, id solum bonum esse, quod honestum sit?

Quod quia nullo modo sine sapient dicendum est, propterea quod natura suum, ita ut non possit aliter se habere dissimili omnino genere ac multo etiam magis excellenti quodam modo, nec tamen efficiet ut beatior sit quispiam.

Istius quidem, inquam, Piso, si, quicquid poterit, haud equidem invideo, alter putet. Potius inflammat, ut coercendi magis quam dedocendi esse videantur. Vos autem cum perspicuis dubia debeatis illustrare, dubiis perspicua vultis tollere.

Sed haec omittamus; illud est enim bene constitutum, ut si quidem efficere poterimus quo modo id fieri vera dicat Epicurus, id est, si poterimus ostendere ab animi perturbationibus affectum esse Epicurum.`,
        category: 'Tips & Tricks',
        tags: ['Communication', 'Leadership', 'Messaging'],
        featuredImage: 'https://via.placeholder.com/800x400?text=Communication+Strategies',
        authorId: authorId,
        isPublished: true,
        publishedAt: new Date('2024-10-21'),
        viewCount: 967,
        createdAt: new Date('2024-10-21'),
        updatedAt: new Date('2024-10-21'),
      },
      {
        id: uuidv4(),
        title: 'Legal Compliance in AI HR Systems: A 2024 Guide',
        slug: 'legal-compliance-ai-hr-systems-2024',
        excerpt: 'Navigate the evolving regulatory landscape including NYC Local Law 144, EU AI Act, and Colorado AI Act.',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quod si ita est, sequitur id ipsum quod te velle video, omnes semper beatos esse sapientes. Quid ergo? inquit; audire enim cupio, quid non probes. Principio, inquam, in physicis, quibus maxime gloriatur, primum totus est alienus.

Democritea dicit perpauca mutans, sed ita mendose, ut putet ea quae corrigere vult mihi quidem depravare. Ille atomos quas appellat, id est corpora individua propter soliditatem, censet in infinito inani, in quo nihil nec summum nec infimum nec medium nec ultimum nec extremum sit, ita ferri.

Atque his de rebus et splendida est eorum et illustris oratio. Res vero bonae verbis electis graviter ornateque dictas non habemus, nec ullam omnino copiam rerum ac sententiarum.

Quem Tiberina descensio festo illo die tanto gaudio affecit, quanto L. Paullum morti civis eripi vidimus. Illi enim inter sese dissident. Nos vero, inquit ille; sed uti oratione perpetua malo quam interrogare aut interrogari.`,
        category: 'Industry Insights',
        tags: ['Compliance', 'Legal', 'Regulation', 'HR Technology'],
        featuredImage: 'https://via.placeholder.com/800x400?text=Legal+Compliance+AI',
        authorId: authorId,
        isPublished: true,
        publishedAt: new Date('2024-10-22'),
        viewCount: 1523,
        createdAt: new Date('2024-10-22'),
        updatedAt: new Date('2024-10-22'),
      },
      {
        id: uuidv4(),
        title: 'Creating Your AI Human Impact Assessment Framework',
        slug: 'creating-ai-human-impact-assessment-framework',
        excerpt: 'A step-by-step guide to building your organization\'s Human Impact Assessment process.',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tum Lucius: Mihi vero ista valde probata sunt, quod item fratri puto. Tum mihi Piso: Quid ergo? Tu ne in ista quidem plura requiris? Iam ille solos felicis sapit dixerit.

Cur post Tarentum ad Archytam? Qua ex cognitione facilior facta est investigatio rerum occultissimarum. An potest cupiditas finiri? Inde sermone vario sex illa a Dipylo stadia confecimus. Post enim Chrysippum eum non sane est dubium quin ad hanc disputationem.

Maximas vero virtutes iacere omnis necesse est voluptate dominante. Tamen a proposito, inquam, aberramus. Non enim de hoc tantum sed et de aliis quibusdam naturis consuetudo locum invenit, ut iam nihil tam contrarium sit naturae quam non videatur esse naturale.

Quae sequitur, inquit, mala cum pavor, cum aegritudo, cum conscientia. Licet enim non modo praeterere quas laudavisti, sed alias etiam addere, quarum meminit ipse Epicurus solisque eas delectat.`,
        category: 'Best Practices',
        tags: ['Assessment', 'Framework', 'Methodology'],
        featuredImage: 'https://via.placeholder.com/800x400?text=Impact+Assessment+Framework',
        authorId: authorId,
        isPublished: true,
        publishedAt: new Date('2024-10-23'),
        viewCount: 1891,
        createdAt: new Date('2024-10-23'),
        updatedAt: new Date('2024-10-23'),
      },
      {
        id: uuidv4(),
        title: 'The Future of Work: Humans and AI Collaboration',
        slug: 'future-of-work-humans-ai-collaboration',
        excerpt: 'Exploring the evolving relationship between human workers and AI systems in the workplace of tomorrow.',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quod quidem mihi videatur, etsi satis est ad id ipsum me cognosse ut id possim, tamen eius rei libet cognoscere et causas et vias. Habes, inquam, Cato, formam eorum de quibus loquor philosophorum.

Quibus ego assentior, dum modo de iis rebus loquantur, quarum progressio quaedam ab appetitione principiorum naturae profecta sit, in qua ipsa appetitio tamquam fundamentum quoddam habeat, cuius vi et natura omne quod factum sit existimetur esse rectum.

Quid dubitas igitur mutare principia naturae? Nam si amicitiam Epicurus ad voluptatem refugit, sine qua non posse, ut ait, iucunde vivi, eam ipsam causam habeat cur se amet. Quae quo sunt excelsiores, eo dant clariora indicia naturae.

Quamquam haec quidem praeposita recte et fortasse melius verae quam falsa philosophia appellari possent; sed ne id quidem facit. Ut enim obscurentur multae, si omnes illustrantur, sic nonnullae etiam deleri possunt.`,
        category: 'General',
        tags: ['Future of Work', 'Collaboration', 'Innovation'],
        featuredImage: 'https://via.placeholder.com/800x400?text=Future+of+Work',
        authorId: authorId,
        isPublished: true,
        publishedAt: new Date('2024-10-24'),
        viewCount: 658,
        createdAt: new Date('2024-10-24'),
        updatedAt: new Date('2024-10-24'),
      },
    ];

    await queryInterface.bulkInsert('blog_posts', blogPosts, {});
    console.log('✅ Successfully seeded 10 blog posts with lorem ipsum content');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('blog_posts', {
      slug: {
        [Sequelize.Op.in]: [
          'hidden-cost-ai-implementations-fail',
          'morgan-stanley-98-percent-ai-adoption',
          'employee-resistance-proven-strategies',
          'klarna-controversy-what-went-wrong',
          'building-trust-ai-transformation',
          'roi-human-centered-ai-implementation',
          'communication-strategies-ai-announcements',
          'legal-compliance-ai-hr-systems-2024',
          'creating-ai-human-impact-assessment-framework',
          'future-of-work-humans-ai-collaboration',
        ],
      },
    }, {});

    console.log('✅ Successfully removed blog post seed data');
  },
};

