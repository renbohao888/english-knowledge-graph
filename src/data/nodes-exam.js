/* ============================================================
 * 知识点数据：考试与测评 / 方法与工具 / 文化与思维
 * ============================================================ */
window.KB = window.KB || {};
window.KB.NODES = (window.KB.NODES || []).concat([

  /* ==================== 考试与测评 ==================== */

  { id:'exam-overview', name:'英语考试全景', layer:'考试与测评', domain:'考试', status:'待补充', tracks:['考试','方法'], before:['cefr-levels'],
    keywords:['英语考试','考试全景','高考','四六级','考研','雅思','托福','GRE','BEC'],
    children:[
      { group:'国内', name:'高考英语', desc:'词汇、语法、阅读、完形、写作，偏基础与应试。' },
      { group:'国内', name:'四六级 CET', desc:'大学英语四级/六级，听力、阅读、写作、翻译。' },
      { group:'国内', name:'考研英语', desc:'阅读理解与长难句为核心，写作与翻译并重。' },
      { group:'国际', name:'雅思 IELTS', desc:'听说读写四项，生活/学术两类，留学移民通用。' },
      { group:'国际', name:'托福 TOEFL', desc:'学术场景为主，机考，北美留学常用。' },
      { group:'国际', name:'GRE / GMAT', desc:'研究生入学考试，词汇与逻辑难度高。' },
      { group:'职业', name:'BEC 商务英语', desc:'商务场景听说读写，职场认证。' },
      { group:'选择', name:'按目标选考试', desc:'先确定用途（升学、留学、求职），再选考试。' }
    ],
    description:'考试不是学习目的，而是检验与敲门砖。先明确目标考试，再倒推词汇量、题型与时间表。' },

  { id:'gaokao-english', name:'高考英语', layer:'考试与测评', domain:'考试', status:'待补充', tracks:['考试'], before:['exam-overview'],
    keywords:['高考英语','gaokao','完形填空','语法填空','读后续写','应用文写作'],
    children:[
      { group:'题型', name:'听力', desc:'短对话、长对话、独白，抓关键词与场景。' },
      { group:'题型', name:'阅读理解', desc:'细节、主旨、推断、词义猜测。' },
      { group:'题型', name:'完形填空', desc:'语境、搭配、逻辑关系，先通读再选。' },
      { group:'题型', name:'语法填空', desc:'时态、非谓语、从句、词性转换。' },
      { group:'题型', name:'写作', desc:'应用文与读后续写，结构、语言、衔接并重。' },
      { group:'策略', name:'词汇与语法基础', desc:'3500 词左右 + 核心语法体系，是高分底座。' }
    ],
    description:'高考英语的确定性最高：词汇、语法、题型都相对固定。把基础打牢，比刷偏题怪题有效。' },

  { id:'cet4', name:'大学英语四级', layer:'考试与测评', domain:'考试', status:'待补充', tracks:['考试'], before:['exam-overview'],
    keywords:['四级','CET4','四级词汇','四级听力','四级写作','四级翻译'],
    children:[
      { group:'题型', name:'听力', desc:'短篇新闻、长对话、听力篇章，占分高。' },
      { group:'题型', name:'阅读', desc:'选词填空、长篇阅读、仔细阅读。' },
      { group:'题型', name:'写作', desc:'短文写作，观点清楚、结构完整、语言准确。' },
      { group:'题型', name:'翻译', desc:'段落汉译英，中国文化与社会话题常见。' },
      { group:'词汇', name:'四级核心词', desc:'约 4500 词，高频词优先，搭配与词性并重。' },
      { group:'策略', name:'真题驱动', desc:'近 10 套真题精做，比泛做模拟题有效。' }
    ],
    description:'四级是"基础过关型"考试。词汇量、听力反应速度和写作结构是三条主线。' },

  { id:'cet6', name:'大学英语六级', layer:'考试与测评', domain:'考试', status:'待补充', tracks:['考试'], before:['cet4'],
    keywords:['六级','CET6','六级词汇','六级听力','六级写作','六级翻译'],
    children:[
      { group:'差异', name:'词汇与语速', desc:'词汇量约 6000，听力语速与信息密度更高。' },
      { group:'差异', name:'阅读难度', desc:'长难句更多，学术与社会话题比例上升。' },
      { group:'题型', name:'听力', desc:'讲座与对话，笔记与推断能力重要。' },
      { group:'题型', name:'写作与翻译', desc:'语言质量要求更高，模板分下降。' },
      { group:'策略', name:'四级到六级的跃迁', desc:'补词汇、练长难句、提高听力耐受力。' }
    ],
    description:'六级不是"四级加难"，而是词汇、语速、长难句的全面升级。四级靠技巧，六级更靠真实能力。' },

  { id:'kaoyan-english', name:'考研英语', layer:'考试与测评', domain:'考试', status:'待补充', tracks:['考试','学术'], before:['cet6','long-sentence-analysis'],
    keywords:['考研英语','考研','英语一','英语二','长难句','阅读理解','大小作文'],
    children:[
      { group:'题型', name:'完形填空', desc:'英语一有完形，逻辑与搭配并重。' },
      { group:'题型', name:'阅读理解', desc:'四篇文章，细节、推断、态度、主旨。' },
      { group:'题型', name:'新题型', desc:'七选五、排序、小标题匹配。' },
      { group:'题型', name:'翻译', desc:'英语一长难句翻译，英语二段落翻译。' },
      { group:'题型', name:'写作', desc:'小作文书信 + 大作文图表/图画。' },
      { group:'核心', name:'长难句与词汇', desc:'5500 词 + 长难句拆解，是阅读速度与准确率的关键。' },
      { group:'策略', name:'真题精读', desc:'每篇阅读逐句拆解，积累词汇、搭配与逻辑。' }
    ],
    description:'考研英语的胜负在阅读，阅读的胜负在长难句与词汇。真题精读是最有效的训练方式。' },

  { id:'ielts', name:'雅思 IELTS', layer:'考试与测评', domain:'考试', status:'待补充', tracks:['考试','学术'], before:['exam-overview','essay-writing','listening-strategies'],
    keywords:['雅思','IELTS','雅思听力','雅思阅读','雅思写作','雅思口语','band 7'],
    children:[
      { group:'听力', name:'场景与题型', desc:'生活与学术场景，填空、选择、地图、匹配。' },
      { group:'阅读', name:'三篇长文', desc:'学术文章，判断题、匹配题、填空题，时间压力大。' },
      { group:'写作', name:'Task 1 图表', desc:'描述趋势、比较数据，150 词。' },
      { group:'写作', name:'Task 2 议论文', desc:'观点论证，250 词，论点、结构、语言并重。' },
      { group:'口语', name:'三部分面试', desc:'日常问答、话题卡、深入讨论。' },
      { group:'评分', name:'四项评分标准', desc:'流利度、词汇、语法、发音，写作另看任务回应与连贯。' },
      { group:'策略', name:'按 band 目标倒推', desc:'6.5 与 7.5 对词汇、语法、论证的要求不同。' }
    ],
    description:'雅思是能力型考试，技巧有上限。写作与口语的分数，最终取决于真实表达与论证能力。' },

  { id:'toefl', name:'托福 TOEFL', layer:'考试与测评', domain:'考试', status:'待补充', tracks:['考试','学术'], before:['exam-overview','listening-strategies','academic-writing'],
    keywords:['托福','TOEFL','托福听力','托福阅读','托福写作','托福口语','integrated'],
    children:[
      { group:'阅读', name:'学术文章', desc:'三篇学术阅读，词汇与逻辑并重。' },
      { group:'听力', name:'讲座与对话', desc:'学术讲座为主，笔记能力关键。' },
      { group:'口语', name:'独立与综合', desc:'独立题表达观点，综合题先读听再说。' },
      { group:'写作', name:'综合写作', desc:'读 + 听 + 写，复述并对比观点。' },
      { group:'写作', name:'学术讨论', desc:'新题型：在讨论中表达并支持观点。' },
      { group:'策略', name:'学术场景适应', desc:'熟悉校园与学科话题，积累学术词汇。' }
    ],
    description:'托福高度学术化，听力与笔记是核心。综合题考的是"信息整合"，不是背模板。' },

  { id:'gre', name:'GRE', layer:'考试与测评', domain:'考试', status:'待补充', tracks:['考试','学术'], before:['exam-overview','academic-vocabulary'],
    keywords:['GRE','GRE词汇','填空','阅读','分析性写作','argument','issue'],
    children:[
      { group:'词汇', name:'高难词汇', desc:'填空与阅读中的学术与抽象词，词根词缀帮助大。' },
      { group:'填空', name:'句子等价与填空', desc:'逻辑关系、词义辨析、双重空格。' },
      { group:'阅读', name:'学术阅读', desc:'长文章、逻辑结构、作者态度。' },
      { group:'写作', name:'Issue', desc:'表达并论证观点，逻辑与例证。' },
      { group:'写作', name:'Argument', desc:'分析一段论证的漏洞，不是表达自己观点。' },
      { group:'策略', name:'逻辑优先', desc:'GRE 考逻辑与词汇深度，不是语言基础。' }
    ],
    description:'GRE 是"逻辑 + 高难词汇"的考试。语言只是载体，论证结构与词义精度才是考点。' },

  { id:'bec', name:'商务英语 BEC', layer:'考试与测评', domain:'考试', status:'待补充', tracks:['考试','商务'], before:['business-vocabulary','business-writing'],
    keywords:['BEC','商务英语','剑桥商务英语','BEC中级','BEC高级','商务听力','商务写作'],
    children:[
      { group:'级别', name:'BEC 初级/中级/高级', desc:'对应不同职场场景与语言难度。' },
      { group:'题型', name:'听力', desc:'会议、电话、访谈，抓关键信息与意图。' },
      { group:'题型', name:'阅读', desc:'商务文本、图表、匹配与填空。' },
      { group:'题型', name:'写作', desc:'邮件、报告、提案，格式与语气重要。' },
      { group:'题型', name:'口语', desc:'商务场景对话与个人陈述。' },
      { group:'策略', name:'场景词汇与套语', desc:'按会议、谈判、邮件、报告积累词块。' }
    ],
    description:'BEC 考的是"职场能不能用英语办事"。商务场景词汇、邮件格式与礼貌语气是重点。' },

  { id:'exam-vocabulary', name:'考试词汇策略', layer:'考试与测评', domain:'考试', status:'待补充', tracks:['考试','词汇'], before:['word-frequency','spaced-repetition'],
    keywords:['考试词汇','背单词','词汇书','高频词','真题词汇','词根词缀'],
    children:[
      { group:'策略', name:'高频词优先', desc:'先背真题高频词，再补低频词。' },
      { group:'策略', name:'真题语境记忆', desc:'在真题句子里记词，搭配与用法一起掌握。' },
      { group:'策略', name:'词根词缀辅助', desc:'长词拆解，降低记忆负担。' },
      { group:'策略', name:'间隔重复', desc:'按遗忘曲线复习，而不是一次性猛背。' },
      { group:'策略', name:'输出检验', desc:'用词造句、写作、口语中使用，才算真正掌握。' },
      { group:'误区', name:'只背中文释义', desc:'不记词性、搭配、例句，考试时仍然用错。' }
    ],
    description:'考试词汇的关键不是"背了多少"，而是"真题里认得出、写作里用得上"。语境 + 重复 + 输出，三者缺一不可。' },

  { id:'exam-reading', name:'考试阅读策略', layer:'考试与测评', domain:'考试', status:'待补充', tracks:['考试','读写'], before:['skimming-scanning','reading-inference'],
    keywords:['考试阅读','阅读技巧','定位','同义替换','干扰项','判断题','匹配题'],
    children:[
      { group:'流程', name:'先题后文', desc:'先看题目与关键词，再回原文定位。' },
      { group:'流程', name:'定位与同义替换', desc:'题目词与原文词往往不同，要识别同义表达。' },
      { group:'题型', name:'细节题', desc:'定位到句，逐词比对，警惕偷换概念。' },
      { group:'题型', name:'主旨与推断', desc:'看首尾段、段落主题句与作者态度。' },
      { group:'题型', name:'判断题', desc:'TRUE/FALSE/NOT GIVEN 的分界，是雅思高频难点。' },
      { group:'题型', name:'匹配题', desc:'先读题干，再扫读段落，抓关键词与同义替换。' },
      { group:'策略', name:'时间分配', desc:'先做容易定位的题，难题标记后回头。' }
    ],
    description:'考试阅读的核心是"定位 + 同义替换 + 排除干扰"。读得懂全文不等于做对题，题型策略同样重要。' },

  { id:'exam-writing', name:'考试写作策略', layer:'考试与测评', domain:'考试', status:'待补充', tracks:['考试','读写'], before:['essay-writing','argumentative-writing'],
    keywords:['考试写作','作文模板','雅思写作','考研作文','四六级作文','结构','论点'],
    children:[
      { group:'结构', name:'三段式与四段式', desc:'开头点题、主体分述、结尾总结。' },
      { group:'结构', name:'论点与分论点', desc:'每段一个分论点，开头句直接给出。' },
      { group:'论证', name:'举例与解释', desc:'例子要具体，解释要说明它为什么支持论点。' },
      { group:'语言', name:'句式多样性', desc:'简单句、从句、非谓语交替使用。' },
      { group:'语言', name:'连接与衔接', desc:'段落之间、句子之间要有逻辑连接。' },
      { group:'策略', name:'模板的边界', desc:'模板保底，但要有自己的观点与例子。' },
      { group:'检查', name:'留 3 分钟检查', desc:'主谓一致、时态、拼写、冠词。' }
    ],
    description:'考试写作是"在有限时间里写出结构清楚、论证完整的文章"。模板可以用，但不能只有模板。' },

  { id:'exam-listening', name:'考试听力策略', layer:'考试与测评', domain:'考试', status:'待补充', tracks:['考试','听说'], before:['listening-strategies'],
    keywords:['考试听力','听力技巧','预读题目','关键词','同义替换','听力填空'],
    children:[
      { group:'流程', name:'预读题目', desc:'利用播放前的时间读题，预测场景与答案类型。' },
      { group:'流程', name:'抓信号词', desc:'however、so、actually、the answer is 提示答案位置。' },
      { group:'题型', name:'填空题', desc:'注意字数限制、拼写、单复数。' },
      { group:'题型', name:'选择题', desc:'排除同义替换与部分匹配的干扰项。' },
      { group:'题型', name:'地图与匹配', desc:'先看方位词与选项，边听边标记。' },
      { group:'策略', name:'放弃与跟上', desc:'漏掉一题立刻放手，跟上下一题。' }
    ],
    description:'考试听力的关键在"预读 + 定位 + 放手"。漏一题不可怕，卡住才会连丢后面的分。' },

  { id:'exam-speaking', name:'口语考试策略', layer:'考试与测评', domain:'考试', status:'待补充', tracks:['考试','听说'], before:['speaking-fluency','ielts'],
    keywords:['口语考试','雅思口语','托福口语','part 2','话题卡','流利度'],
    children:[
      { group:'评分', name:'流利度与连贯', desc:'少停顿、有逻辑连接、能展开。' },
      { group:'评分', name:'词汇资源', desc:'用词多样、搭配自然，不追求生僻词。' },
      { group:'评分', name:'语法范围与准确', desc:'复杂句与基本准确之间的平衡。' },
      { group:'评分', name:'发音', desc:'清晰、重音正确、语调自然。' },
      { group:'技巧', name:'话题卡展开', desc:'观点、原因、例子、总结，四步展开。' },
      { group:'技巧', name:'争取思考时间', desc:'Well、That\'s an interesting question…。' },
      { group:'技巧', name:'不会的话题', desc:'诚实说明并转到相关话题，不要沉默。' }
    ],
    description:'口语考试不是知识竞赛，而是"能不能持续、清楚地表达"。流利、自然、有展开，比生僻词更重要。' },

  { id:'test-strategy', name:'应试策略与时间管理', layer:'考试与测评', domain:'考试', status:'待补充', tracks:['考试','方法'], before:['exam-overview','habit-motivation'],
    keywords:['应试策略','时间管理','模拟考试','错题','心态','考试技巧'],
    children:[
      { group:'准备', name:'真题与模拟', desc:'按考试时间完整模考，训练节奏与耐力。' },
      { group:'准备', name:'错题分析', desc:'错题按题型分类，找出稳定失分点。' },
      { group:'准备', name:'词汇与题型清单', desc:'考前一周只复习高频词与错题。' },
      { group:'考场', name:'时间分配', desc:'按分值分配时间，留检查时间。' },
      { group:'考场', name:'先易后难', desc:'保证会做的题拿满，再攻难题。' },
      { group:'心态', name:'紧张管理', desc:'呼吸、预演、接受不完美。' },
      { group:'复盘', name:'考后总结', desc:'记录哪些策略有效，为下一次考试复用。' }
    ],
    description:'应试策略是"把会的东西稳定发挥出来"。模考、错题、时间分配、心态，四项一起练。' },

  /* ==================== 方法与工具 ==================== */

  { id:'learning-path', name:'学习路径设计', layer:'方法与工具', domain:'方法', status:'待补充', tracks:['方法'], before:['self-assessment'],
    keywords:['learning path','学习路径','学习计划','目标','里程碑','倒推'],
    children:[
      { group:'步骤', name:'确定目标', desc:'考试分数、工作场景、兴趣目标，越具体越好。' },
      { group:'步骤', name:'评估起点', desc:'用测试或自评确定当前 CEFR 等级与薄弱项。' },
      { group:'步骤', name:'拆解里程碑', desc:'把大目标拆成每月、每周可完成的小目标。' },
      { group:'步骤', name:'安排输入输出', desc:'每天固定听读输入，每周固定说写输出。' },
      { group:'步骤', name:'定期复盘', desc:'每月回顾进度，调整材料与方法。' },
      { group:'原则', name:'少而持续', desc:'每天 30 分钟坚持一年，胜过突击三个月。' }
    ],
    description:'学习路径的本质是"从目标倒推每天做什么"。没有路径，努力就会碎成一地。' },

  { id:'spaced-repetition', name:'间隔重复', layer:'方法与工具', domain:'方法', status:'待补充', tracks:['方法','词汇'], before:['learning-path'],
    keywords:['spaced repetition','间隔重复','遗忘曲线','艾宾浩斯','复习','SRS'],
    children:[
      { group:'原理', name:'遗忘曲线', desc:'新知识在最初几天遗忘最快，之后趋缓。' },
      { group:'原理', name:'间隔设计', desc:'1 天、3 天、7 天、15 天、30 天逐步拉长。' },
      { group:'工具', name:'Anki 与 SRS', desc:'根据回答质量自动安排下次复习时间。' },
      { group:'方法', name:'主动回忆', desc:'先回想再看答案，比反复阅读有效。' },
      { group:'方法', name:'卡片设计', desc:'一张卡一个知识点，问题具体，答案简短。' },
      { group:'注意', name:'不要只背单词', desc:'搭配、例句、发音一起放进卡片。' }
    ],
    description:'间隔重复是对抗遗忘的工程方法。关键不是"多看"，而是"在快忘的时候主动回忆一次"。' },

  { id:'flashcards', name:'闪卡与 Anki', layer:'方法与工具', domain:'方法', status:'待补充', tracks:['方法','词汇'], before:['spaced-repetition'],
    keywords:['flashcards','闪卡','Anki','卡片','正面背面','复习'],
    children:[
      { group:'设计', name:'正面与背面', desc:'正面提问，背面答案 + 例句 + 发音。' },
      { group:'设计', name:'最小信息原则', desc:'一张卡只考一个点，避免信息过载。' },
      { group:'设计', name:'双向卡片', desc:'英→中、中→英，输出与输入都练。' },
      { group:'工具', name:'Anki 使用', desc:'牌组、标签、每日新卡上限、复习队列。' },
      { group:'工具', name:'自制与共享牌组', desc:'优先自制，共享牌组要筛选。' },
      { group:'方法', name:'卡片与语境', desc:'把真题例句放进卡片，避免孤立背词。' }
    ],
    description:'闪卡的价值在"主动回忆 + 间隔安排"。卡片设计得越具体，复习效率越高。' },

  { id:'vocabulary-learning', name:'词汇学习方法', layer:'方法与工具', domain:'方法', status:'待补充', tracks:['方法','词汇'], before:['spaced-repetition','word-frequency'],
    keywords:['词汇学习','背单词','词根词缀','语境','词块','输出','词汇量'],
    children:[
      { group:'原则', name:'高频优先', desc:'先掌握最高频的 3000-5000 词。' },
      { group:'原则', name:'词块记忆', desc:'记搭配与例句，而不是孤立词义。' },
      { group:'原则', name:'多通道编码', desc:'听、说、读、写、拆词，五条路一起走。' },
      { group:'方法', name:'词根词缀', desc:'长词拆解，建立词族网络。' },
      { group:'方法', name:'语境学习', desc:'在文章、影视、对话中遇到并复现。' },
      { group:'方法', name:'输出驱动', desc:'用新词造句、写作、口语，检验是否掌握。' },
      { group:'工具', name:'词频与词典', desc:'用词频判断优先级，用词典查搭配与例句。' }
    ],
    description:'词汇学习的核心是"重复 + 语境 + 使用"。只背词表，遗忘快、用不出；放进语境并主动使用，才真正属于你。' },

  { id:'grammar-learning', name:'语法学习方法', layer:'方法与工具', domain:'方法', status:'待补充', tracks:['方法','语法'], before:['learning-path','tense-system'],
    keywords:['语法学习','语法体系','规则','例句','输出','纠错'],
    children:[
      { group:'路径', name:'先框架后细节', desc:'先建立词性—句子—时态—从句的框架，再补细节。' },
      { group:'路径', name:'规则 + 例句', desc:'每条规则至少配 3 个例句，避免只背术语。' },
      { group:'方法', name:'对比与纠错', desc:'通过改错、翻译、写作暴露问题。' },
      { group:'方法', name:'输出驱动', desc:'写作和口语中使用语法，而不是只做选择题。' },
      { group:'方法', name:'语感与规则结合', desc:'大量输入建立语感，规则用来解释和纠错。' },
      { group:'误区', name:'只刷语法题', desc:'会做题不等于会使用，必须落到输出。' }
    ],
    description:'语法不是用来背的，是用来解释和纠错的。框架 + 例句 + 输出，才能把规则变成语感。' },

  { id:'comprehensible-input', name:'可理解输入', layer:'方法与工具', domain:'方法', status:'待补充', tracks:['方法','听说','读写'], before:['sla-theory','learning-path'],
    keywords:['comprehensible input','可理解输入','i+1','Krashen','输入','听读'],
    children:[
      { group:'原理', name:'i+1', desc:'材料略高于当前水平，既有挑战又能理解。' },
      { group:'原理', name:'大量输入', desc:'语言能力来自大量可理解的语言接触。' },
      { group:'材料', name:'分级读物与播客', desc:'按难度选择，保持 90% 以上理解度。' },
      { group:'材料', name:'兴趣驱动', desc:'选自己真正感兴趣的内容，才能持续。' },
      { group:'方法', name:'重复输入', desc:'同一材料反复听读，注意不同层次的信息。' },
      { group:'注意', name:'输入不等于理解', desc:'听不懂、读不懂的材料，只是噪音。' }
    ],
    description:'可理解输入是语言习得的地基。材料太难会挫败，太简单没进步，i+1 才是甜区。' },

  { id:'output-practice', name:'输出练习', layer:'方法与工具', domain:'方法', status:'待补充', tracks:['方法','听说','读写'], before:['comprehensible-input'],
    keywords:['output','输出练习','说','写','复述','写作','口语','feedback'],
    children:[
      { group:'形式', name:'口语输出', desc:'独白、复述、对话、演讲，每天固定说。' },
      { group:'形式', name:'写作输出', desc:'日记、摘要、作文、邮件，每周固定写。' },
      { group:'方法', name:'复述与总结', desc:'读完、听完用自己的话讲出来。' },
      { group:'方法', name:'模仿与改写', desc:'模仿地道句式，再改写成自己的内容。' },
      { group:'反馈', name:'录音与批改', desc:'录音回听、找老师或工具批改。' },
      { group:'循环', name:'输入—输出—纠错', desc:'输出暴露问题，再回到输入补足。' }
    ],
    description:'输入决定上限，输出决定掌握。只输入不输出，知识会停在"认识"层面，永远用不出来。' },

  { id:'immersion', name:'沉浸式学习', layer:'方法与工具', domain:'方法', status:'待补充', tracks:['方法','文化'], before:['comprehensible-input'],
    keywords:['immersion','沉浸式','语言环境','英语环境','手机语言','全英'],
    children:[
      { group:'环境', name:'把设备切成英语', desc:'手机、系统、社交媒体界面改成英语。' },
      { group:'环境', name:'英语媒体', desc:'播客、YouTube、新闻、影视，替代部分中文娱乐。' },
      { group:'环境', name:'英语社交', desc:'语言交换、英语角、线上社群。' },
      { group:'方法', name:'可理解输入优先', desc:'沉浸不等于听不懂硬听，仍要选合适难度。' },
      { group:'方法', name:'输出机会', desc:'沉浸环境里主动说、写，而不是只当观众。' },
      { group:'注意', name:'沉浸不能替代刻意练习', desc:'语法、发音、写作仍需专项训练。' }
    ],
    description:'沉浸能大幅增加接触量，但不能替代刻意练习。把环境变成英语，再把问题拿出来专项解决。' },

  { id:'corpus', name:'语料库', layer:'方法与工具', domain:'方法', status:'待补充', tracks:['方法','词汇','学术'], before:['collocations','dictionaries'],
    keywords:['corpus','语料库','COCA','BNC','Sketch Engine','搭配查询','词频'],
    children:[
      { group:'概念', name:'什么是语料库', desc:'大规模真实文本集合，用来观察词频、搭配与用法。' },
      { group:'工具', name:'COCA / BNC', desc:'当代美语与英式英语语料库，可查词频与搭配。' },
      { group:'工具', name:'Sketch Engine', desc:'搭配、同义词、词 sketch 的可视化查询。' },
      { group:'方法', name:'查搭配', desc:'输入词，观察它前后高频出现的词。' },
      { group:'方法', name:'查语域', desc:'比较口语与学术语料中的用法差异。' },
      { group:'应用', name:'写作与翻译', desc:'拿不准的表达，用母语者语料验证。' }
    ],
    description:'语料库是"母语者怎么说话"的证据库。写作和翻译拿不准时，查语料比凭感觉可靠。' },

  { id:'dictionaries', name:'词典使用', layer:'方法与工具', domain:'方法', status:'待补充', tracks:['方法','词汇'], before:['ipa','collocations'],
    keywords:['dictionary','词典','牛津','朗文','柯林斯','英英词典','电子词典','例句'],
    children:[
      { group:'类型', name:'英汉词典', desc:'快速理解词义，适合初学与阅读。' },
      { group:'类型', name:'英英词典', desc:'建立英语思维，理解细微差别与用法。' },
      { group:'类型', name:'搭配与同义词词典', desc:'查搭配、辨析同义词，写作必备。' },
      { group:'信息', name:'音标与发音', desc:'看音标、听音频，确认发音。' },
      { group:'信息', name:'词性、搭配与例句', desc:'一个词要看词性、典型搭配、例句与语域。' },
      { group:'信息', name:'词频与标签', desc:'高频词、学术词、考试词标签帮助排序。' },
      { group:'方法', name:'双词典策略', desc:'英汉快速理解，英英确认用法。' }
    ],
    description:'词典不是"查中文意思"的工具，而是"查用法"的工具。音标、词性、搭配、例句，一个都不能少。' },

  { id:'learning-tools', name:'工具与 App', layer:'方法与工具', domain:'方法', status:'待补充', tracks:['方法'], before:['dictionaries','flashcards'],
    keywords:['学习工具','App','Anki','欧路','Grammarly','DeepL','播客','工具'],
    children:[
      { group:'词汇', name:'Anki / 欧路词典', desc:'闪卡复习与词典查词结合。' },
      { group:'听力', name:'播客与精听工具', desc:'变速、复读、听写工具。' },
      { group:'写作', name:'Grammarly / 写作助手', desc:'语法与表达检查，但不能替代判断。' },
      { group:'翻译', name:'DeepL / ChatGPT', desc:'辅助理解与初稿，注意核对。' },
      { group:'语料', name:'语料库与搭配词典', desc:'验证用法与搭配。' },
      { group:'管理', name:'笔记与任务工具', desc:'Notion、Obsidian 管理学习记录。' },
      { group:'原则', name:'工具服务于方法', desc:'不要收集工具，选 2-3 个长期用。' }
    ],
    description:'工具能降低摩擦，但不能替代练习。选少量趁手的工具，长期用，比不断换 App 有效。' },

  { id:'note-taking', name:'笔记与错题本', layer:'方法与工具', domain:'方法', status:'待补充', tracks:['方法'], before:['learning-path'],
    keywords:['note taking','笔记','错题本','康奈尔笔记','复习','记录'],
    children:[
      { group:'笔记', name:'康奈尔笔记', desc:'线索、笔记、总结三栏，便于复习。' },
      { group:'笔记', name:'词汇笔记', desc:'词、音标、词性、搭配、例句、易混词。' },
      { group:'笔记', name:'语法笔记', desc:'规则 + 例句 + 自己的错句。' },
      { group:'错题', name:'错题本', desc:'原题、错因、正确思路、同类题。' },
      { group:'方法', name:'定期回看', desc:'笔记不复习等于没记。' },
      { group:'方法', name:'数字化', desc:'用标签与搜索管理，方便检索。' }
    ],
    description:'笔记的价值在"二次加工 + 定期回看"。抄书式笔记只是搬运，不会变成能力。' },

  { id:'habit-motivation', name:'习惯与坚持', layer:'方法与工具', domain:'方法', status:'待补充', tracks:['方法'], before:['learning-path'],
    keywords:['习惯','坚持','动机','自律','学习计划','微习惯'],
    children:[
      { group:'习惯', name:'微习惯', desc:'每天 10 分钟起步，降低启动成本。' },
      { group:'习惯', name:'固定时间地点', desc:'把学习绑定到固定场景，减少决策消耗。' },
      { group:'动机', name:'内在动机', desc:'选感兴趣的材料，让学习本身有回报。' },
      { group:'动机', name:'可见进度', desc:'记录天数、词汇量、成绩，获得反馈。' },
      { group:'方法', name:'允许中断', desc:'断一天不要自责，第二天继续即可。' },
      { group:'方法', name:'社群与同伴', desc:'找学习伙伴，互相监督与交流。' }
    ],
    description:'坚持不是靠意志力，而是靠低门槛、固定场景和可见反馈。把学习变成日常，而不是项目。' },

  { id:'self-assessment', name:'自我评估', layer:'方法与工具', domain:'方法', status:'待补充', tracks:['方法','考试'], before:['cefr-levels'],
    keywords:['self assessment','自我评估','水平测试','CEFR','词汇量测试','诊断'],
    children:[
      { group:'方法', name:'CEFR 自评表', desc:'用 can-do 描述判断听说读写等级。' },
      { group:'方法', name:'词汇量测试', desc:'抽样词表估算认识比例。' },
      { group:'方法', name:'真题模考', desc:'按考试要求完整做一套，得到客观分数。' },
      { group:'方法', name:'错误诊断', desc:'按题型与知识点统计失分，找出薄弱项。' },
      { group:'方法', name:'定期复测', desc:'每 1-3 个月复测一次，验证进步。' },
      { group:'应用', name:'调整学习路径', desc:'评估结果直接决定下一步材料与方法。' }
    ],
    description:'没有评估，学习就是盲人摸象。定期用测试和错误统计定位自己，路径才不会跑偏。' },

  { id:'sla-theory', name:'二语习得理论', layer:'方法与工具', domain:'方法', status:'待补充', tracks:['方法','思维'], before:['learning-path'],
    keywords:['SLA','二语习得','Krashen','输入假说','情感过滤','中介语','interlanguage'],
    children:[
      { group:'理论', name:'输入假说', desc:'语言能力来自可理解输入，i+1 是核心。' },
      { group:'理论', name:'情感过滤假说', desc:'焦虑、动机、自信影响输入能否被吸收。' },
      { group:'理论', name:'中介语 interlanguage', desc:'学习者的语言系统在母语与目标语之间逐步发展。' },
      { group:'理论', name:'输出假说', desc:'输出迫使学习者注意语言形式，促进习得。' },
      { group:'理论', name:'互动假说', desc:'意义协商与互动推动语言发展。' },
      { group:'应用', name:'理论指导方法', desc:'输入、输出、互动、情感，四条线一起设计学习。' }
    ],
    description:'二语习得理论不是学术装饰，它解释了"为什么有效"。输入、输出、互动、情感过滤，是设计学习方法的四根柱子。' },

  /* ==================== 文化与思维 ==================== */

  { id:'english-history', name:'英语发展史', layer:'文化与思维', domain:'文化', status:'待补充', tracks:['文化','词汇'], before:['etymology'],
    keywords:['history of english','英语史','古英语','中古英语','现代英语','诺曼征服'],
    children:[
      { group:'阶段', name:'古英语', desc:'日耳曼语系，核心词汇与语法形态复杂。' },
      { group:'阶段', name:'中古英语', desc:'诺曼征服后法语大量进入，语法简化。' },
      { group:'阶段', name:'早期现代英语', desc:'印刷术、莎士比亚、拉丁希腊借词涌入。' },
      { group:'阶段', name:'现代英语', desc:'殖民与全球化，英语成为世界语言。' },
      { group:'影响', name:'词汇分层', desc:'日常词日耳曼、正式词法语、学术词拉丁希腊。' },
      { group:'影响', name:'拼写不一致', desc:'历史拼写保留，导致拼写与读音脱节。' }
    ],
    description:'英语的历史解释了它的"不规则"：三层词汇、复杂拼写、丰富借词，都是历史留下的地层。' },

  { id:'varieties', name:'英语变体', layer:'文化与思维', domain:'文化', status:'待补充', tracks:['文化','语音'], before:['british-american'],
    keywords:['varieties of english','英语变体','英式','美式','澳式','印度英语','世界英语'],
    children:[
      { group:'主要变体', name:'英式英语', desc:'RP 与非 RP，拼写与词汇的英国标准。' },
      { group:'主要变体', name:'美式英语', desc:'卷舌音、拼写简化、词汇差异。' },
      { group:'主要变体', name:'澳新英语', desc:'元音迁移、口语缩略与独特词汇。' },
      { group:'主要变体', name:'印度英语', desc:'音系与语法受本地语言影响，人口基数大。' },
      { group:'态度', name:'没有唯一标准', desc:'不同变体都是合法英语，关键是清晰与得体。' },
      { group:'选择', name:'输出固定一种', desc:'说写固定一种变体，听力适应多种。' }
    ],
    description:'英语属于全世界，不只有英美两种。输出选一种标准，输入多接触几种口音，才是现实策略。' },

  { id:'culture-context', name:'英语国家文化', layer:'文化与思维', domain:'文化', status:'待补充', tracks:['文化'], before:['english-history'],
    keywords:['culture','文化','英美文化','节日','礼仪','价值观','社会'],
    children:[
      { group:'主题', name:'节日与习俗', desc:'感恩节、圣诞节、复活节、Bank Holiday。' },
      { group:'主题', name:'教育体系', desc:'英美学校、大学申请、课堂文化。' },
      { group:'主题', name:'职场文化', desc:'直接沟通、时间观念、work-life balance。' },
      { group:'主题', name:'社会议题', desc:'多元文化、政治正确、社会福利。' },
      { group:'主题', name:'媒体与娱乐', desc:'新闻媒体、影视、体育、流行文化。' },
      { group:'应用', name:'语言中的文化', desc:'习语、幽默、礼貌都嵌在文化里。' }
    ],
    description:'语言不是真空里的符号。了解文化背景，才能真正读懂新闻、笑话、习语和潜台词。' },

  { id:'pragmatics', name:'语用学', layer:'文化与思维', domain:'文化', status:'待补充', tracks:['文化','思维','听说'], before:['functional-language'],
    keywords:['pragmatics','语用学','言语行为','会话含义','implicature','speech act','语境'],
    children:[
      { group:'概念', name:'言语行为', desc:'说话即做事：请求、承诺、道歉、命令。' },
      { group:'概念', name:'会话含义', desc:'字面之外的含义，靠语境与共有知识推断。' },
      { group:'概念', name:'合作原则', desc:'数量、质量、关系、方式四条准则，以及故意违反。' },
      { group:'概念', name:'指示语', desc:'this、here、now 的意义依赖语境。' },
      { group:'应用', name:'听懂话外音', desc:'"It\'s cold in here" 可能是在请求关窗。' },
      { group:'应用', name:'跨文化差异', desc:'直接与间接、礼貌策略在不同文化中不同。' }
    ],
    description:'语用学研究"话外之意"。听力与阅读到高级阶段，拼的就是语用推理能力。' },

  { id:'politeness', name:'礼貌与委婉', layer:'文化与思维', domain:'文化', status:'待补充', tracks:['文化','听说','商务'], before:['pragmatics','modal-verbs'],
    keywords:['politeness','礼貌','委婉','请求','拒绝','面子','face','would you mind'],
    children:[
      { group:'策略', name:'间接请求', desc:'Could you possibly…? I was wondering if…。' },
      { group:'策略', name:'委婉拒绝', desc:'I\'m afraid…、I\'d love to, but…、That might be difficult。' },
      { group:'策略', name:'软化语气', desc:'a bit、perhaps、maybe、I think。' },
      { group:'策略', name:'道歉与感谢', desc:'程度与场合匹配，不要过度也不要不足。' },
      { group:'文化', name:'直接与间接', desc:'英语职场可以直接说问题，但要用礼貌框架。' },
      { group:'应用', name:'邮件与谈判', desc:'礼貌不是软弱，而是给对方留面子。' }
    ],
    description:'礼貌是英语社交的底层协议。同样一个请求，换个说法，接受率完全不同。' },

  { id:'humor', name:'幽默与双关', layer:'文化与思维', domain:'文化', status:'待补充', tracks:['文化','听说','文学'], before:['pragmatics','figurative-language'],
    keywords:['humor','幽默','双关','pun','irony','sarcasm','笑话','sitcom'],
    children:[
      { group:'类型', name:'双关 pun', desc:'利用同音或一词多义制造笑点。' },
      { group:'类型', name:'反讽 irony', desc:'字面与真实态度相反。' },
      { group:'类型', name:'自嘲与夸张', desc:'英式幽默常见自嘲、轻描淡写与夸张。' },
      { group:'类型', name:'文化梗', desc:'需要共同的文化背景与流行文化知识。' },
      { group:'应用', name:'看懂情景喜剧', desc:'笑点常藏在语气、双关与文化引用里。' },
      { group:'注意', name:'不要随便模仿', desc:'讽刺与玩笑对关系与场合要求高。' }
    ],
    description:'幽默是语言与文化的高阶组合。听懂笑点，意味着你不仅懂词，还懂语境与文化。' },

  { id:'critical-thinking', name:'批判性思维与论证', layer:'文化与思维', domain:'思维', status:'待补充', tracks:['思维','读写','学术'], before:['argumentative-writing'],
    keywords:['critical thinking','批判性思维','论证','逻辑谬误','evidence','assumption'],
    children:[
      { group:'论证', name:'论点与证据', desc:'主张必须有理由与证据支撑。' },
      { group:'论证', name:'隐含假设', desc:'论证背后未说出的前提，往往是漏洞所在。' },
      { group:'论证', name:'反驳与让步', desc:'认真对待反方最强论点，而不是稻草人。' },
      { group:'谬误', name:'常见逻辑谬误', desc:'人身攻击、滑坡、虚假两难、以偏概全。' },
      { group:'阅读', name:'识别作者立场', desc:'区分事实、观点、推测与宣传。' },
      { group:'写作', name:'构建可信论证', desc:'论点清楚、证据充分、推理透明、边界明确。' },
      { group:'应用', name:'学术与职场', desc:'论文、报告、辩论都依赖这套能力。' }
    ],
    description:'批判性思维不是"抬杠"，而是"检查论证是否站得住"。英语学术与职场沟通的核心能力。' },

  { id:'literature', name:'英语文学入门', layer:'文化与思维', domain:'文化', status:'待补充', tracks:['文学','文化','读写'], before:['figurative-language','reading-genres'],
    keywords:['english literature','英语文学','莎士比亚','小说','诗歌','戏剧','文学史'],
    children:[
      { group:'体裁', name:'诗歌 poetry', desc:'意象、节奏、押韵、分行与多义。' },
      { group:'体裁', name:'小说 novel', desc:'叙述视角、人物、情节、主题与象征。' },
      { group:'体裁', name:'戏剧 drama', desc:'对话、冲突、舞台指示与潜台词。' },
      { group:'历史', name:'经典作家与时期', desc:'莎士比亚、浪漫主义、维多利亚小说、现代主义。' },
      { group:'方法', name:'如何读文学', desc:'关注语言、结构、意象、历史语境与多义性。' },
      { group:'应用', name:'语言与审美', desc:'文学阅读提升语感、修辞理解与文化深度。' }
    ],
    description:'文学是语言的高浓度样本。读文学不是为了考试，而是为了感受英语的表达上限与文化深度。' },

  { id:'media-literacy', name:'英语媒体与新闻', layer:'文化与思维', domain:'文化', status:'待补充', tracks:['文化','读写','思维'], before:['reading-genres','text-types'],
    keywords:['media literacy','媒体素养','新闻','BBC','CNN','标题','假新闻','bias'],
    children:[
      { group:'结构', name:'新闻结构', desc:'标题、导语、倒金字塔、引语与背景。' },
      { group:'语言', name:'新闻语言特点', desc:'名词化、被动、短标题、委婉语。' },
      { group:'批判', name:'立场与偏见', desc:'选词、引语选择、消息源都能体现立场。' },
      { group:'批判', name:'假新闻识别', desc:'查来源、交叉验证、警惕情绪化标题。' },
      { group:'类型', name:'媒体类型', desc:'通讯社、报纸、电视、社交媒体、自媒体。' },
      { group:'应用', name:'每天读一篇', desc:'选一个媒体，按结构拆解一篇新闻。' }
    ],
    description:'读新闻不仅练英语，也练判断力。知道媒体怎么组织信息，才不会被标题带着走。' },

  { id:'global-english', name:'全球英语', layer:'文化与思维', domain:'文化', status:'待补充', tracks:['文化','思维'], before:['varieties'],
    keywords:['global english','全球英语','ELF','世界英语',' lingua franca','国际交流'],
    children:[
      { group:'概念', name:'英语作为通用语', desc:'非母语者之间用英语交流，人数远超母语者。' },
      { group:'概念', name:'ELF 的特点', desc:'简化、灵活、以沟通效果为导向。' },
      { group:'态度', name:'清晰比口音重要', desc:'目标是互相理解，不是模仿某国口音。' },
      { group:'态度', name:'文化多样性', desc:'英语不再只属于英美，表达方式更加多元。' },
      { group:'应用', name:'国际职场', desc:'与不同母语背景的人合作，适应多种口音与表达。' }
    ],
    description:'大多数英语交流发生在非母语者之间。说得清楚、听得懂多种口音，比"像英国人"更实用。' }

]);
