/* ============================================================
 * 知识点数据：篇章·修辞·文体 / 听力与口语 / 阅读与写作 / 翻译与对比
 * ============================================================ */
window.KB = window.KB || {};
window.KB.NODES = (window.KB.NODES || []).concat([

  /* ==================== 篇章·修辞·文体 ==================== */

  { id:'cohesion', name:'衔接', layer:'篇章·修辞·文体', domain:'写作', status:'待补充', tracks:['读写','学术'], before:['clauses-overview','pronouns'],
    keywords:['cohesion','衔接','照应','替代','省略','连接词','词汇衔接','reference'],
    children:[
      { group:'手段', name:'照应 reference', desc:'用代词、指示词回指前文：this、they、the former。' },
      { group:'手段', name:'替代与省略', desc:'用 one/do so 替代，或直接省略重复成分。' },
      { group:'手段', name:'连接 conjunction', desc:'however、therefore、in addition 等逻辑连接词。' },
      { group:'手段', name:'词汇衔接', desc:'同义词、反义词、上下义词、重复关键词形成词汇链。' },
      { group:'应用', name:'段落之间怎么接', desc:'每段开头用衔接手段回扣上一段，读者才跟得上。' },
      { group:'易错', name:'连接词堆砌', desc:'每句都加 however/therefore，反而显得逻辑空洞。' }
    ],
    description:'衔接是句与句之间的"缝"。没有衔接，句子只是一堆正确的废话；衔接过度，又像模板堆砌。' },

  { id:'coherence', name:'连贯与逻辑', layer:'篇章·修辞·文体', domain:'写作', status:'待补充', tracks:['读写','思维','学术'], before:['cohesion'],
    keywords:['coherence','连贯','逻辑','主题句','段落展开','逻辑顺序','unity'],
    children:[
      { group:'原则', name:'统一性 unity', desc:'一段只讲一个中心，所有句子都服务于它。' },
      { group:'原则', name:'逻辑顺序', desc:'时间、空间、因果、总分、递进，选择一种主线。' },
      { group:'结构', name:'主题句 + 支撑 + 收束', desc:'先给观点，再给证据，最后回扣。' },
      { group:'结构', name:'段落之间递进', desc:'每一段解决上一段留下的问题，而不是重复。' },
      { group:'检查', name:'反向提纲', desc:'写完给每段写一句话摘要，检查是否形成逻辑链。' }
    ],
    description:'连贯是文章的"骨架"，衔接只是"关节"。逻辑不通，再多连接词也救不回来。' },

  { id:'paragraph-structure', name:'段落结构', layer:'篇章·修辞·文体', domain:'写作', status:'待补充', tracks:['读写','学术'], before:['coherence'],
    keywords:['paragraph','段落','主题句','支撑句','结论句','段落展开','PEEL'],
    children:[
      { group:'结构', name:'主题句', desc:'段落第一句给出中心观点，读者立刻知道这段讲什么。' },
      { group:'结构', name:'支撑句', desc:'用解释、例子、数据、引用支撑主题句。' },
      { group:'结构', name:'结论句', desc:'收束段落，回扣主题或过渡到下一段。' },
      { group:'模式', name:'PEEL 结构', desc:'Point、Evidence、Explanation、Link，一种通用的论证段结构。' },
      { group:'模式', name:'段落的展开方式', desc:'举例、对比、因果、分类、过程、定义。' },
      { group:'易错', name:'一段多个中心', desc:'一段塞进三个观点，读者一个都记不住。' }
    ],
    description:'段落是文章的基本单位。一个段落一个中心，主题句先行，是考试写作最稳的结构。' },

  { id:'essay-structure', name:'文章结构', layer:'篇章·修辞·文体', domain:'写作', status:'待补充', tracks:['读写','考试','学术'], before:['paragraph-structure'],
    keywords:['essay structure','文章结构','开头','主体','结尾','thesis','议论文结构'],
    children:[
      { group:'整体', name:'引言 introduction', desc:'背景、问题、论点 thesis statement。' },
      { group:'整体', name:'主体 body', desc:'每段一个分论点，用证据展开。' },
      { group:'整体', name:'结论 conclusion', desc:'重述论点、总结要点、给出意义或建议。' },
      { group:'论点', name:'Thesis statement', desc:'一句话说清全文主张，是整篇文章的锚。' },
      { group:'模式', name:'总分总结构', desc:'考试写作最常用：开头点题、中间分述、结尾总结。' },
      { group:'模式', name:'对比与驳论结构', desc:'先立后破，或先破后立，取决于题目要求。' }
    ],
    description:'文章结构决定读者能不能跟上你的论证。论点不清，后面的例子再多也只是材料堆。' },

  { id:'punctuation', name:'标点符号', layer:'篇章·修辞·文体', domain:'写作', status:'待补充', tracks:['读写','学术'], before:['sentence-elements'],
    keywords:['punctuation','标点','逗号','句号','分号','冒号','破折号','引号','撇号','连字符'],
    children:[
      { group:'基础', name:'句号、问号、感叹号', desc:'句末标点，决定句子的语气与结束。' },
      { group:'基础', name:'逗号', desc:'列举、插入语、状语从句、非限制性修饰。' },
      { group:'进阶', name:'分号与冒号', desc:'分号连接两个完整句，冒号引出解释或列表。' },
      { group:'进阶', name:'破折号与括号', desc:'补充说明与插入信息，语气强弱不同。' },
      { group:'细节', name:'撇号 apostrophe', desc:'所有格与缩写：student\'s、students\'、it\'s。' },
      { group:'细节', name:'引号与斜体', desc:'直接引语、文章标题、书名、外来词的排版规范。' },
      { group:'细节', name:'连字符与破折号', desc:'well-known 用连字符，— 是破折号，别混用。' }
    ],
    description:'标点是书面语的呼吸和结构。中文标点习惯直接搬到英语，是写作失分的高频原因。' },

  { id:'rhetorical-devices', name:'修辞手法', layer:'篇章·修辞·文体', domain:'写作', status:'待补充', tracks:['文学','读写'], before:['figurative-language'],
    keywords:['rhetorical devices','修辞','排比','反问','反复','对比','irony','hyperbole','parallelism'],
    children:[
      { group:'比喻类', name:'明喻与隐喻', desc:'simile 用 like/as，metaphor 直接替换。' },
      { group:'强调类', name:'排比 parallelism', desc:'结构相同的成分并列，增强节奏与气势。' },
      { group:'强调类', name:'反复 repetition', desc:'重复关键词或句式，强化观点。' },
      { group:'强调类', name:'反问 rhetorical question', desc:'不需要回答，用问题推动读者思考。' },
      { group:'语气类', name:'反讽 irony', desc:'字面意义与真实态度相反。' },
      { group:'语气类', name:'夸张 hyperbole', desc:'故意夸大，制造效果。' },
      { group:'应用', name:'议论文中的修辞', desc:'修辞服务于论证，不能替代证据。' }
    ],
    description:'修辞不是装饰，而是让观点更有力的表达技术。考试写作里适度使用排比与反问，能提升语言分。' },

  { id:'style', name:'文体与语气', layer:'篇章·修辞·文体', domain:'写作', status:'待补充', tracks:['读写','学术','文学'], before:['register','cohesion'],
    keywords:['style','文体','语气','简洁','正式','主动被动','hedging','tone'],
    children:[
      { group:'维度', name:'正式与口语', desc:'学术、商务、日常三种语体的词汇与句式差异。' },
      { group:'维度', name:'简洁 concision', desc:'删冗余、去空话、用具体动词。' },
      { group:'维度', name:'主动与被动', desc:'主动更直接，被动更客观，按写作目的选择。' },
      { group:'维度', name:'模糊限制 hedging', desc:'may、suggest、tend to，学术写作中降低断言强度。' },
      { group:'维度', name:'语气 tone', desc:'客观、批判、热情、克制，由选词和句式共同决定。' },
      { group:'应用', name:'同一内容不同语体', desc:'把同一件事分别写成邮件、论文和朋友圈，体会语体差异。' }
    ],
    description:'文体是"对谁说话、在什么场合说"的选择。语法正确但语体不对，仍然是不合格的写作。' },

  { id:'discourse-markers', name:'话语标记', layer:'篇章·修辞·文体', domain:'写作', status:'待补充', tracks:['读写','听说'], before:['conjunctions','cohesion'],
    keywords:['discourse markers','话语标记','连接词','however','therefore','in addition','on the other hand'],
    children:[
      { group:'逻辑', name:'因果与结果', desc:'because、therefore、as a result、consequently。' },
      { group:'逻辑', name:'转折与让步', desc:'however、nevertheless、although、on the other hand。' },
      { group:'逻辑', name:'递进与补充', desc:'moreover、furthermore、in addition、what is more。' },
      { group:'逻辑', name:'举例与解释', desc:'for example、for instance、namely、that is。' },
      { group:'口语', name:'口语话语标记', desc:'well、you know、I mean、actually、by the way。' },
      { group:'易错', name:'标点与位置', desc:'however 放句首后加逗号；不能像 but 一样直接连两个句子。' }
    ],
    description:'话语标记是逻辑的路标。但路标不能代替道路：先有逻辑，再选标记。' },

  { id:'narrative-writing', name:'记叙文写作', layer:'篇章·修辞·文体', domain:'写作', status:'待补充', tracks:['读写','文学'], before:['paragraph-structure','past-simple'],
    keywords:['narrative','记叙文','故事','情节','人物','show don t tell','时态'],
    children:[
      { group:'要素', name:'时间、地点、人物、冲突', desc:'故事的四个基本坐标。' },
      { group:'要素', name:'开端、发展、高潮、结局', desc:'经典叙事弧线。' },
      { group:'技巧', name:'Show, don\'t tell', desc:'用动作和细节表现情绪，而不是直接说"他很伤心"。' },
      { group:'技巧', name:'时态选择', desc:'通常用一般过去时，背景可用过去进行时。' },
      { group:'技巧', name:'感官描写', desc:'视觉、听觉、嗅觉、触觉，让场景可感。' },
      { group:'应用', name:'考试记叙文', desc:'高考、雅思等考试的叙事题要注意字数与主题升华。' }
    ],
    description:'记叙文靠画面和冲突打动人。中国学习者常写成"流水账"，问题多在缺少细节和冲突。' },

  { id:'expository-writing', name:'说明文写作', layer:'篇章·修辞·文体', domain:'写作', status:'待补充', tracks:['读写','学术'], before:['paragraph-structure'],
    keywords:['expository','说明文','定义','分类','过程','因果','解释'],
    children:[
      { group:'模式', name:'定义与解释', desc:'先给定义，再举例说明，最后说明重要性。' },
      { group:'模式', name:'分类与比较', desc:'按标准分类，或逐点比较异同。' },
      { group:'模式', name:'过程说明', desc:'按时间顺序说明步骤，常用被动与祈使句。' },
      { group:'模式', name:'因果说明', desc:'原因→机制→结果，逻辑链要完整。' },
      { group:'技巧', name:'客观语气', desc:'少用 I think，多用数据和事实。' }
    ],
    description:'说明文的目标是让读者"明白"。结构清晰、例子具体，比辞藻华丽更重要。' },

  { id:'argumentative-writing', name:'议论文写作', layer:'篇章·修辞·文体', domain:'写作', status:'待补充', tracks:['读写','考试','思维'], before:['essay-structure'],
    keywords:['argumentative','议论文','论点','论据','驳论','counterargument','雅思写作','考研写作'],
    children:[
      { group:'结构', name:'论点 claim', desc:'明确、可争论、有范围的主张。' },
      { group:'结构', name:'论据 evidence', desc:'事实、数据、案例、专家观点。' },
      { group:'结构', name:'论证 reasoning', desc:'说明证据为什么能支持论点。' },
      { group:'结构', name:'反方与反驳', desc:'先承认对方合理之处，再指出局限。' },
      { group:'技巧', name:'让步与转折', desc:'Admittedly… However… 让论证显得成熟。' },
      { group:'技巧', name:'避免绝对化', desc:'用 tend to、in most cases，避免 all/everyone 的漏洞。' },
      { group:'应用', name:'考试议论文', desc:'雅思 Task 2、考研写作、高考议论文的结构差异。' }
    ],
    description:'议论文不是"表达观点"，而是"说服别人"。论点、证据、推理、反驳，缺一不可。' },

  { id:'practical-writing', name:'应用文写作', layer:'篇章·修辞·文体', domain:'写作', status:'待补充', tracks:['读写','商务'], before:['paragraph-structure','register'],
    keywords:['practical writing','应用文','邮件','信件','通知','简历','memo','email'],
    children:[
      { group:'类型', name:'电子邮件', desc:'主题行、称呼、正文、结尾、签名；正式与半正式的区别。' },
      { group:'类型', name:'书信', desc:'正式信函、投诉信、申请信、感谢信的结构。' },
      { group:'类型', name:'通知与备忘录', desc:'标题、时间地点、事项、联系人。' },
      { group:'类型', name:'简历与求职信', desc:'动词开头、量化成果、匹配岗位关键词。' },
      { group:'规范', name:'礼貌与清晰', desc:'请求用 Could you…，拒绝要给出理由与替代方案。' },
      { group:'规范', name:'格式与长度', desc:'应用文以清楚为第一目标，避免长难句堆砌。' }
    ],
    description:'应用文考的是"得体"与"清楚"。格式、称呼、语气、行动请求，四件事写对就成功大半。' },

  { id:'summary-writing', name:'摘要与概括', layer:'篇章·修辞·文体', domain:'写作', status:'待补充', tracks:['读写','学术','考试'], before:['reading-inference','paraphrasing'],
    keywords:['summary','摘要','概括','main idea','提炼','缩写','abstract'],
    children:[
      { group:'方法', name:'找主旨句', desc:'先确定原文的中心论点，再找支撑它的关键信息。' },
      { group:'方法', name:'删例子留结论', desc:'摘要保留观点与结论，删掉细节、例子和重复。' },
      { group:'方法', name:'用自己的话', desc:'概括必须改写，不能整句抄原文。' },
      { group:'结构', name:'一句话摘要', desc:'用"谁 + 做了什么 + 结论/影响"压缩全文。' },
      { group:'应用', name:'学术摘要', desc:'背景、目的、方法、结果、结论五要素。' }
    ],
    description:'概括能力是阅读与写作的交汇点。能不能用三句话说清一篇文章，直接反映理解深度。' },

  { id:'paraphrasing', name:'改写与释义', layer:'篇章·修辞·文体', domain:'写作', status:'待补充', tracks:['读写','学术'], before:['synonyms','clause-reduction'],
    keywords:['paraphrase','改写','释义','同义替换','句型转换','学术写作','plagiarism'],
    children:[
      { group:'方法', name:'同义替换', desc:'换词但不改变原意，注意搭配与语域。' },
      { group:'方法', name:'句型转换', desc:'主动改被动、从句改短语、词性转换。' },
      { group:'方法', name:'语序重组', desc:'改变信息顺序，但保留逻辑关系。' },
      { group:'方法', name:'压缩与展开', desc:'长句压缩成短语，或短句展开成从句。' },
      { group:'注意', name:'改写不是洗稿', desc:'只换几个词、保留原句结构，仍可能构成抄袭。' },
      { group:'应用', name:'学术引用', desc:'改写后仍需标注来源，避免学术不端。' }
    ],
    description:'改写是学术写作的基本功：既要保留原意，又要用自己的语言。只换同义词不算改写。' },

  { id:'citation-academic', name:'引用与学术规范', layer:'篇章·修辞·文体', domain:'写作', status:'待补充', tracks:['学术','读写'], before:['paraphrasing','summary-writing'],
    keywords:['citation','引用','学术规范','plagiarism','APA','MLA','参考文献','引用格式'],
    children:[
      { group:'规范', name:'什么是抄袭', desc:'未标注来源地使用他人观点、数据或文字。' },
      { group:'规范', name:'直接引用与间接引用', desc:'直接引用加引号与页码，间接引用改写后标注来源。' },
      { group:'格式', name:'APA / MLA / Chicago', desc:'不同学科的引用格式差异，重点是一致。' },
      { group:'格式', name:'文内引用', desc:'作者-年份或作者-页码两种体系。' },
      { group:'格式', name:'参考文献列表', desc:'按字母排序、格式统一、信息完整。' },
      { group:'工具', name:'文献管理工具', desc:'Zotero、EndNote、Mendeley 自动生成引用。' }
    ],
    description:'引用规范是学术诚信的底线。格式可以查，意识必须提前建立：观点不是自己的，就要注明出处。' },

  { id:'editing-proofreading', name:'修改与校对', layer:'篇章·修辞·文体', domain:'写作', status:'待补充', tracks:['读写','方法'], before:['writing-process','writing-errors'],
    keywords:['editing','proofreading','修改','校对','润色','检查清单','revise'],
    children:[
      { group:'层次', name:'结构修改', desc:'先看论点、段落顺序、逻辑链，不动字句。' },
      { group:'层次', name:'句子修改', desc:'拆长句、合并碎句、调整语序、去除冗余。' },
      { group:'层次', name:'用词与语法', desc:'搭配、时态、冠词、主谓一致。' },
      { group:'层次', name:'拼写与标点', desc:'最后一遍只查拼写、标点和格式。' },
      { group:'方法', name:'冷却后再读', desc:'放一两个小时再读，更容易发现问题。' },
      { group:'方法', name:'朗读与反向阅读', desc:'朗读查节奏，倒着读查拼写。' },
      { group:'工具', name:'语法检查工具', desc:'Grammarly 等只能辅助，不能替代人工判断。' }
    ],
    description:'好文章是改出来的。修改要分层次：先结构、再句子、最后字词，别一上来就抠拼写。' },

  { id:'text-types', name:'文本类型', layer:'篇章·修辞·文体', domain:'阅读', status:'待补充', tracks:['读写','文化'], before:['style'],
    keywords:['text types','文本类型','新闻','文学','技术文档','法律','广告','genre'],
    children:[
      { group:'类型', name:'新闻文本', desc:'倒金字塔结构、客观引语、标题省略。' },
      { group:'类型', name:'学术文本', desc:'客观、名词化、引用密集、逻辑显性。' },
      { group:'类型', name:'文学文本', desc:'修辞密集、多义、叙述视角与象征。' },
      { group:'类型', name:'技术文档', desc:'步骤清晰、术语一致、以任务为中心。' },
      { group:'类型', name:'法律与合同', desc:'长句、条件从句、定义严密。' },
      { group:'类型', name:'广告与营销', desc:'短句、祈使句、情感诉求与双关。' },
      { group:'应用', name:'按文本类型调整读法', desc:'新闻找 5W1H，论文找论点与证据，文学读语气与意象。' }
    ],
    description:'不同文本有不同的组织方式。先识别文本类型，阅读策略和写作规范就自动清楚了。' },

  /* ==================== 听力与口语 ==================== */

  { id:'listening-basics', name:'听力基础', layer:'听力与口语', domain:'听力', status:'待补充', tracks:['听说','语音'], before:['linking','weak-forms'],
    keywords:['listening','听力','听音','解码','声音','语流','听力基础'],
    children:[
      { group:'过程', name:'声音→词→意义', desc:'听力是实时解码：辨音、切词、匹配词义、理解句意。' },
      { group:'过程', name:'切词 chunking', desc:'从连续语流中切出词与短语，是听力的第一道难关。' },
      { group:'过程', name:'工作记忆', desc:'边听边记，前一句没处理完，后一句就来了。' },
      { group:'基础', name:'音素辨识', desc:'长短音、清浊辅音、连读弱读，决定能不能听出词。' },
      { group:'基础', name:'词汇识别速度', desc:'认识的词要能在一秒内反应出意思，否则跟不上语速。' },
      { group:'基础', name:'语法预测', desc:'听到前半句就能预测后半句的结构与内容。' }
    ],
    description:'听力不是"多听就会"，而是一条解码链：辨音→切词→识别→理解。哪一环断了，都要专项补。' },

  { id:'listening-strategies', name:'听力策略', layer:'听力与口语', domain:'听力', status:'待补充', tracks:['听说','考试','方法'], before:['listening-basics'],
    keywords:['listening strategies','听力策略','预测','关键词','笔记','推断','精听','泛听'],
    children:[
      { group:'策略', name:'听前预测', desc:'看题目、标题、选项，预测场景、人物与可能信息。' },
      { group:'策略', name:'抓关键词', desc:'名词、动词、数字、转折词，是信息的骨架。' },
      { group:'策略', name:'信号词', desc:'however、so、actually、the main point is 提示重点与转折。' },
      { group:'策略', name:'笔记法', desc:'用缩写、符号、箭头记录关键信息，不写完整句。' },
      { group:'策略', name:'容忍模糊', desc:'没听清的词先放过，靠上下文补，不要卡在一个词上。' },
      { group:'训练', name:'精听与泛听', desc:'精听逐句听写，泛听抓大意，两者配合。' },
      { group:'训练', name:'复述与总结', desc:'听完用英文复述，检验是否真的理解。' }
    ],
    description:'听力考试拼的不是"全听懂"，而是"抓得住关键信息"。预测、抓词、记笔记，都是可训练的技能。' },

  { id:'listening-materials', name:'听力材料', layer:'听力与口语', domain:'听力', status:'待补充', tracks:['听说','方法'], before:['listening-strategies'],
    keywords:['listening materials','听力材料','播客','新闻','美剧','讲座','conversation','podcast'],
    children:[
      { group:'类型', name:'日常对话', desc:'语速自然、口语化、省略多，适合练真实交流。' },
      { group:'类型', name:'新闻广播', desc:'正式语体、信息密集，BBC/CNN/NPR 各有风格。' },
      { group:'类型', name:'学术讲座', desc:'结构清晰、有信号词，适合练笔记与逻辑。' },
      { group:'类型', name:'播客与访谈', desc:'话题深入、语速快，适合中高级学习者。' },
      { group:'类型', name:'影视剧', desc:'生活化但含俚语与文化背景，注意选难度合适的。' },
      { group:'选择', name:'i+1 原则', desc:'材料略高于当前水平，太难会挫败，太简单没进步。' }
    ],
    description:'材料选对，听力事半功倍。按场景和难度分级，别一上来就用无字幕美剧。' },

  { id:'listening-obstacles', name:'听力常见障碍', layer:'听力与口语', domain:'听力', status:'待补充', tracks:['听说'], before:['listening-basics'],
    keywords:['listening problems','听力障碍','语速','口音','生词','走神','背景音','听不清'],
    children:[
      { group:'语言层', name:'语速太快', desc:'不是耳朵慢，是词汇识别与切词还不自动化。' },
      { group:'语言层', name:'口音不熟悉', desc:'英音、美音、澳音、印度音，需要分别适应。' },
      { group:'语言层', name:'生词与熟词僻义', desc:'关键词不认识，整句就跟丢了。' },
      { group:'语言层', name:'语法结构复杂', desc:'长从句与倒装增加实时理解负担。' },
      { group:'非语言层', name:'注意力与焦虑', desc:'怕听不懂反而更听不懂，需要放松与策略。' },
      { group:'非语言层', name:'背景噪音', desc:'真实环境的噪声，需要靠预测与关键词补。' }
    ],
    description:'听力障碍要分类：是音的问题、词的问题、语法的问题，还是注意力的问题。对症下药才有效。' },

  { id:'shadowing', name:'影子跟读', layer:'听力与口语', domain:'口语', status:'待补充', tracks:['听说','方法','语音'], before:['pronunciation-training','listening-basics'],
    keywords:['shadowing','影子跟读','跟读','模仿','语调','节奏','口语训练'],
    children:[
      { group:'方法', name:'什么是影子跟读', desc:'与音频几乎同步地跟读，训练语音、节奏与语流。' },
      { group:'方法', name:'材料选择', desc:'选 1-2 分钟、难度适中、发音清晰的音频。' },
      { group:'方法', name:'三步法', desc:'先听理解，再逐句模仿，最后同步跟读。' },
      { group:'方法', name:'录音对比', desc:'录下自己的跟读，与原音对比节奏、重音、语调。' },
      { group:'注意', name:'不要只模仿音素', desc:'影子跟读的重点是重音、语调与意群，不只是发音。' },
      { group:'频率', name:'每天 10-15 分钟', desc:'短时高频比一次练一小时更有效。' }
    ],
    description:'影子跟读同时练听力与口语，是性价比最高的训练之一。关键在节奏和语调，不是机械复读。' },

  { id:'speaking-fluency', name:'口语流利度', layer:'听力与口语', domain:'口语', status:'待补充', tracks:['听说'], before:['sentence-stress','spoken-grammar'],
    keywords:['fluency','流利度','卡顿','填充词','语块','口语','表达'],
    children:[
      { group:'概念', name:'流利不等于快', desc:'流利是少停顿、少自我纠正、意思连贯。' },
      { group:'概念', name:'语块 chunking', desc:'把常用短语整块调用，减少现场组装。' },
      { group:'技巧', name:'填充词与拖延', desc:'well、you know、let me think，为思考争取时间。' },
      { group:'技巧', name:'绕开不会的词', desc:'用简单词解释复杂概念，比卡住强。' },
      { group:'技巧', name:'自我纠正的度', desc:'小错不必回头改，影响理解的错才纠正。' },
      { group:'训练', name:'每日独白', desc:'每天就一个话题说 1-2 分钟，录音回听。' }
    ],
    description:'流利度来自"可调用的语块"，不是背更多单词。说得慢但连贯，比说得快但破碎更好。' },

  { id:'pronunciation-output', name:'口语发音输出', layer:'听力与口语', domain:'口语', status:'待补充', tracks:['听说','语音'], before:['pronunciation-training','prosody'],
    keywords:['pronunciation output','口语发音','重音','语调','连读','口音','清晰度'],
    children:[
      { group:'目标', name:'清晰优先于口音', desc:'目标是让人听懂，不是装成母语者。' },
      { group:'要点', name:'单词重音准确', desc:'重音错位比个别音发错更影响理解。' },
      { group:'要点', name:'句子重音与意群', desc:'把信息词读重，把句子切成意群。' },
      { group:'要点', name:'连读与弱读', desc:'自然语流中的连读弱读，让口语更流畅。' },
      { group:'训练', name:'朗读与复述', desc:'先朗读纠正音，再复述训练即兴表达。' },
      { group:'反馈', name:'录音与对比', desc:'定期录音，找出发音与节奏的稳定问题。' }
    ],
    description:'口语发音的目标是"清楚、自然、有节奏"。把每个音都发得很重，反而更像念课文。' },

  { id:'daily-conversation', name:'日常会话', layer:'听力与口语', domain:'口语', status:'待补充', tracks:['听说'], before:['functional-language','spoken-grammar'],
    keywords:['daily conversation','日常会话','问候','闲聊','small talk','点餐','问路','购物'],
    children:[
      { group:'场景', name:'问候与介绍', desc:'Hi、How are you?、Nice to meet you、This is…。' },
      { group:'场景', name:'闲聊 small talk', desc:'天气、交通、周末、工作，用安全话题建立关系。' },
      { group:'场景', name:'请求与帮助', desc:'Could you…? Would you mind…? 的礼貌层级。' },
      { group:'场景', name:'点餐、购物、问路', desc:'高频场景的固定表达与听力关键词。' },
      { group:'技巧', name:'接话与追问', desc:'Really? What happened? 让对话继续。' },
      { group:'技巧', name:'结束对话', desc:'Well, I should get going. It was nice talking to you。' }
    ],
    description:'日常会话靠的是"场景语块"，不是现场造句。把高频场景的 10 句话练熟，就能应付大多数交流。' },

  { id:'functional-language', name:'功能语言', layer:'听力与口语', domain:'口语', status:'待补充', tracks:['听说','商务'], before:['modal-verbs'],
    keywords:['functional language','功能语言','同意','建议','道歉','抱怨','请求','表达观点'],
    children:[
      { group:'功能', name:'表达观点', desc:'I think、In my opinion、From my perspective。' },
      { group:'功能', name:'同意与反对', desc:'I agree、That\'s true, but…、I\'m afraid I disagree。' },
      { group:'功能', name:'建议与邀请', desc:'Why don\'t we…? How about…? Would you like to…?' },
      { group:'功能', name:'道歉与抱怨', desc:'I\'m sorry for…、I\'m afraid I have a complaint。' },
      { group:'功能', name:'请求与许可', desc:'Could I…? Do you mind if…? 的礼貌梯度。' },
      { group:'功能', name:'澄清与确认', desc:'Sorry, did you mean…? Just to confirm…。' }
    ],
    description:'功能语言是"按目的说话"的工具箱。同一功能有不同礼貌等级，选错会显得粗鲁或生分。' },

  { id:'presentation-skills', name:'演讲与展示', layer:'听力与口语', domain:'口语', status:'待补充', tracks:['听说','商务','学术'], before:['essay-structure','speaking-fluency'],
    keywords:['presentation','演讲','展示','PPT','开场','结构','肢体语言','Q&A'],
    children:[
      { group:'结构', name:'开场 hook', desc:'问题、数据、故事，30 秒抓住听众。' },
      { group:'结构', name:'主体三段式', desc:'Tell them what you\'ll say, say it, tell them what you said。' },
      { group:'结构', name:'结尾与行动号召', desc:'总结要点，给出明确下一步。' },
      { group:'表达', name:'信号词与过渡', desc:'First、Next、Finally、Let me turn to…。' },
      { group:'表达', name:'语速、停顿与音量', desc:'重点前停顿，关键句放慢。' },
      { group:'表达', name:'肢体语言与眼神', desc:'站姿、手势、与听众建立连接。' },
      { group:'应对', name:'Q&A 处理', desc:'听清问题、确认理解、不会就承认并会后跟进。' }
    ],
    description:'演讲的胜负在结构，不在口音。开场抓人、结构清楚、结尾有力，比完美的发音更重要。' },

  { id:'discussion-debate', name:'讨论与辩论', layer:'听力与口语', domain:'口语', status:'待补充', tracks:['听说','思维'], before:['functional-language','argumentative-writing'],
    keywords:['discussion','debate','讨论','辩论','轮流发言','反驳','观点','turn taking'],
    children:[
      { group:'技巧', name:'轮流发言', desc:'Can I just say…? Sorry to interrupt, but…。' },
      { group:'技巧', name:'承接与回应', desc:'That\'s a good point. Building on that…。' },
      { group:'技巧', name:'礼貌反驳', desc:'I see your point, but…、I\'m not sure I agree。' },
      { group:'技巧', name:'要求澄清', desc:'What do you mean by…? Could you elaborate?。' },
      { group:'结构', name:'论点—证据—回应', desc:'每次发言都完整走一遍，避免只喊口号。' },
      { group:'文化', name:'直接与委婉', desc:'英语辩论可以直接反驳观点，但避免人身攻击。' }
    ],
    description:'讨论与辩论考的是"接得住、说得清、驳得有理"。礼貌地不同意，是英语课堂与职场的核心技能。' },

  { id:'interview-english', name:'面试英语', layer:'听力与口语', domain:'口语', status:'待补充', tracks:['听说','商务'], before:['presentation-skills','business-vocabulary'],
    keywords:['interview','面试','自我介绍','STAR','behavioral interview','求职','英文面试'],
    children:[
      { group:'准备', name:'自我介绍', desc:'30-60 秒：现在做什么、核心能力、为什么匹配。' },
      { group:'准备', name:'STAR 法则', desc:'Situation、Task、Action、Result，用故事回答问题。' },
      { group:'准备', name:'常见问题', desc:'strengths/weaknesses、why this company、where do you see yourself。' },
      { group:'技巧', name:'量化成果', desc:'用数字说明影响：reduced costs by 20%。' },
      { group:'技巧', name:'不会的问题', desc:'先确认问题，再给思路，诚实说明边界。' },
      { group:'技巧', name:'反问面试官', desc:'准备 2-3 个关于团队、成长、业务的问题。' }
    ],
    description:'英文面试不是口语考试，而是"用故事证明能力"。STAR 结构 + 量化成果，是最稳的准备方式。' },

  { id:'spoken-grammar', name:'口语语法特点', layer:'听力与口语', domain:'口语', status:'待补充', tracks:['听说','语法'], before:['ellipsis-substitution','discourse-markers'],
    keywords:['spoken grammar','口语语法','省略','口语化','填充词','松散结构','informal'],
    children:[
      { group:'特点', name:'省略主语与助动词', desc:'Got it. Want some? 口语里很常见。' },
      { group:'特点', name:'句子短而碎', desc:'口语靠语调与连接词衔接，不追求书面长句。' },
      { group:'特点', name:'填充与模糊语', desc:'kind of、sort of、stuff like that、or something。' },
      { group:'特点', name:'话语标记频繁', desc:'well、so、you know、I mean。' },
      { group:'注意', name:'口语不等于随意犯错', desc:'时态、主谓一致仍要基本正确，只是结构更松。' },
      { group:'应用', name:'听说与写作分开', desc:'不要把口语的省略直接搬进学术写作。' }
    ],
    description:'口语语法是"松而不散"：省略多、句子短，但逻辑与基本语法仍在。用写作语法说话，会显得僵硬。' },

  /* ==================== 阅读与写作 ==================== */

  { id:'reading-skills', name:'阅读技能总览', layer:'阅读与写作', domain:'阅读', status:'待补充', tracks:['读写','考试','方法'], before:['sentence-elements','word-analysis'],
    keywords:['reading skills','阅读技能','略读','查读','精读','泛读','阅读理解'],
    children:[
      { group:'层次', name:'字词层', desc:'词汇识别与语境猜词。' },
      { group:'层次', name:'句子层', desc:'长难句拆解与指代关系。' },
      { group:'层次', name:'段落层', desc:'主题句、支撑细节、段落功能。' },
      { group:'层次', name:'篇章层', desc:'文章结构、作者立场、论证方式。' },
      { group:'策略', name:'按目的选择读法', desc:'找信息用查读，抓大意用略读，学语言用精读。' },
      { group:'策略', name:'主动阅读', desc:'提问、预测、批注、总结，而不是被动扫字。' }
    ],
    description:'阅读不是一种技能，而是一组技能。先明确读的目的，再选择对应的读法。' },

  { id:'skimming-scanning', name:'略读与查读', layer:'阅读与写作', domain:'阅读', status:'待补充', tracks:['读写','考试'], before:['reading-skills'],
    keywords:['skimming','scanning','略读','查读','快速阅读','找信息','抓大意'],
    children:[
      { group:'略读', name:'抓大意', desc:'读标题、首段、每段首句、结尾，快速建立文章地图。' },
      { group:'略读', name:'跳过细节', desc:'例子、数据、重复说明可以先略过。' },
      { group:'查读', name:'定位关键词', desc:'带着问题扫读，眼睛快速搜索目标词或同义表达。' },
      { group:'查读', name:'数字与专有名词', desc:'人名、地名、年份、百分比是最容易定位的锚点。' },
      { group:'应用', name:'考试阅读', desc:'先看题目再定位，比通读全文再做题更高效。' }
    ],
    description:'略读是"看森林"，查读是"找树"。考试阅读靠两者配合：先略读建地图，再查读定位答案。' },

  { id:'reading-inference', name:'推断与主旨', layer:'阅读与写作', domain:'阅读', status:'待补充', tracks:['读写','考试','思维'], before:['reading-skills'],
    keywords:['inference','推断','主旨','main idea','作者态度','tone','imply','阅读理解'],
    children:[
      { group:'主旨', name:'主旨与细节', desc:'主旨是文章想证明什么，细节是支撑它的材料。' },
      { group:'主旨', name:'标题与首尾段', desc:'标题、首段、末段往往直接给出主旨。' },
      { group:'推断', name:'基于证据推断', desc:'推断必须有原文依据，不能凭空想象。' },
      { group:'推断', name:'作者态度与语气', desc:'通过形容词、情态动词、转折词判断立场。' },
      { group:'推断', name:'词义猜测', desc:'根据上下文、构词、逻辑关系猜生词。' },
      { group:'易错', name:'过度推断', desc:'选项里最常见的是"看似合理但原文没依据"的干扰项。' }
    ],
    description:'阅读理解考的是"读懂言外之意"，但推断必须落在原文证据上。过度推断是最大的失分点。' },

  { id:'vocabulary-in-context', name:'语境猜词', layer:'阅读与写作', domain:'阅读', status:'待补充', tracks:['读写','词汇','方法'], before:['word-analysis','reading-skills'],
    keywords:['context clues','语境猜词','猜词','上下文','词义猜测','definition','contrast'],
    children:[
      { group:'线索', name:'定义与解释', desc:'破折号、冒号、that is、or 后面的解释。' },
      { group:'线索', name:'举例与列举', desc:'such as、for example 后面的例子帮助推断。' },
      { group:'线索', name:'对比与转折', desc:'but、however、unlike 提示反义关系。' },
      { group:'线索', name:'因果与结果', desc:'because、therefore 提示逻辑关系。' },
      { group:'线索', name:'构词分析', desc:'前缀、词根、后缀提供词义方向。' },
      { group:'边界', name:'猜词不能代替查词', desc:'猜出大致方向就够了，精读时仍要查证。' }
    ],
    description:'猜词是阅读的应急技能，不是词汇学习的替代品。线索类型清楚，生词就不会再卡住整段阅读。' },

  { id:'reading-speed', name:'阅读速度', layer:'阅读与写作', domain:'阅读', status:'待补充', tracks:['读写','考试','方法'], before:['skimming-scanning'],
    keywords:['reading speed','阅读速度','回视','默读','视幅','speed reading','eye movement'],
    children:[
      { group:'障碍', name:'默读 subvocalization', desc:'心里逐字念，速度被发音限制。' },
      { group:'障碍', name:'回视 regression', desc:'反复回头看，破坏阅读流。' },
      { group:'障碍', name:'逐词阅读', desc:'视幅太小，应该按词组块阅读。' },
      { group:'方法', name:'按意群阅读', desc:'一次看 3-5 个词，以短语为单位理解。' },
      { group:'方法', name:'用手指或笔引导', desc:'用引导物控制视线速度，减少回视。' },
      { group:'方法', name:'限时阅读', desc:'给自己设时间压力，逐步提高速度。' },
      { group:'平衡', name:'速度与理解', desc:'速度必须建立在理解之上，快而不知所云没有意义。' }
    ],
    description:'阅读速度的瓶颈通常不是眼睛，而是默读和回视。先改习惯，再谈提速。' },

  { id:'intensive-reading', name:'精读', layer:'阅读与写作', domain:'阅读', status:'待补充', tracks:['读写','方法','考试'], before:['long-sentence-analysis','vocabulary-in-context'],
    keywords:['intensive reading','精读','逐句分析','批注','精读方法','close reading'],
    children:[
      { group:'方法', name:'逐句拆解', desc:'主干、从句、指代、逻辑关系逐句标出。' },
      { group:'方法', name:'生词与搭配', desc:'查词不只查意思，还要记搭配与例句。' },
      { group:'方法', name:'段落功能', desc:'判断每段是提出观点、举例、对比还是总结。' },
      { group:'方法', name:'批注与复述', desc:'在文中做标记，读完后用自己的话复述。' },
      { group:'材料', name:'选一篇吃透', desc:'精读材料不必多，一篇外刊文章可以拆三天。' },
      { group:'应用', name:'精读与泛读配合', desc:'精读学语言，泛读扩知识面与语感。' }
    ],
    description:'精读是"把一篇文章榨干"：词汇、搭配、句式、逻辑、文化背景全部拆开。它提升的是语言能力，不只是阅读量。' },

  { id:'extensive-reading', name:'泛读', layer:'阅读与写作', domain:'阅读', status:'待补充', tracks:['读写','方法'], before:['reading-skills'],
    keywords:['extensive reading','泛读','大量阅读','graded readers','语感','阅读量'],
    children:[
      { group:'原则', name:'量大、难度适中', desc:'选能读懂 95% 以上的材料，保持流畅与兴趣。' },
      { group:'原则', name:'不查每个词', desc:'靠上下文理解，只有反复出现的关键词才查。' },
      { group:'材料', name:'分级读物与小说', desc:'Graded readers、青少年小说、非虚构读物。' },
      { group:'材料', name:'新闻与博客', desc:'短篇、时效性强，适合每天 15 分钟。' },
      { group:'习惯', name:'固定时间与数量', desc:'每天 20 分钟或每周一本，形成稳定输入。' },
      { group:'效果', name:'语感与词汇复现', desc:'高频词在大量阅读中自然复现，比背词表更牢。' }
    ],
    description:'泛读是语感的来源。它的目标不是"学懂每个词"，而是让大脑习惯英语的节奏与表达方式。' },

  { id:'reading-genres', name:'阅读材料类型', layer:'阅读与写作', domain:'阅读', status:'待补充', tracks:['读写','文化'], before:['text-types','reading-skills'],
    keywords:['reading genres','阅读类型','新闻','论文','小说','技术文档','非虚构'],
    children:[
      { group:'类型', name:'新闻报道', desc:'倒金字塔、引语、背景，适合练信息提取。' },
      { group:'类型', name:'学术论文', desc:'摘要、方法、结果、讨论，适合练逻辑与学术词汇。' },
      { group:'类型', name:'小说与散文', desc:'叙述视角、象征、修辞，适合练语感与文学理解。' },
      { group:'类型', name:'技术文档', desc:'步骤、参数、警告，适合练精确理解。' },
      { group:'类型', name:'非虚构与评论', desc:'观点、论证、证据，适合练批判性阅读。' },
      { group:'选择', name:'按目标选材料', desc:'考试选真题与外刊，学术选论文，兴趣选小说。' }
    ],
    description:'读什么，决定了练到什么能力。新闻练信息，论文练逻辑，小说练语感，别只用一种材料。' },

  { id:'writing-process', name:'写作过程', layer:'阅读与写作', domain:'写作', status:'待补充', tracks:['读写','方法'], before:['paragraph-structure'],
    keywords:['writing process','写作过程','构思','提纲','起草','修改','编辑','planning'],
    children:[
      { group:'阶段', name:'审题与构思', desc:'明确题目要求、读者、目的与立场。' },
      { group:'阶段', name:'列提纲', desc:'先定论点与分论点，再安排段落顺序。' },
      { group:'阶段', name:'起草', desc:'先写完再完美，不要边写边改。' },
      { group:'阶段', name:'修改', desc:'结构、逻辑、段落衔接优先于字句。' },
      { group:'阶段', name:'校对', desc:'最后检查语法、拼写与标点。' },
      { group:'方法', name:'限时写作流程', desc:'考试中按审题 3 分钟、写作 25 分钟、检查 2 分钟分配。' }
    ],
    description:'写作是分阶段的过程，不是一次性输出。先想清楚再写，比写完再大改省时间。' },

  { id:'sentence-writing', name:'句子写作', layer:'阅读与写作', domain:'写作', status:'待补充', tracks:['读写','语法'], before:['sentence-patterns','parallelism'],
    keywords:['sentence writing','句子写作','句子多样性','简洁','碎句','run-on','句式'],
    children:[
      { group:'问题', name:'碎句 fragment', desc:'缺少主语或谓语的不完整句。' },
      { group:'问题', name:'连写句 run-on', desc:'两个完整句没有连词或标点直接粘在一起。' },
      { group:'问题', name:'逗号粘连', desc:'只用逗号连接两个完整句。' },
      { group:'技巧', name:'句式多样性', desc:'长短句交替、主动被动交替、简单句与从句交替。' },
      { group:'技巧', name:'简洁写作', desc:'删冗余、用强动词、避免名词化过度。' },
      { group:'技巧', name:'信息重心', desc:'把重要信息放句尾，句子更有力量。' }
    ],
    description:'句子写作先求"完整、不粘连"，再求"多样、有节奏"。碎句和连写句是最基础也最致命的错误。' },

  { id:'paragraph-writing', name:'段落写作', layer:'阅读与写作', domain:'写作', status:'待补充', tracks:['读写','学术'], before:['paragraph-structure','sentence-writing'],
    keywords:['paragraph writing','段落写作','主题句','展开','衔接','PEEL','段落'],
    children:[
      { group:'结构', name:'主题句写作', desc:'主题句要具体、可论证，不能只是"这个话题很重要"。' },
      { group:'结构', name:'支撑句展开', desc:'解释、举例、数据、对比，至少两种支撑方式。' },
      { group:'结构', name:'收束与过渡', desc:'段尾回扣主题，或引出下一段。' },
      { group:'技巧', name:'一段一个中心', desc:'发现段落有两个中心，就拆成两段。' },
      { group:'技巧', name:'衔接手段', desc:'代词、同义词、连接词，让句子之间有关系。' },
      { group:'检查', name:'反向提纲', desc:'用一句话概括每段，检查全文逻辑。' }
    ],
    description:'段落写作是文章写作的缩小版：主题句、支撑、收束。练好一段，就练好了整篇的骨架。' },

  { id:'essay-writing', name:'文章写作', layer:'阅读与写作', domain:'写作', status:'待补充', tracks:['读写','考试','学术'], before:['essay-structure','paragraph-writing'],
    keywords:['essay writing','文章写作','议论文','说明文','开头结尾','雅思写作','考研写作'],
    children:[
      { group:'结构', name:'引言写作', desc:'背景→问题→论点，三句话完成开头。' },
      { group:'结构', name:'主体段落', desc:'每段一个分论点，按逻辑顺序排列。' },
      { group:'结构', name:'结论写作', desc:'重述论点、总结分论点、给出建议或展望。' },
      { group:'论证', name:'论点与证据匹配', desc:'每个分论点都要有证据，证据要能证明论点。' },
      { group:'语言', name:'句式与衔接', desc:'长短句结合，连接词自然，不堆模板。' },
      { group:'应试', name:'字数与时间', desc:'雅思 250 词、考研 160 词等，按考试要求控制。' }
    ],
    description:'文章写作考的是"结构 + 论证 + 语言"三件事。模板只能保底，论点与证据才决定上限。' },

  { id:'academic-writing', name:'学术写作', layer:'阅读与写作', domain:'写作', status:'待补充', tracks:['学术','读写'], before:['essay-writing','academic-vocabulary','passive-voice'],
    keywords:['academic writing','学术写作','论文','hedging','nominalization','objective','citation'],
    children:[
      { group:'特征', name:'客观与克制', desc:'少用 I think，多用 evidence suggests。' },
      { group:'特征', name:'模糊限制 hedging', desc:'may、tend to、it is likely that，避免绝对化。' },
      { group:'特征', name:'名词化 nominalization', desc:'把动作写成名词，提高信息密度。' },
      { group:'特征', name:'正式词汇', desc:'用拉丁词替代短语动词：investigate 而非 look into。' },
      { group:'结构', name:'论文结构', desc:'摘要、引言、方法、结果、讨论、结论。' },
      { group:'规范', name:'引用与避免抄袭', desc:'所有 borrowed ideas 都要标注来源。' },
      { group:'语言', name:'衔接与逻辑', desc:'段落之间用逻辑连接，论证链完整。' }
    ],
    description:'学术写作的核心是"可信"：客观、有证据、有引用、有边界。它和考试作文是两种不同的文体。' },

  { id:'business-writing', name:'商务写作', layer:'阅读与写作', domain:'写作', status:'待补充', tracks:['商务','读写'], before:['practical-writing','business-vocabulary','register'],
    keywords:['business writing','商务写作','邮件','报告','提案','memo','report','proposal'],
    children:[
      { group:'类型', name:'商务邮件', desc:'主题明确、称呼得体、正文三段、行动请求清楚。' },
      { group:'类型', name:'报告 report', desc:'摘要、背景、发现、建议，数据支撑。' },
      { group:'类型', name:'提案 proposal', desc:'问题、方案、收益、成本、时间表。' },
      { group:'原则', name:'清楚优先', desc:'短句、主动语态、具体动词，避免官腔。' },
      { group:'原则', name:'礼貌与专业', desc:'请求、拒绝、催促都要给理由与替代方案。' },
      { group:'格式', name:'标题与要点', desc:'用标题、编号、要点让忙碌的读者快速抓住信息。' }
    ],
    description:'商务写作的目标是"让对方快速行动"。清楚、礼貌、有下一步，比辞藻华丽重要得多。' },

  { id:'creative-writing', name:'创意写作', layer:'阅读与写作', domain:'写作', status:'待补充', tracks:['文学','读写'], before:['narrative-writing','figurative-language'],
    keywords:['creative writing','创意写作','故事','诗歌','描写','人物','show don t tell'],
    children:[
      { group:'技巧', name:'感官描写', desc:'用五感让场景可感，而不是堆形容词。' },
      { group:'技巧', name:'人物塑造', desc:'通过动作、对话、选择展现性格。' },
      { group:'技巧', name:'冲突与张力', desc:'人物想要什么、什么阻止他，故事才有动力。' },
      { group:'技巧', name:'叙述视角', desc:'第一人称、第三人称限知、全知，影响读者距离。' },
      { group:'类型', name:'短篇故事', desc:'一个场景、一个转折、一个余味。' },
      { group:'类型', name:'诗歌入门', desc:'意象、节奏、分行与留白。' }
    ],
    description:'创意写作靠观察与练习，不靠灵感。先学会把场景写具体，再谈风格。' },

  { id:'chinglish', name:'中式英语', layer:'阅读与写作', domain:'写作', status:'待补充', tracks:['读写','翻译','思维'], before:['word-choice','contrastive-analysis'],
    keywords:['chinglish','中式英语','母语迁移','直译','搭配错误','语序'],
    children:[
      { group:'词汇层', name:'一一对应直译', desc:'learn knowledge、open the light、eat medicine。' },
      { group:'词汇层', name:'搭配错误', desc:'do a mistake、play computer、big rain。' },
      { group:'句法层', name:'主语省略与堆叠', desc:'中文流水句直接翻成英语，缺少连接与主从。' },
      { group:'句法层', name:'语序迁移', desc:'时间地点位置、定语前置。' },
      { group:'语篇层', name:'过度重复与空话', desc:'with the development of society 式套话。' },
      { group:'方法', name:'对比地道表达', desc:'把中式表达与母语者表达并列，建立替换清单。' }
    ],
    description:'中式英语不是"英语差"，而是中文思维直接搬进英语。识别自己的高频迁移模式，才能逐项改掉。' },

  { id:'writing-errors', name:'常见写作错误', layer:'阅读与写作', domain:'写作', status:'待补充', tracks:['读写','语法'], before:['subject-verb-agreement','articles','tense-contrast'],
    keywords:['writing errors','写作错误','语法错误','拼写','标点','主谓一致','时态'],
    children:[
      { group:'语法', name:'主谓一致', desc:'第三人称单数、集合名词、插入语干扰。' },
      { group:'语法', name:'时态混用', desc:'一段之内过去时与现在时来回跳。' },
      { group:'语法', name:'冠词与单复数', desc:'漏 the、可数名词裸奔、不可数名词加 -s。' },
      { group:'语法', name:'句子结构', desc:'碎句、连写句、悬垂修饰语。' },
      { group:'用词', name:'搭配与选词', desc:'中式搭配、词性误用、同义词乱换。' },
      { group:'规范', name:'拼写与标点', desc:'大小写、逗号粘连、撇号缺失。' },
      { group:'方法', name:'个人错误清单', desc:'统计自己最常犯的 10 个错，逐条攻克。' }
    ],
    description:'写作提分最快的方式不是背模板，而是消灭自己的高频错误。先统计，再针对性训练。' },

  { id:'error-correction', name:'错误分析与纠正', layer:'阅读与写作', domain:'方法', status:'待补充', tracks:['方法','读写'], before:['writing-errors'],
    keywords:['error correction','错误分析','纠错','反馈','error type','self correction'],
    children:[
      { group:'分类', name:'语法错误', desc:'时态、主谓一致、冠词、介词。' },
      { group:'分类', name:'词汇错误', desc:'搭配、词性、选词不当。' },
      { group:'分类', name:'语篇错误', desc:'逻辑跳跃、衔接缺失、段落无中心。' },
      { group:'方法', name:'错误日志', desc:'记录原句、错误类型、正确版本、原因。' },
      { group:'方法', name:'间隔复现', desc:'把错题放进复习系统，隔几天再做一次。' },
      { group:'方法', name:'同伴互评', desc:'交换作文，按清单互查，比只看老师批改更主动。' }
    ],
    description:'错误是学习的地图。把错误分类、记录、复现，才能把"犯过的错"变成"掌握的点"。' },

  /* ==================== 翻译与对比 ==================== */

  { id:'translation-principles', name:'翻译原则', layer:'翻译与对比', domain:'翻译', status:'待补充', tracks:['翻译'], before:['contrastive-analysis'],
    keywords:['translation principles','翻译原则','信达雅','功能对等','忠实','通顺','equivalence'],
    children:[
      { group:'原则', name:'忠实 fidelity', desc:'准确传达原文信息，不增不减不歪曲。' },
      { group:'原则', name:'通顺 fluency', desc:'译文符合目标语言习惯，读起来不像翻译腔。' },
      { group:'原则', name:'功能对等', desc:'让目标读者获得与原文读者相近的感受与反应。' },
      { group:'原则', name:'信达雅的现代理解', desc:'忠实、通顺、得体，三者冲突时按文本目的取舍。' },
      { group:'判断', name:'直译与意译', desc:'能直译则直译，直译不通则意译。' },
      { group:'应用', name:'翻译的目的', desc:'新闻求信息，文学求风格，合同求精确。' }
    ],
    description:'翻译不是词对词替换，而是在两种语言之间重建意义。忠实与通顺冲突时，看文本目的做取舍。' },

  { id:'translation-techniques', name:'翻译技巧', layer:'翻译与对比', domain:'翻译', status:'待补充', tracks:['翻译'], before:['translation-principles'],
    keywords:['translation techniques','翻译技巧','词性转换','增译','减译','断句','合句','语序调整'],
    children:[
      { group:'词汇层', name:'词性转换', desc:'名词转动词、形容词转副词，让译文更自然。' },
      { group:'词汇层', name:'增译与减译', desc:'补充隐含信息，删去重复冗余。' },
      { group:'词汇层', name:'具体化与抽象化', desc:'把概括词译具体，或把具体词译概括。' },
      { group:'句子层', name:'断句与合句', desc:'英语长句拆成中文短句；中文流水句合并成英语从句。' },
      { group:'句子层', name:'语序调整', desc:'时间、地点、条件、原因在两种语言中的位置不同。' },
      { group:'语篇层', name:'衔接重建', desc:'中文靠意合，英语靠形合，连接词要补出来。' },
      { group:'文化层', name:'习语与典故', desc:'找对应表达，或意译加注。' }
    ],
    description:'翻译技巧的核心是"摆脱原句结构"。词性、语序、断合句都可以变，只要意义和功能保住。' },

  { id:'contrastive-analysis', name:'中英语言对比', layer:'翻译与对比', domain:'翻译', status:'待补充', tracks:['翻译','思维','语法'], before:['sentence-patterns','articles'],
    keywords:['contrastive analysis','中英对比','形合意合','主题显著','主语显著','SVO','时态'],
    children:[
      { group:'句法', name:'形合与意合', desc:'英语靠连接词显性连接，中文靠语义隐性命合。' },
      { group:'句法', name:'主语显著与主题显著', desc:'英语每句都要有主语，中文可以话题先行。' },
      { group:'句法', name:'定语位置', desc:'英语定语后置（从句），中文定语前置。' },
      { group:'语法', name:'时态与体', desc:'英语靠动词形态，中文靠时间词与语境。' },
      { group:'语法', name:'冠词与单复数', desc:'中文没有冠词与严格的单复数标记。' },
      { group:'语篇', name:'信息重心', desc:'英语重心常在句尾，中文常按时间顺序。' },
      { group:'应用', name:'翻译与写作', desc:'知道差异在哪，才能避免中式英语。' }
    ],
    description:'中英对比是翻译与写作的底层地图。形合与意合、主语与主题、定语位置，是最核心的三组差异。' },

  { id:'culture-translation', name:'文化与习语翻译', layer:'翻译与对比', domain:'翻译', status:'待补充', tracks:['翻译','文化'], before:['idioms','translation-techniques'],
    keywords:['culture translation','文化翻译','习语翻译','典故','文化负载词','归化','异化'],
    children:[
      { group:'问题', name:'文化负载词', desc:'春节、风水、功夫等词在英语中没有完全对应。' },
      { group:'策略', name:'归化 domestication', desc:'用目标文化熟悉的表达替代，读起来自然但可能丢文化信息。' },
      { group:'策略', name:'异化 foreignization', desc:'保留源文化表达，可能加注解释。' },
      { group:'策略', name:'习语对应', desc:'有对应习语就用，没有就意译。' },
      { group:'策略', name:'典故与幽默', desc:'解释背景，或找功能相近的表达。' },
      { group:'应用', name:'字幕与新闻翻译', desc:'字幕受时间空间限制，新闻受政治与读者背景影响。' }
    ],
    description:'文化翻译的难点不在语言，而在"没有对应物"。归化与异化没有绝对对错，取决于翻译目的。' },

  { id:'technical-translation', name:'科技与商务翻译', layer:'翻译与对比', domain:'翻译', status:'待补充', tracks:['翻译','商务','学术'], before:['translation-techniques','business-vocabulary'],
    keywords:['technical translation','科技翻译','商务翻译','术语','合同','说明书','patent'],
    children:[
      { group:'特点', name:'术语一致性', desc:'同一术语全文统一，建立术语表。' },
      { group:'特点', name:'精确与客观', desc:'避免歧义，少用修辞，数字与单位必须核对。' },
      { group:'文本', name:'说明书与手册', desc:'步骤清晰、祈使句、警告语规范。' },
      { group:'文本', name:'合同与法律', desc:'条件从句、定义严密，不能随意增删。' },
      { group:'文本', name:'商务邮件与报告', desc:'礼貌、清楚、行动导向。' },
      { group:'工具', name:'术语库与 CAT', desc:'Trados、memoQ、术语表保证一致性。' }
    ],
    description:'科技与商务翻译的第一要求是"准确、统一"。术语表比文采重要，数字与单位必须逐项核对。' },

  { id:'interpreting', name:'口译基础', layer:'翻译与对比', domain:'口语', status:'待补充', tracks:['翻译','听说'], before:['listening-strategies','speaking-fluency','translation-principles'],
    keywords:['interpreting','口译','交替传译','同声传译','笔记','视译','consecutive'],
    children:[
      { group:'类型', name:'交替传译', desc:'讲者停顿后翻译，需要笔记与短时记忆。' },
      { group:'类型', name:'同声传译', desc:'边听边译，高度自动化，需要长期训练。' },
      { group:'类型', name:'视译', desc:'看着文本即时翻译，训练快速转换。' },
      { group:'技能', name:'口译笔记', desc:'符号、缩写、箭头、结构线，不是逐字记录。' },
      { group:'技能', name:'听辨与意义提取', desc:'抓逻辑主干，不纠结字词。' },
      { group:'技能', name:'抗压与应变', desc:'遇到不会的词，用上位词或解释绕过去。' }
    ],
    description:'口译考的是"听懂得快、记得住、说得清"。笔记只是辅助，核心是意义提取与快速重组。' },

  { id:'translation-tools', name:'翻译工具', layer:'翻译与对比', domain:'翻译', status:'待补充', tracks:['翻译','方法','商务'], before:['technical-translation'],
    keywords:['translation tools','翻译工具','CAT','Trados','memoQ','机器翻译','DeepL','术语库'],
    children:[
      { group:'工具', name:'CAT 工具', desc:'Trados、memoQ、memoQ 的翻译记忆与术语库。' },
      { group:'工具', name:'机器翻译', desc:'DeepL、Google Translate、ChatGPT 的适用边界。' },
      { group:'工具', name:'术语库', desc:'统一术语，保证长文档一致性。' },
      { group:'工具', name:'质量检查', desc:'数字、术语、漏译、格式的自动检查。' },
      { group:'方法', name:'译后编辑', desc:'机器翻译 + 人工润色，效率与质量平衡。' },
      { group:'注意', name:'机器翻译的局限', desc:'文化、幽默、法律与文学文本仍需人工判断。' }
    ],
    description:'工具能提高效率，但不能替代判断。机器翻译适合初稿，术语、文化、语气仍要人来把关。' }

]);
