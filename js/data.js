/* ============================================================
   PORTAL DATA — Bilingual content, LLM benchmarks, AI people
   ============================================================ */

/* ---------- BILINGUAL CONTENT ---------- */
const CONTENT = {
  en: {
    nav: {
      logo: 'HR',
      links: ['Journey', 'Projects', 'LLM Hub', 'AI Feed', 'GitHub'],
      toggle: 'EN'
    },
    hero: {
      eyebrow: 'Durham · ex-Baidu · 2026',
      name_zh: '贺睿',
      name_sep: '/',
      name_en: 'Reina',
      desc_line1: 'Something about AI keeps me up at night —',
      desc_line2: 'it scores 95% on benchmarks and then',
      desc_line3: 'stumbles in the simplest real conversations.',
      desc_accent: 'I build things to figure out why.',
      cta_primary: 'View Projects',
      cta_ghost: 'Download Résumé',
      scroll_hint: 'SCROLL'
    },
    journey: {
      title: 'THE JOURNEY',
      subtitle: 'From business foundations to the frontier of AI product engineering.',
      items: [
        {
          date: '2025.09 — PRESENT',
          org: 'Durham University',
          role: 'MSc Data Science',
          current: true,
          body: 'Advanced study in machine learning, statistical inference, text mining, and AI ethics. Building on a cross-disciplinary foundation that spans economics, product thinking, and computational methods.',
          metrics: ['Machine Learning', 'Text Mining', 'AI Ethics', 'Data Visualization']
        },
        {
          date: '2025.05 — 2025.09',
          org: 'Baidu · ACG Business Group',
          role: 'AI Product Manager — Financial Intelligent Customer Service',
          body: 'Designed multi-turn dialogue systems for loan progress queries at scale. Architected intent decomposition flows and clarification strategies that fundamentally changed the service economics.',
          metrics: ['85% → 35% Transfer Rate', '60%+ Auto-Resolution', '30% Drop-off Reduction', '100% Path Coverage']
        },
        {
          date: '2024.01 — 2025.02',
          org: 'Shanghai Zhixiang Business Services',
          role: 'Research Consultant — AI SaaS Hiring Intelligence',
          body: 'Led a full-cycle research program evaluating AI recruitment tools. Conducted 20+ in-depth interviews, processed 1,000+ survey responses with Python/Pandas, and published three reports reaching 15,000+ enterprise readers.',
          metrics: ['20+ Expert Interviews', '1000+ Survey Responses', '3 Published Reports', '15k+ Reads']
        },
        {
          date: '2019.09 — 2023.06',
          org: 'Zhongnan University of Forestry & Technology',
          role: 'BBA — Business Administration',
          body: 'National Second-class Scholarship recipient. Core coursework spanning economics, probability & statistics, linear algebra, and Python programming. Participated in multiple national competitions.',
          metrics: ['National Scholarship', 'Python', 'Statistics', 'Econometrics']
        }
      ]
    },
    projects: {
      title: 'PROJECT NEXUS',
      subtitle: 'Systems built at the intersection of physics, intelligence, and interaction.',
      items: [
        {
          featured: true,
          label: 'Featured · Physics × AI',
          title: 'GraviChoice',
          desc: 'A decision assistant that maps your pros and cons into weighted spheres, then lets physics decide. GLM-5.0 analyzes semantic weight; Matter.js simulates gravity on a balance scale. Intuition made tangible.',
          tech: ['Matter.js 0.19', 'GLM-5.0 API', 'Vanilla JS', 'Vercel'],
          link_text: 'View Project →',
          link_href: 'GraviChoice_决策助手/index.html'
        },
        {
          label: 'Game · React · AI',
          title: 'Texas Hold\'em Pro',
          desc: '7-player Texas Hold\'em with AI opponents. Full game loop — chip tracking, blind structure, hand rankings, and a tutorial system. Built in React 18 via CDN, no build step.',
          tech: ['React 18', 'Tailwind CSS', 'Babel/JSX', 'Animate.css']
        },
        {
          label: 'Research · ML · Streamlit',
          title: 'Academic Tendency Predictor',
          desc: 'Random Forest vs XGBoost comparison for predicting student outcomes. Feature importance via SHAP values. 82%+ accuracy with K-Fold validation. Deployed as interactive Streamlit app.',
          tech: ['XGBoost', 'scikit-learn', 'SHAP', 'Streamlit', 'Pandas']
        }
      ]
    },
    llm: {
      title: 'LLM INTELLIGENCE HUB',
      subtitle: 'Authoritative benchmark data from LMSYS Chatbot Arena, HuggingFace Open LLM Leaderboard, and LiveCodeBench.',
      tab_arena: 'Arena Elo',
      tab_bench: 'Multi-Benchmark',
      radar_title: 'Capability Radar',
      footnote: 'Data sourced from LMSYS Chatbot Arena leaderboard, HuggingFace Open LLM Leaderboard, and published model technical reports. Scores are approximate and reflect the state of publicly available benchmarks at time of collection. Methodology varies across evaluations.'
    },
    feed: {
      title: 'AI CURATED FEED',
      subtitle: 'Thinkers, builders, and voices shaping the intelligence frontier. Kept in original language.',
      heading_people: 'Thought Leaders',
      heading_podcasts: 'Essential Listening'
    },
    github: {
      title: 'GITHUB PULSE',
      subtitle: 'Trending AI repositories, live from the GitHub API.',
      live: 'LIVE DATA',
      tab_llm: 'LLM',
      tab_agent: 'Agents',
      tab_multimodal: 'Multimodal',
      error: 'Could not reach GitHub API. Showing curated picks instead.',
      stars: 'stars'
    },
    footer: {
      copy: '© 2026 He Rui · Built with precision',
      email: 'chaosfrey@gmail.com',
      github: 'GitHub'
    }
  },

  zh: {
    nav: {
      logo: 'HR',
      links: ['旅程', '项目', 'LLM榜单', 'AI资讯', 'GitHub'],
      toggle: 'CN'
    },
    hero: {
      eyebrow: '杜伦大学 · 前百度 · 2026',
      name_zh: '贺睿',
      name_sep: '/',
      name_en: 'Reina',
      desc_line1: '有个问题困扰了我很久——',
      desc_line2: '为什么榜单上分数很高的模型，',
      desc_line3: '在最普通的真实对话里却频频翻车？',
      desc_accent: '我在用做东西的方式找答案。',
      cta_primary: '查看项目',
      cta_ghost: '下载简历',
      scroll_hint: '滚动'
    },
    journey: {
      title: '成长轨迹',
      subtitle: '从商科基础出发，走向AI产品工程的最前沿。',
      items: [
        {
          date: '2025.09 — 至今',
          org: '杜伦大学',
          role: '数据科学 理学硕士',
          current: true,
          body: '深入研究机器学习、统计推断、文本挖掘与AI伦理。以跨学科视角——融合经济学、产品思维与计算方法——构建前沿AI系统能力。',
          metrics: ['机器学习', '文本挖掘', 'AI伦理', '数据可视化']
        },
        {
          date: '2025.05 — 2025.09',
          org: '百度 · ACG事业群',
          role: 'AI产品经理 — 金融智能客服',
          body: '为贷款进度查询设计多轮对话系统。通过意图分解与澄清策略的精细化设计，从根本上重构了服务经济模型，实现关键指标的大幅跃升。',
          metrics: ['转接率 85%→35%', '自助解决率 60%+', '关键节点流失降低30%', '全路径监控覆盖100%']
        },
        {
          date: '2024.01 — 2025.02',
          org: '上海智翔商务服务',
          role: '咨询顾问 — AI SaaS招聘智能',
          body: '主导AI招聘工具全周期研究项目。深度访谈20+行业专家，以Python/Pandas处理1000+份问卷，发布三份企业研究报告，累计覆盖15000+企业读者。',
          metrics: ['20+专家访谈', '1000+份问卷', '3篇研究报告', '1.5万+阅读量']
        },
        {
          date: '2019.09 — 2023.06',
          org: '中南林业科技大学',
          role: '工商管理 学士',
          body: '国家二等奖学金获得者。核心课程涵盖经济学、概率统计、线性代数及Python编程，参与多项全国竞赛。',
          metrics: ['国家奖学金', 'Python', '统计学', '计量经济学']
        }
      ]
    },
    projects: {
      title: '项目矩阵',
      subtitle: '在物理、智能与交互的交汇处构建的系统。',
      items: [
        {
          featured: true,
          label: '精选项目 · 物理 × AI',
          title: 'GraviChoice 决策助手',
          desc: '将你的利弊转化为有质量的球体，让物理学做出决定。GLM-5.0分析每条观点的语义权重；Matter.js在虚拟天平上模拟重力效果。直觉，变得可触可感。',
          tech: ['Matter.js 0.19', 'GLM-5.0 API', '原生 JS', 'Vercel'],
          link_text: '查看项目 →',
          link_href: 'GraviChoice_决策助手/index.html'
        },
        {
          label: '游戏 · React · AI',
          title: '德州扑克 Pro',
          desc: '7人德州扑克，含AI对手。完整游戏循环——筹码追踪、盲注结构、牌型判断和新手教程。基于CDN版React 18构建，无需构建步骤。',
          tech: ['React 18', 'Tailwind CSS', 'Babel/JSX', 'Animate.css']
        },
        {
          label: '研究 · 机器学习 · Streamlit',
          title: '学业倾向预测系统',
          desc: '随机森林 vs XGBoost的学生学业结果预测对比实验。SHAP值特征重要性分析，K折交叉验证，82%+准确率，部署为Streamlit交互应用。',
          tech: ['XGBoost', 'scikit-learn', 'SHAP', 'Streamlit', 'Pandas']
        }
      ]
    },
    llm: {
      title: 'LLM 全球能力榜',
      subtitle: '来自 LMSYS Chatbot Arena、HuggingFace Open LLM Leaderboard 和 LiveCodeBench 的权威基准数据。',
      tab_arena: 'Arena对战榜',
      tab_bench: '多维基准',
      radar_title: '能力雷达图',
      footnote: '数据来源：LMSYS Chatbot Arena 排行榜、HuggingFace Open LLM Leaderboard 及各模型官方技术报告。分数为近似值，反映数据采集时公开基准测评的状态。不同评估方法论存在差异。'
    },
    feed: {
      title: 'AI 思想频道',
      subtitle: '正在塑造智能前沿的思考者、构建者与声音。内容保持英文原版。',
      heading_people: '思想领袖',
      heading_podcasts: '精选播客'
    },
    github: {
      title: 'GitHub 雷达',
      subtitle: '实时获取 GitHub API 的 AI 热门仓库动态。',
      live: '实时数据',
      tab_llm: 'LLM',
      tab_agent: 'Agent',
      tab_multimodal: '多模态',
      error: '无法访问 GitHub API，显示精选内容。',
      stars: 'stars'
    },
    footer: {
      copy: '© 2026 贺睿 · 精心构建',
      email: 'chaosfrey@gmail.com',
      github: 'GitHub'
    }
  }
};

/* ---------- LLM BENCHMARK DATA ---------- */
const LLM_ARENA = [
  { name: 'o3',                org: 'OpenAI',     elo: 1385, mmlu: 96.7, humaneval: 95.5, math: 96.7 },
  { name: 'o1',                org: 'OpenAI',     elo: 1352, mmlu: 92.3, humaneval: 92.4, math: 94.8 },
  { name: 'Claude 3.7 Sonnet', org: 'Anthropic',  elo: 1310, mmlu: 90.1, humaneval: 93.7, math: 88.3 },
  { name: 'Claude 3.5 Sonnet', org: 'Anthropic',  elo: 1268, mmlu: 88.7, humaneval: 92.0, math: 71.1 },
  { name: 'GPT-4o',            org: 'OpenAI',     elo: 1264, mmlu: 87.2, humaneval: 90.2, math: 76.6 },
  { name: 'Gemini 2.0 Flash',  org: 'Google',     elo: 1264, mmlu: 88.9, humaneval: 89.3, math: 85.2 },
  { name: 'DeepSeek R1',       org: 'DeepSeek',   elo: 1256, mmlu: 90.8, humaneval: 92.6, math: 92.3 },
  { name: 'Gemini 1.5 Pro',    org: 'Google',     elo: 1241, mmlu: 85.9, humaneval: 84.1, math: 67.7 },
  { name: 'Llama 3.1 405B',    org: 'Meta',       elo: 1248, mmlu: 88.6, humaneval: 89.0, math: 73.8 },
  { name: 'Qwen2.5 72B',       org: 'Alibaba',    elo: 1235, mmlu: 84.2, humaneval: 88.2, math: 75.5 },
  { name: 'DeepSeek V2.5',     org: 'DeepSeek',   elo: 1232, mmlu: 78.5, humaneval: 90.2, math: 69.2 },
  { name: 'Mistral Large 2',   org: 'Mistral',    elo: 1215, mmlu: 84.0, humaneval: 86.5, math: 66.1 }
];

/* Radar chart — 6 capability dimensions, top 6 models */
const RADAR_DATA = {
  axes: ['Reasoning', 'Coding', 'Math', 'Knowledge', 'Chinese', 'Long Context'],
  models: [
    { name: 'GPT-4o',            color: '#74aa9c', values: [88, 90, 77, 87, 70, 85] },
    { name: 'Claude 3.5 Sonnet', color: '#d97757', values: [90, 92, 71, 89, 65, 92] },
    { name: 'Gemini 1.5 Pro',    color: '#4285f4', values: [85, 84, 68, 86, 68, 96] },
    { name: 'DeepSeek R1',       color: '#06b6d4', values: [95, 93, 93, 82, 92, 82] },
    { name: 'Qwen2.5 72B',       color: '#a855f7', values: [82, 88, 76, 84, 95, 80] },
    { name: 'Llama 3.1 405B',    color: '#22c55e', values: [82, 89, 74, 88, 60, 78] }
  ]
};

/* ---------- AI THOUGHT LEADERS ---------- */
const AI_PEOPLE = [
  {
    initials: 'AK',
    name: 'Andrej Karpathy',
    org: 'Independent / ex-OpenAI',
    desc: 'Deep learning educator, creator of micrograd & nanoGPT. His "Neural Networks: Zero to Hero" series has redefined AI pedagogy.',
    url: 'https://karpathy.ai'
  },
  {
    initials: 'IS',
    name: 'Ilya Sutskever',
    org: 'Safe Superintelligence (SSI)',
    desc: 'Co-founded OpenAI and SSI. Core architect of transformative breakthroughs from AlexNet to GPT. Now focused on building safe superintelligence.',
    url: 'https://twitter.com/ilyasut'
  },
  {
    initials: 'DH',
    name: 'Demis Hassabis',
    org: 'Google DeepMind',
    desc: 'CEO of Google DeepMind. Led AlphaFold, AlphaStar, Gemini. 2024 Nobel Prize in Chemistry for protein structure prediction.',
    url: 'https://twitter.com/demishassabis'
  },
  {
    initials: 'YL',
    name: 'Yann LeCun',
    org: 'Meta AI / NYU',
    desc: 'Chief AI Scientist at Meta. Pioneer of convolutional neural networks. Outspoken advocate for open-source AI and architectures beyond transformers.',
    url: 'https://twitter.com/ylecun'
  },
  {
    initials: 'JF',
    name: 'Jim Fan',
    org: 'NVIDIA Research',
    desc: 'Senior Director at NVIDIA, leading embodied AI and foundation agent research. Building Groot — a foundation model for physical robots.',
    url: 'https://twitter.com/drjimfan'
  },
  {
    initials: 'FL',
    name: 'Fei-Fei Li',
    org: 'World Labs / Stanford',
    desc: 'Co-founded World Labs to give AI spatial intelligence. Creator of ImageNet. Pioneer of computer vision and democratization of AI.',
    url: 'https://twitter.com/drfeifei'
  },
  {
    initials: 'SA',
    name: 'Sam Altman',
    org: 'OpenAI',
    desc: 'CEO of OpenAI. Driving GPT-4, o1, DALL·E, Sora and the deployment of transformative AI systems at global scale.',
    url: 'https://twitter.com/sama'
  },
  {
    initials: 'YB',
    name: 'Yoshua Bengio',
    org: 'Mila / Université de Montréal',
    desc: 'Turing Award laureate. AI safety researcher and co-founder of the deep learning revolution. Advocates for responsible AI governance.',
    url: 'https://twitter.com/yoshuabengio'
  }
];

/* ---------- AI PODCASTS ---------- */
const AI_PODCASTS = [
  {
    emoji: '🎙',
    name: 'Lex Fridman Podcast',
    host: 'Lex Fridman',
    tag: 'Long-form'
  },
  {
    emoji: '🧠',
    name: 'No Priors',
    host: 'Nat Friedman · Daniel Gross',
    tag: 'Founders'
  },
  {
    emoji: '📡',
    name: 'Dwarkesh Podcast',
    host: 'Dwarkesh Patel',
    tag: 'Deep Dives'
  },
  {
    emoji: '🔬',
    name: 'The TBPN',
    host: 'Sequoia Capital',
    tag: 'VC · AI'
  },
  {
    emoji: '💡',
    name: 'Acquired',
    host: 'Ben Gilbert · David Rosenthal',
    tag: 'Tech History'
  },
  {
    emoji: '🚀',
    name: 'All-In Podcast',
    host: 'Chamath · Sacks · Friedberg · Palihapitiya',
    tag: 'Tech · Macro'
  }
];

/* ---------- LANG COLORS FOR REPO CARDS ---------- */
const LANG_COLORS = {
  'Python':     '#3572A5',
  'JavaScript': '#f1e05a',
  'TypeScript': '#2b7489',
  'Jupyter Notebook': '#DA5B0B',
  'C++':        '#f34b7d',
  'Go':         '#00ADD8',
  'Rust':       '#dea584',
  'C':          '#555555',
  'Shell':      '#89e051',
  'Java':       '#b07219',
  'default':    '#8b949e'
};
