/* ============================================================
 * 学习链路（二）：语法体系 / 词汇 / 发音 / 写作 / 商务 / 学术 / 翻译
 * ============================================================ */
window.KB = window.KB || {};
window.KB.PATHS = (window.KB.PATHS || []).concat([

  {
    id:'grammar-system',
    name:'语法体系重建',
    level:'零散规则 → 一张完整的语法地图',
    desc:'语法不是一堆规则，而是一棵树：词性 → 句子成分 → 时态 → 从句 → 非谓语。先搭树，再补叶子，最后用输出检验。',
    steps:[
      { phase:'一、词与句', node:'parts-of-speech', title:'词性总览', note:'十大词性先认全，知道每个词在句中做什么。' },
      { phase:'一、词与句', node:'sentence-elements', title:'句子成分', note:'主谓宾表定状补，学会拆任何句子。' },
      { phase:'一、词与句', node:'sentence-patterns', title:'五种基本句型', note:'所有句子都从这五个骨架长出来。' },
      { phase:'一、词与句', node:'subject-verb-agreement', title:'主谓一致', note:'第三人称单数、集合名词、插入语干扰。' },
      { phase:'二、动词体系', node:'tense-system', title:'时态体系', note:'时间 × 体，12 格坐标。' },
      { phase:'二、动词体系', node:'present-perfect', title:'现在完成时', note:'与现在有联系，和一般过去时分界。' },
      { phase:'二、动词体系', node:'past-perfect', title:'过去完成时', note:'过去的过去，时间轴上的箭头。' },
      { phase:'二、动词体系', node:'passive-voice', title:'被动语态', note:'视角选择，不是高级语法。' },
      { phase:'二、动词体系', node:'modal-verbs', title:'情态动词', note:'能力、许可、义务、推测。' },
      { phase:'二、动词体系', node:'conditionals', title:'条件句', note:'真实、可能、与现在相反、与过去相反。' },
      { phase:'二、动词体系', node:'subjunctive', title:'虚拟语气', note:'说反事实的语法。' },
      { phase:'三、从句体系', node:'clauses-overview', title:'从句总览', note:'先判断从句在主句里做什么成分。' },
      { phase:'三、从句体系', node:'noun-clauses', title:'名词性从句', note:'陈述语序，whether/if 的选择。' },
      { phase:'三、从句体系', node:'relative-clauses', title:'定语从句', note:'关系代词、限制性/非限制性。' },
      { phase:'三、从句体系', node:'adverbial-clauses', title:'状语从句', note:'时间、原因、条件、让步，主将从现。' },
      { phase:'三、从句体系', node:'non-finite-verbs', title:'非谓语动词', note:'to do / doing / done，逻辑主语与语态。' },
      { phase:'四、综合运用', node:'long-sentence-analysis', title:'长难句分析', note:'把前面所有结构放进真实长句里拆。' },
      { phase:'四、综合运用', node:'writing-errors', title:'高频错误', note:'用错误清单反向检验掌握程度。' },
      { phase:'四、综合运用', task:true, title:'造 100 个句子', note:'每个语法点造 5 句，找老师或工具批改，建立自己的例句库。' }
    ]
  },

  {
    id:'vocab-mastery',
    name:'词汇突破',
    level:'背了就忘 → 认得、记得、用得出',
    desc:'词汇不是背列表，而是建网络：高频词打底，词根词缀扩展，搭配与例句定用法，间隔重复防遗忘，输出检验掌握。',
    steps:[
      { phase:'一、选词', node:'word-frequency', title:'词频与核心词', note:'先吃下最高频的 3000-5000 词。' },
      { phase:'一、选词', node:'cefr-levels', title:'CEFR 与词汇量', note:'确定自己的等级与目标词汇量。' },
      { phase:'一、选词', node:'vocabulary-learning', title:'词汇学习方法', note:'高频优先、词块记忆、多通道编码。' },
      { phase:'二、拆词', node:'morpheme', title:'语素', note:'词根 + 词缀，构词的最小积木。' },
      { phase:'二、拆词', node:'roots-latin', title:'拉丁词根', note:'spect、port、dict、duc、form、struct。' },
      { phase:'二、拆词', node:'roots-greek', title:'希腊词根', note:'phon、graph、logy、bio、geo、psych。' },
      { phase:'二、拆词', node:'prefixes', title:'前缀', note:'否定、方向、数量、程度。' },
      { phase:'二、拆词', node:'suffixes', title:'后缀', note:'后缀决定词性。' },
      { phase:'二、拆词', node:'word-analysis', title:'长词拆解', note:'后缀→前缀→词根。' },
      { phase:'三、用法', node:'collocations', title:'搭配', note:'动词 + 名词、形容词 + 名词、介词搭配。' },
      { phase:'三、用法', node:'phrasal-verbs', title:'短语动词', note:'按动词成组记，注意宾语位置。' },
      { phase:'三、用法', node:'synonyms', title:'同义词辨析', note:'强度、搭配、语域、句型四个维度。' },
      { phase:'三、用法', node:'word-families', title:'词族', note:'背一族，不是背一个。' },
      { phase:'四、记忆与检验', node:'spaced-repetition', title:'间隔重复', note:'1/3/7/15/30 天，主动回忆。' },
      { phase:'四、记忆与检验', node:'flashcards', title:'闪卡与 Anki', note:'一张卡一个点，搭配与例句一起放。' },
      { phase:'四、记忆与检验', node:'corpus', title:'语料库', note:'查母语者怎么搭配、怎么用。' },
      { phase:'四、记忆与检验', node:'dictionaries', title:'词典使用', note:'音标、词性、搭配、例句、语域。' },
      { phase:'四、记忆与检验', node:'word-choice', title:'选词与搭配错误', note:'用输出暴露问题。' },
      { phase:'四、记忆与检验', task:true, title:'每天 20 个新词 + 复习', note:'每个词记搭配与一个自造句，7 天后在写作/口语中使用。' }
    ]
  },

  {
    id:'pronunciation',
    name:'发音矫正',
    level:'中式口音 → 清晰、自然、有节奏',
    desc:'发音不是"像不像母语者"，而是"清不清楚"。从音素到重音、连读、语调逐层练，录音对比是最重要的反馈。',
    steps:[
      { phase:'一、音素', node:'phonetics-basics', title:'语音学基础', note:'发音器官、清浊、部位与方式。' },
      { phase:'一、音素', node:'ipa', title:'国际音标', note:'48 个音素，能读词典音标。' },
      { phase:'一、音素', node:'vowels', title:'元音', note:'长短音、双元音、schwa。' },
      { phase:'一、音素', node:'consonants', title:'辅音', note:'清浊成对，词尾辅音发出来。' },
      { phase:'一、音素', node:'phoneme-pairs', title:'最小对立对', note:'ship/sheep、bit/beat 先听辨再发音。' },
      { phase:'二、重音与语流', node:'word-stress', title:'单词重音', note:'重音位置规则与词性变化。' },
      { phase:'二、重音与语流', node:'sentence-stress', title:'句子重音', note:'内容词重读，功能词弱读。' },
      { phase:'二、重音与语流', node:'weak-forms', title:'弱读', note:'功能词的弱读形式。' },
      { phase:'二、重音与语流', node:'linking', title:'连读', note:'辅元、r、滑音连读。' },
      { phase:'二、重音与语流', node:'intonation', title:'语调', note:'降调、升调、降升调。' },
      { phase:'二、重音与语流', node:'prosody', title:'意群与节奏', note:'按意义停顿。' },
      { phase:'三、纠错与训练', node:'pronunciation-errors', title:'常见错误', note:'th、v/w、l/n、词尾辅音、辅音连缀。' },
      { phase:'三、纠错与训练', node:'british-american', title:'英音与美音', note:'选一套为主，另一套听懂。' },
      { phase:'三、纠错与训练', node:'pronunciation-training', title:'训练方法', note:'听辨、录音、慢速分解、肌肉记忆。' },
      { phase:'三、纠错与训练', node:'shadowing', title:'影子跟读', note:'同步跟读，练节奏与语调。' },
      { phase:'三、纠错与训练', task:true, title:'每周录音对比', note:'同一段材料每周录一次，保存并对比，标出改善与残留问题。' }
    ]
  },

  {
    id:'writing',
    name:'写作体系',
    level:'能写句子 → 能写清楚的文章',
    desc:'写作从句子到段落到文章逐层搭。先保证句子完整、不粘连，再练段落结构与论证，最后进入学术、商务、创意等文体。',
    steps:[
      { phase:'一、句子', node:'sentence-writing', title:'句子写作', note:'碎句、连写句、逗号粘连先消灭。' },
      { phase:'一、句子', node:'parallelism', title:'平行结构', note:'并列成分形式一致。' },
      { phase:'一、句子', node:'writing-errors', title:'高频错误', note:'主谓一致、时态、冠词、搭配。' },
      { phase:'二、段落', node:'paragraph-structure', title:'段落结构', note:'主题句 + 支撑 + 收束。' },
      { phase:'二、段落', node:'cohesion', title:'衔接', note:'照应、替代、连接词、词汇衔接。' },
      { phase:'二、段落', node:'coherence', title:'连贯与逻辑', note:'一段一个中心，逻辑顺序清楚。' },
      { phase:'三、文章', node:'essay-structure', title:'文章结构', note:'引言、主体、结论与论点。' },
      { phase:'三、文章', node:'essay-writing', title:'文章写作', note:'结构、论证、语言三件事。' },
      { phase:'三、文章', node:'argumentative-writing', title:'议论文', note:'论点、论据、推理、反驳。' },
      { phase:'三、文章', node:'expository-writing', title:'说明文', note:'定义、分类、过程、因果。' },
      { phase:'三、文章', node:'narrative-writing', title:'记叙文', note:'冲突、细节、show don\'t tell。' },
      { phase:'四、修改', node:'writing-process', title:'写作过程', note:'构思、提纲、起草、修改、校对。' },
      { phase:'四、修改', node:'editing-proofreading', title:'修改与校对', note:'先结构、再句子、最后拼写标点。' },
      { phase:'四、修改', node:'chinglish', title:'中式英语', note:'识别自己的母语迁移模式。' },
      { phase:'五、文体', node:'academic-writing', title:'学术写作', note:'客观、hedging、名词化、引用。' },
      { phase:'五、文体', node:'business-writing', title:'商务写作', note:'邮件、报告、提案，清楚优先。' },
      { phase:'五、文体', node:'practical-writing', title:'应用文', note:'邮件、信件、通知、简历。' },
      { phase:'五、文体', node:'creative-writing', title:'创意写作', note:'感官、人物、冲突、视角。' }
    ]
  },

  {
    id:'business',
    name:'商务英语',
    level:'职场英语 → 能开会、能写邮件、能面试',
    desc:'商务英语的目标是"把事办成"：场景词汇、礼貌语气、邮件与报告结构、会议表达与面试故事，按场景逐项练。',
    steps:[
      { phase:'一、词汇与语气', node:'business-vocabulary', title:'商务词汇', note:'金融、营销、会议、人力资源。' },
      { phase:'一、词汇与语气', node:'register', title:'语域与正式度', note:'正式、中性、非正式的选择。' },
      { phase:'一、词汇与语气', node:'politeness', title:'礼貌与委婉', note:'请求、拒绝、道歉的礼貌框架。' },
      { phase:'一、词汇与语气', node:'titles-address', title:'称谓与称呼', note:'邮件与会议的称呼规范。' },
      { phase:'二、书面沟通', node:'practical-writing', title:'应用文', note:'邮件、通知、备忘录。' },
      { phase:'二、书面沟通', node:'business-writing', title:'商务写作', note:'邮件、报告、提案的结构。' },
      { phase:'二、书面沟通', node:'technical-translation', title:'专业翻译', note:'术语一致、数字准确。' },
      { phase:'三、口头沟通', node:'functional-language', title:'功能语言', note:'表达观点、同意、建议、澄清。' },
      { phase:'三、口头沟通', node:'presentation-skills', title:'演讲与展示', note:'开场、结构、结尾、Q&A。' },
      { phase:'三、口头沟通', node:'discussion-debate', title:'讨论与辩论', note:'轮流发言、礼貌反驳。' },
      { phase:'三、口头沟通', node:'listening-strategies', title:'听力策略', note:'会议与电话中的关键信息。' },
      { phase:'四、求职与认证', node:'interview-english', title:'面试英语', note:'自我介绍与 STAR 故事。' },
      { phase:'四、求职与认证', node:'bec', title:'BEC 考试', note:'商务场景听说读写认证。' }
    ]
  },

  {
    id:'academic',
    name:'学术英语',
    level:'能读论文 → 能写论文',
    desc:'学术英语是另一套语域：客观、克制、有引用、有边界。先练学术词汇与长难句阅读，再练摘要、改写、引用与论文结构。',
    steps:[
      { phase:'一、词汇与句法', node:'academic-vocabulary', title:'学术词汇', note:'AWL、论证动词、hedging、名词化。' },
      { phase:'一、词汇与句法', node:'academic-roots', title:'学术词根与后缀', note:'-ology、-ism、-tion、-ity。' },
      { phase:'一、词汇与句法', node:'long-sentence-analysis', title:'长难句分析', note:'论文句子的主干与修饰。' },
      { phase:'二、阅读', node:'reading-genres', title:'阅读材料类型', note:'论文、评论、技术文档的读法。' },
      { phase:'二、阅读', node:'intensive-reading', title:'精读', note:'逐段拆论证与证据。' },
      { phase:'二、阅读', node:'critical-thinking', title:'批判性思维', note:'论点、假设、证据、逻辑谬误。' },
      { phase:'三、写作', node:'summary-writing', title:'摘要与概括', note:'背景、目的、方法、结果、结论。' },
      { phase:'三、写作', node:'paraphrasing', title:'改写与释义', note:'同义替换、句型转换、语序重组。' },
      { phase:'三、写作', node:'citation-academic', title:'引用与规范', note:'APA/MLA、文内引用、参考文献。' },
      { phase:'三、写作', node:'academic-writing', title:'学术写作', note:'客观、hedging、名词化、逻辑。' },
      { phase:'三、写作', node:'argumentative-writing', title:'论证写作', note:'论点、证据、反驳与让步。' },
      { phase:'四、应用', node:'corpus', title:'语料库', note:'验证学术搭配与用法。' },
      { phase:'四、应用', node:'toefl', title:'托福', note:'学术场景的听说读写。' },
      { phase:'四、应用', node:'gre', title:'GRE', note:'逻辑与高难词汇。' }
    ]
  },

  {
    id:'translation',
    name:'翻译入门',
    level:'能看懂 → 能译得准、译得顺',
    desc:'翻译的核心是"摆脱原句结构，重建意义"。先理解中英差异，再练技巧，最后进入文化、技术与口译场景。',
    steps:[
      { phase:'一、对比与原则', node:'contrastive-analysis', title:'中英对比', note:'形合与意合、主语与主题、定语位置。' },
      { phase:'一、对比与原则', node:'translation-principles', title:'翻译原则', note:'忠实、通顺、功能对等。' },
      { phase:'一、对比与原则', node:'chinglish', title:'中式英语', note:'识别母语迁移造成的翻译腔。' },
      { phase:'二、技巧', node:'translation-techniques', title:'翻译技巧', note:'词性转换、增删、断句合句、语序调整。' },
      { phase:'二、技巧', node:'word-analysis', title:'长词拆解', note:'术语与长词的准确理解。' },
      { phase:'二、技巧', node:'collocations', title:'搭配', note:'译文的搭配要符合目标语言习惯。' },
      { phase:'三、文化与专业', node:'culture-translation', title:'文化与习语翻译', note:'文化负载词、归化与异化。' },
      { phase:'三、文化与专业', node:'technical-translation', title:'科技与商务翻译', note:'术语一致、精确、客观。' },
      { phase:'三、文化与专业', node:'business-writing', title:'商务文本', note:'邮件、合同、报告的语气与格式。' },
      { phase:'四、口译与工具', node:'interpreting', title:'口译基础', note:'交替传译、笔记、意义提取。' },
      { phase:'四、口译与工具', node:'translation-tools', title:'翻译工具', note:'CAT、机器翻译、术语库、译后编辑。' },
      { phase:'四、口译与工具', node:'dictionaries', title:'词典使用', note:'英英词典确认词义与用法。' },
      { phase:'四、口译与工具', node:'corpus', title:'语料库', note:'验证真实用法与搭配。' },
      { phase:'四、口译与工具', task:true, title:'每周翻译 1 篇短文', note:'先自译，再对照参考译文，逐句标注差异与原因。' }
    ]
  }

]);
