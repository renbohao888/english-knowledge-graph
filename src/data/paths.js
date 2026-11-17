/* ============================================================
 * 学习链路（一）：零基础到四级 / 六级 / 考研 / 雅思 / 托福 / 口语 / 听力 / 阅读
 * 每一步：{ phase, node, title, note } 或 { phase, task:true, title, note }
 * node 必须是已存在的节点 id。
 * ============================================================ */
window.KB = window.KB || {};
window.KB.PATHS = (window.KB.PATHS || []).concat([

  {
    id:'zero-to-cet4',
    name:'零基础 → 四级',
    level:'零基础 → CET-4 及格',
    desc:'从发音和拼写开始，先把"能读、能认、能写简单句"打通，再进入时态、从句与四级题型。四级不是靠技巧，是靠基础覆盖。',
    steps:[
      { phase:'一、发音与拼写', node:'phonetics-basics', title:'语音学基础', note:'知道声音从哪来，清浊、发音部位与方式，后面学音标才不抽象。' },
      { phase:'一、发音与拼写', node:'ipa', title:'国际音标', note:'掌握 20 个元音 + 24 个辅音，能独立读音标。' },
      { phase:'一、发音与拼写', node:'phonics', title:'自然拼读', note:'看到简单词能大致读出来，建立字母与音的对应。' },
      { phase:'一、发音与拼写', node:'word-stress', title:'单词重音', note:'重音放错比个别音发错更影响理解。' },
      { phase:'一、发音与拼写', node:'linking', title:'连读', note:'先听懂连读，再尝试自己连起来读。' },
      { phase:'一、发音与拼写', task:true, title:'录音自检', note:'录一段 1 分钟朗读，对照音标找出 3 个稳定错误。' },
      { phase:'二、词汇地基', node:'parts-of-speech', title:'词性总览', note:'先能判断一个词在句子里做什么。' },
      { phase:'二、词汇地基', node:'nouns', title:'名词', note:'可数、不可数、复数与所有格。' },
      { phase:'二、词汇地基', node:'verbs-overview', title:'动词分类', note:'及物、不及物、系动词、助动词。' },
      { phase:'二、词汇地基', node:'sentence-elements', title:'句子成分', note:'主谓宾表定状补，学会拆句。' },
      { phase:'二、词汇地基', node:'sentence-patterns', title:'五种基本句型', note:'所有句子都长在这五个骨架上。' },
      { phase:'二、词汇地基', node:'vocabulary-learning', title:'词汇学习方法', note:'高频优先、词块记忆、多通道编码。' },
      { phase:'二、词汇地基', node:'word-frequency', title:'词频与核心词', note:'先吃下最高频的 3000 词。' },
      { phase:'三、时态与句子', node:'tense-system', title:'时态体系', note:'时间 × 体，建立 12 格坐标，而不是背 12 条规则。' },
      { phase:'三、时态与句子', node:'present-simple', title:'一般现在时', note:'习惯、事实、时间表；第三人称单数别漏 -s。' },
      { phase:'三、时态与句子', node:'past-simple', title:'一般过去时', note:'不规则动词成表记，did 后动词还原。' },
      { phase:'三、时态与句子', node:'present-perfect', title:'现在完成时', note:'与现在有联系；和一般过去时的分界要清楚。' },
      { phase:'三、时态与句子', node:'future-forms', title:'将来表达', note:'will、be going to、进行时表将来。' },
      { phase:'三、时态与句子', node:'passive-voice', title:'被动语态', note:'be + 过去分词，各时态的被动形式。' },
      { phase:'四、从句与阅读', node:'clauses-overview', title:'从句总览', note:'先判断从句在主句里做什么成分。' },
      { phase:'四、从句与阅读', node:'relative-clauses', title:'定语从句', note:'who/which/that/whose，限制性与非限制性。' },
      { phase:'四、从句与阅读', node:'adverbial-clauses', title:'状语从句', note:'时间、原因、条件、让步，主将从现。' },
      { phase:'四、从句与阅读', node:'long-sentence-analysis', title:'长难句分析', note:'先找主干，再拆从句与非谓语。' },
      { phase:'五、四级题型', node:'exam-overview', title:'考试全景', note:'先明确四级考什么、分值怎么分布。' },
      { phase:'五、四级题型', node:'cet4', title:'四级题型', note:'听力、阅读、写作、翻译四块逐个突破。' },
      { phase:'五、四级题型', node:'exam-vocabulary', title:'考试词汇策略', note:'真题高频词优先，在句子里记。' },
      { phase:'五、四级题型', node:'exam-listening', title:'考试听力', note:'预读、抓关键词、漏题就放手。' },
      { phase:'五、四级题型', node:'exam-reading', title:'考试阅读', note:'先题后文，定位与同义替换。' },
      { phase:'五、四级题型', node:'exam-writing', title:'考试写作', note:'三段式、论点清楚、语言准确。' },
      { phase:'五、四级题型', node:'test-strategy', title:'应试策略', note:'按考试时间完整模考，训练节奏。' },
      { phase:'五、四级题型', task:true, title:'完整模考 3 套', note:'近 3 年真题，严格计时，考后按题型统计错因。' }
    ]
  },

  {
    id:'cet4-to-cet6',
    name:'四级 → 六级',
    level:'CET-4 及格 → CET-6 通过',
    desc:'六级不是四级简单加难：词汇量、听力语速、长难句密度都上一个台阶。重点补词汇深度、句法复杂度和听力耐受力。',
    steps:[
      { phase:'一、词汇升级', node:'vocabulary-learning', title:'词汇方法复盘', note:'从"认识"转向"会用"：搭配、词性、例句。' },
      { phase:'一、词汇升级', node:'academic-vocabulary', title:'学术词汇', note:'六级阅读与听力中的学术词比例明显上升。' },
      { phase:'一、词汇升级', node:'collocations', title:'搭配', note:'常见动词 + 名词、形容词 + 名词搭配。' },
      { phase:'一、词汇升级', node:'phrasal-verbs', title:'短语动词', note:'听力与口语高频，注意宾语位置。' },
      { phase:'二、句法升级', node:'noun-clauses', title:'名词性从句', note:'宾语从句用陈述语序，whether/if 的选择。' },
      { phase:'二、句法升级', node:'relative-advanced', title:'定语从句进阶', note:'介词 + which、which 指代整句。' },
      { phase:'二、句法升级', node:'non-finite-verbs', title:'非谓语动词', note:'to do / doing / done 的判断。' },
      { phase:'二、句法升级', node:'gerund-infinitive', title:'动名词与不定式', note:'动词后面接什么，按句型记。' },
      { phase:'二、句法升级', node:'tense-contrast', title:'时态对比', note:'现在完成 vs 一般过去、过去完成 vs 一般过去。' },
      { phase:'二、句法升级', node:'modal-verbs', title:'情态动词', note:'推测、义务、建议的语气差异。' },
      { phase:'三、听力与阅读', node:'listening-obstacles', title:'听力障碍诊断', note:'区分是音、词、语法还是注意力问题。' },
      { phase:'三、听力与阅读', node:'exam-listening', title:'考试听力', note:'讲座与长对话的笔记与推断。' },
      { phase:'三、听力与阅读', node:'exam-reading', title:'考试阅读', note:'长篇阅读与选词填空的定位策略。' },
      { phase:'三、听力与阅读', node:'reading-inference', title:'推断与主旨', note:'识别同义替换与干扰项。' },
      { phase:'四、写作翻译', node:'exam-writing', title:'考试写作', note:'结构完整之外，语言质量要提升。' },
      { phase:'四、写作翻译', node:'writing-errors', title:'高频写作错误', note:'主谓一致、时态、冠词、搭配。' },
      { phase:'四、写作翻译', node:'translation-techniques', title:'翻译技巧', note:'词性转换、断句合句、语序调整。' },
      { phase:'四、写作翻译', node:'test-strategy', title:'应试策略', note:'模考与时间分配，稳定发挥。' },
      { phase:'四、写作翻译', task:true, title:'六级真题 5 套', note:'每套做完精读听力原文与阅读文章，积累词块。' }
    ]
  },

  {
    id:'kaoyan',
    name:'考研英语',
    level:'四级/六级 → 考研英语 70+',
    desc:'考研英语的胜负在阅读，阅读的胜负在长难句与词汇。用真题精读把"词—句—段—篇"逐层打通，写作与翻译自然受益。',
    steps:[
      { phase:'一、词汇与长难句', node:'exam-vocabulary', title:'考研词汇', note:'5500 词打底，真题高频词优先。' },
      { phase:'一、词汇与长难句', node:'word-analysis', title:'长词拆解', note:'词根词缀拆词，降低记忆负担。' },
      { phase:'一、词汇与长难句', node:'long-sentence-analysis', title:'长难句分析', note:'主干—从句—非谓语，逐句画结构。' },
      { phase:'一、词汇与长难句', node:'embedding', title:'嵌套结构', note:'从句套从句，逐层拆开。' },
      { phase:'一、词汇与长难句', node:'clause-reduction', title:'从句简化', note:'把从句压成短语，理解更快。' },
      { phase:'二、阅读精读', node:'skimming-scanning', title:'略读与查读', note:'先建文章地图，再定位细节。' },
      { phase:'二、阅读精读', node:'reading-inference', title:'推断与主旨', note:'作者态度、段落功能、选项陷阱。' },
      { phase:'二、阅读精读', node:'exam-reading', title:'考试阅读', note:'四篇文章的题型与时间分配。' },
      { phase:'二、阅读精读', task:true, title:'真题阅读逐句精读', note:'每篇标主干、查搭配、写段落大意，至少精读 30 篇。' },
      { phase:'三、翻译与新题型', node:'translation-techniques', title:'翻译技巧', note:'断句、语序、词性转换。' },
      { phase:'三、翻译与新题型', node:'contrastive-analysis', title:'中英对比', note:'形合与意合、定语位置、信息重心。' },
      { phase:'三、翻译与新题型', node:'summary-writing', title:'摘要与概括', note:'新题型与段落主旨都靠概括能力。' },
      { phase:'四、写作', node:'argumentative-writing', title:'议论文写作', note:'论点、论据、论证、反驳。' },
      { phase:'四、写作', node:'essay-writing', title:'文章结构', note:'小作文书信 + 大作文图表/图画。' },
      { phase:'四、写作', node:'exam-writing', title:'考试写作', note:'模板保底，观点与例子决定上限。' },
      { phase:'四、写作', node:'test-strategy', title:'应试策略', note:'按考试时间完整模考，训练耐力。' }
    ]
  },

  {
    id:'ielts',
    name:'雅思 6.5 → 7.5',
    level:'B2 → IELTS 6.5-7.5',
    desc:'雅思是能力型考试：听力靠场景与定位，阅读靠同义替换，写作靠论证，口语靠持续表达。四项分开练，最后合模考。',
    steps:[
      { phase:'一、定位与基础', node:'self-assessment', title:'水平自评', note:'用真题模考确定当前 band 与薄弱项。' },
      { phase:'一、定位与基础', node:'cefr-levels', title:'CEFR 对照', note:'理解 band 与词汇量、语法能力的大致关系。' },
      { phase:'一、定位与基础', node:'academic-vocabulary', title:'学术词汇', note:'阅读与写作的学术词与搭配。' },
      { phase:'二、听力', node:'listening-basics', title:'听力解码', note:'辨音、切词、识别速度。' },
      { phase:'二、听力', node:'listening-strategies', title:'听力策略', note:'预读、关键词、信号词、笔记。' },
      { phase:'二、听力', node:'exam-listening', title:'雅思听力题型', note:'填空、选择、地图、匹配逐项练。' },
      { phase:'三、阅读', node:'skimming-scanning', title:'略读与查读', note:'三篇长文的时间分配。' },
      { phase:'三、阅读', node:'exam-reading', title:'雅思阅读题型', note:'判断题 TRUE/FALSE/NOT GIVEN、匹配题。' },
      { phase:'三、阅读', node:'reading-inference', title:'推断与主旨', note:'同义替换与干扰项识别。' },
      { phase:'四、写作', node:'essay-structure', title:'文章结构', note:'Task 2 的引言、主体、结论。' },
      { phase:'四、写作', node:'argumentative-writing', title:'论证能力', note:'论点、证据、让步与反驳。' },
      { phase:'四、写作', node:'exam-writing', title:'雅思写作', note:'Task 1 图表 + Task 2 议论文。' },
      { phase:'四、写作', node:'topic-vocabulary', title:'话题词汇', note:'环境、科技、教育、健康等高频话题词云。' },
      { phase:'五、口语', node:'speaking-fluency', title:'流利度', note:'语块、填充词、绕开不会的词。' },
      { phase:'五、口语', node:'pronunciation-output', title:'发音输出', note:'重音、语调、意群，清晰优先。' },
      { phase:'五、口语', node:'exam-speaking', title:'雅思口语', note:'Part 1/2/3 的展开与追问。' },
      { phase:'五、口语', task:true, title:'每周一次全真模考', note:'四项连做，录音口语，找人批改写作。' }
    ]
  },

  {
    id:'toefl',
    name:'托福 90 → 105',
    level:'B2 → TOEFL 90-105',
    desc:'托福高度学术化：听力是核心，笔记是杠杆。综合口语与综合写作考的是"读 + 听 + 说/写"的信息整合。',
    steps:[
      { phase:'一、学术听力', node:'listening-strategies', title:'听力策略', note:'预判、信号词、抓结构。' },
      { phase:'一、学术听力', node:'note-taking', title:'笔记方法', note:'符号、缩写、结构线，记观点与例子。' },
      { phase:'一、学术听力', node:'listening-materials', title:'学术讲座', note:'用公开课与 TPO 讲座练耐力。' },
      { phase:'二、学术阅读', node:'academic-vocabulary', title:'学术词汇', note:'学科词与学术功能词。' },
      { phase:'二、学术阅读', node:'reading-inference', title:'推断与主旨', note:'段落功能、作者态度、否定事实题。' },
      { phase:'二、学术阅读', node:'exam-reading', title:'托福阅读', note:'长文定位与题型策略。' },
      { phase:'三、写作', node:'academic-writing', title:'学术写作', note:'客观、名词化、引用与逻辑。' },
      { phase:'三、写作', node:'summary-writing', title:'摘要与概括', note:'综合写作的阅读与听力要点复述。' },
      { phase:'三、写作', node:'exam-writing', title:'托福写作', note:'综合写作 + 学术讨论。' },
      { phase:'四、口语', node:'speaking-fluency', title:'流利度', note:'45-60 秒内结构清楚地表达。' },
      { phase:'四、口语', node:'exam-speaking', title:'托福口语', note:'独立题与综合题的信息整合。' },
      { phase:'五、模考', node:'toefl', title:'托福考试', note:'熟悉机考界面、时间与加试。' },
      { phase:'五、模考', node:'test-strategy', title:'应试策略', note:'TPO 全套模考，分析错题与时间。' }
    ]
  },

  {
    id:'speaking',
    name:'口语流利',
    level:'能读能写 → 敢说、说得清',
    desc:'口语不是"把写作念出来"。先把音、重音、语调练到清楚，再用语块和场景练习把表达变自动，最后进入真实交流。',
    steps:[
      { phase:'一、发音底盘', node:'pronunciation-errors', title:'常见发音错误', note:'对照 th、v/w、l/n、词尾辅音逐项排查。' },
      { phase:'一、发音底盘', node:'phoneme-pairs', title:'最小对立对', note:'先听辨，再发音。' },
      { phase:'一、发音底盘', node:'word-stress', title:'单词重音', note:'重音错位最影响理解。' },
      { phase:'一、发音底盘', node:'sentence-stress', title:'句子重音', note:'内容词重读，功能词弱读。' },
      { phase:'一、发音底盘', node:'weak-forms', title:'弱读', note:'听懂弱读，才能听懂真实语流。' },
      { phase:'一、发音底盘', node:'linking', title:'连读', note:'辅元连读、r 连读、滑音连读。' },
      { phase:'一、发音底盘', node:'intonation', title:'语调', note:'降调、升调、降升调的态度差异。' },
      { phase:'一、发音底盘', node:'prosody', title:'意群与节奏', note:'按意义停顿，句子才有结构。' },
      { phase:'二、模仿与输出', node:'shadowing', title:'影子跟读', note:'同步跟读，练节奏、重音与语调。' },
      { phase:'二、模仿与输出', node:'pronunciation-output', title:'发音输出', note:'录音对比，清晰优先。' },
      { phase:'二、模仿与输出', node:'speaking-fluency', title:'流利度', note:'语块、填充词、绕开不会的词。' },
      { phase:'三、场景表达', node:'functional-language', title:'功能语言', note:'表达观点、同意、建议、道歉。' },
      { phase:'三、场景表达', node:'daily-conversation', title:'日常会话', note:'问候、闲聊、点餐、问路。' },
      { phase:'三、场景表达', node:'spoken-grammar', title:'口语语法', note:'省略、短句、话语标记。' },
      { phase:'四、进阶场景', node:'discussion-debate', title:'讨论与辩论', note:'轮流发言、礼貌反驳、澄清。' },
      { phase:'四、进阶场景', node:'presentation-skills', title:'演讲与展示', note:'开场、结构、结尾、Q&A。' },
      { phase:'四、进阶场景', node:'interview-english', title:'面试英语', note:'自我介绍与 STAR 故事。' },
      { phase:'四、进阶场景', task:true, title:'每天 1 分钟独白', note:'录音回听，连续 30 天，比较第 1 天与第 30 天。' }
    ]
  },

  {
    id:'listening',
    name:'听力突破',
    level:'听不懂 → 能跟上真实语流',
    desc:'听力是解码链：辨音 → 切词 → 识别 → 理解。先补语音现象，再练策略与笔记，最后用真实材料拉速度。',
    steps:[
      { phase:'一、诊断', node:'listening-obstacles', title:'听力障碍', note:'区分音、词、语法、注意力四类问题。' },
      { phase:'一、诊断', node:'listening-basics', title:'听力基础', note:'理解实时解码的过程。' },
      { phase:'二、语音解码', node:'weak-forms', title:'弱读', note:'功能词的弱读是"听不清"的主因。' },
      { phase:'二、语音解码', node:'linking', title:'连读', note:'把 turn on 听成一个整体。' },
      { phase:'二、语音解码', node:'elision-assimilation', title:'省音与同化', note:'did you、next day 的真实读法。' },
      { phase:'二、语音解码', node:'sentence-stress', title:'句子重音', note:'抓信息骨架，而不是每个词。' },
      { phase:'三、策略与笔记', node:'listening-strategies', title:'听力策略', note:'预测、关键词、信号词、容忍模糊。' },
      { phase:'三、策略与笔记', node:'note-taking', title:'笔记方法', note:'缩写、符号、结构线。' },
      { phase:'三、策略与笔记', node:'listening-materials', title:'材料选择', note:'按 i+1 选对话、新闻、讲座、播客。' },
      { phase:'四、精听与输出', node:'shadowing', title:'影子跟读', note:'同步跟读，练语流与节奏。' },
      { phase:'四、精听与输出', node:'intensive-reading', title:'精听方法', note:'逐句听写、对照原文、标记连读弱读。' },
      { phase:'四、精听与输出', node:'exam-listening', title:'考试听力', note:'预读、定位、漏题放手。' },
      { phase:'四、精听与输出', task:true, title:'每天 20 分钟精听', note:'1 分钟音频听写 3 遍，再对照原文标出没听出的音。' }
    ]
  },

  {
    id:'reading',
    name:'阅读与长难句',
    level:'读得慢 → 读得快、读得准',
    desc:'阅读能力由词汇、句法、篇章、策略四层构成。先解决长难句和猜词，再练速度与推断，最后进入真实材料。',
    steps:[
      { phase:'一、阅读基础', node:'reading-skills', title:'阅读技能总览', note:'明确字词、句子、段落、篇章四层。' },
      { phase:'一、阅读基础', node:'vocabulary-in-context', title:'语境猜词', note:'定义、举例、对比、因果、构词五类线索。' },
      { phase:'一、阅读基础', node:'word-analysis', title:'长词拆解', note:'后缀定词性、前缀定方向、词根定义。' },
      { phase:'二、句子与速度', node:'long-sentence-analysis', title:'长难句分析', note:'主干、从句、非谓语、插入语。' },
      { phase:'二、句子与速度', node:'reading-speed', title:'阅读速度', note:'改掉默读与回视，按意群阅读。' },
      { phase:'二、句子与速度', node:'skimming-scanning', title:'略读与查读', note:'先建地图，再定位。' },
      { phase:'三、理解与推断', node:'reading-inference', title:'推断与主旨', note:'作者态度、段落功能、干扰项。' },
      { phase:'三、理解与推断', node:'text-types', title:'文本类型', note:'新闻、论文、文学、技术文档的读法。' },
      { phase:'三、理解与推断', node:'reading-genres', title:'材料类型', note:'按目标选材料。' },
      { phase:'四、精读与泛读', node:'intensive-reading', title:'精读', note:'一篇吃透：词、句、段、逻辑、文化。' },
      { phase:'四、精读与泛读', node:'extensive-reading', title:'泛读', note:'大量、难度适中、不查每个词。' },
      { phase:'四、精读与泛读', node:'exam-reading', title:'考试阅读', note:'定位与同义替换。' },
      { phase:'四、精读与泛读', task:true, title:'每周 1 篇精读 + 3 篇泛读', note:'精读做批注与复述，泛读只记主旨与生词。' }
    ]
  }

]);
