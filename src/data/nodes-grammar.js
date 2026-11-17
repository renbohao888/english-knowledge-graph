/* ============================================================
 * 知识点数据：词性与句子 / 时态·语态·情态 / 从句与复杂句
 * ============================================================ */
window.KB = window.KB || {};
window.KB.NODES = (window.KB.NODES || []).concat([

  /* ==================== 词性与句子 ==================== */

  { id:'parts-of-speech', name:'词性总览', layer:'词性与句子', domain:'语法', status:'待补充', tracks:['语法'], before:['word-formation'],
    keywords:['parts of speech','词性','十大词性','名词','动词','形容词','副词','介词','连词','感叹词'],
    children:[
      { group:'实词', name:'名词 noun', desc:'表示人、事物、地点、抽象概念。' },
      { group:'实词', name:'动词 verb', desc:'表示动作、状态或发生。' },
      { group:'实词', name:'形容词 adjective', desc:'修饰名词，描述性质与状态。' },
      { group:'实词', name:'副词 adverb', desc:'修饰动词、形容词、其他副词或整句。' },
      { group:'实词', name:'代词 pronoun', desc:'代替名词，避免重复。' },
      { group:'虚词', name:'冠词、介词、连词', desc:'连接与限定，数量少但用法最细。' },
      { group:'虚词', name:'数词、感叹词', desc:'数量表达与情绪表达。' },
      { group:'应用', name:'先判断词性再谈用法', desc:'同一个词在不同位置可以是不同词性，先看它在句中做什么。' }
    ],
    description:'词性是语法的坐标系。判断不了词性，后面的时态、从句、搭配都会连锁出错。' },

  { id:'nouns', name:'名词', layer:'词性与句子', domain:'语法', status:'待补充', tracks:['语法','词汇'], before:['parts-of-speech'],
    keywords:['noun','名词','可数','不可数','复数','所有格','集合名词','复合名词'],
    children:[
      { group:'分类', name:'可数名词', desc:'能数、有复数形式：book→books。' },
      { group:'分类', name:'不可数名词', desc:'water、information、advice：不能直接加 a/an 或 -s。' },
      { group:'分类', name:'集合名词', desc:'team、family：看作整体用单数，看作成员可用复数。' },
      { group:'形式', name:'复数变化', desc:'规则变化、不规则变化与单复数同形。' },
      { group:'形式', name:'所有格', desc:'\'s 与 of 的选择，以及双重所有格。' },
      { group:'形式', name:'复合名词', desc:'名词修饰名词时通常用单数：a shoe shop。' },
      { group:'易错', name:'可数与不可数的跨语言差异', desc:'information、furniture、equipment 在英语里不可数，中文却像可数。' }
    ],
    description:'名词的坑集中在可数性和复数。中国学习者最容易在 information、advice、equipment 这类词上加 -s。' },

  { id:'pronouns', name:'代词', layer:'词性与句子', domain:'语法', status:'待补充', tracks:['语法'], before:['nouns'],
    keywords:['pronoun','代词','人称代词','物主代词','反身代词','指示代词','不定代词','关系代词'],
    children:[
      { group:'人称', name:'主格与宾格', desc:'I/me、he/him、they/them 在句中的位置。' },
      { group:'人称', name:'物主代词', desc:'my/mine、your/yours：形容词性与名词性。' },
      { group:'人称', name:'反身代词', desc:'myself、yourself、themselves：主语与宾语一致时用。' },
      { group:'类别', name:'指示代词', desc:'this/that/these/those，远指近指与指代前文。' },
      { group:'类别', name:'不定代词', desc:'somebody、anything、none、each、everyone 的单复数与指代。' },
      { group:'类别', name:'关系代词', desc:'who、whom、which、that、whose 引导定语从句。' },
      { group:'类别', name:'相互代词', desc:'each other、one another。' },
      { group:'易错', name:'代词指代一致', desc:'everyone 用 they 指代；it/they 指代前文名词要明确。' }
    ],
    description:'代词看似简单，实际连着主谓一致、指代清晰和正式度。写作里指代不明，读者就不知道你说谁。' },

  { id:'articles', name:'冠词', layer:'词性与句子', domain:'语法', status:'待补充', tracks:['语法'], before:['nouns'],
    keywords:['article','冠词','a an the','定冠词','不定冠词','零冠词','the','an'],
    children:[
      { group:'不定冠词', name:'a / an 的选择', desc:'看后面单词的第一个音素，不是第一个字母：an hour、a university。' },
      { group:'定冠词', name:'the 的特指', desc:'双方都知道、前文提过、独一无二、最高级与序数词。' },
      { group:'定冠词', name:'the 的类指', desc:'the + 单数名词、the + 形容词表示一类人。' },
      { group:'零冠词', name:'不用冠词的场景', desc:'泛指复数、不可数名词、专有名词、三餐、学科、语言。' },
      { group:'固定搭配', name:'有无冠词意义不同', desc:'go to school 与 go to the school；in front of 与 in the front of。' },
      { group:'易错', name:'中文没有冠词', desc:'中国学习者最常漏 the 或多加 a，需要按"特指/泛指"重新建立直觉。' }
    ],
    description:'冠词是英语最高频的语法词，也是中文母语者最难自然掌握的。核心只有一件事：特指还是泛指。' },

  { id:'adjectives', name:'形容词', layer:'词性与句子', domain:'语法', status:'待补充', tracks:['语法','读写'], before:['parts-of-speech'],
    keywords:['adjective','形容词','定语','表语','比较级','最高级','-ed -ing','形容词顺序'],
    children:[
      { group:'位置', name:'定语与表语', desc:'放在名词前作定语，或放在系动词后作表语。' },
      { group:'位置', name:'多个形容词的顺序', desc:'限定词→观点→大小→形状→年龄→颜色→国籍→材料。' },
      { group:'比较', name:'比较级与最高级', desc:'-er/-est 与 more/most，以及不规则变化。' },
      { group:'比较', name:'比较句型', desc:'as…as、not as…as、the more…the more、比较级表最高级。' },
      { group:'形式', name:'-ed 与 -ing 形容词', desc:'interested 修饰人，interesting 修饰物。' },
      { group:'形式', name:'形容词作名词', desc:'the rich、the elderly 表示一类人。' },
      { group:'易错', name:'系动词后接形容词', desc:'feel、look、sound、taste、seem 后接形容词，不接副词。' }
    ],
    description:'形容词的难点在顺序、比较级和 -ed/-ing 混淆。写作里形容词堆砌还会显得空泛，要克制。' },

  { id:'adverbs', name:'副词', layer:'词性与句子', domain:'语法', status:'待补充', tracks:['语法'], before:['adjectives'],
    keywords:['adverb','副词','方式副词','频率副词','程度副词','句子副词','hard hardly'],
    children:[
      { group:'类型', name:'方式副词', desc:'quickly、carefully、well，修饰动词。' },
      { group:'类型', name:'频率副词', desc:'always、usually、often、sometimes、never，位置在实义动词前、be 动词后。' },
      { group:'类型', name:'程度副词', desc:'very、quite、rather、extremely、hardly，修饰形容词或副词。' },
      { group:'类型', name:'句子副词', desc:'frankly、fortunately、however，修饰整句，常放句首。' },
      { group:'位置', name:'副词的位置', desc:'方式在动词后、频率在动词前、句子副词在句首或句中。' },
      { group:'易错', name:'hard / hardly', desc:'hard 努力地，hardly 几乎不；late/lately、near/nearly 同理。' }
    ],
    description:'副词的位置比形式更容易错。频率副词放错位置，句子会变得不自然甚至歧义。' },

  { id:'verbs-overview', name:'动词分类', layer:'词性与句子', domain:'语法', status:'待补充', tracks:['语法'], before:['parts-of-speech'],
    keywords:['verb','动词','及物','不及物','系动词','助动词','情态动词','实义动词','短语动词'],
    children:[
      { group:'按搭配', name:'及物动词', desc:'后面必须带宾语：make、give、discuss。' },
      { group:'按搭配', name:'不及物动词', desc:'不带宾语：arrive、happen、rise。' },
      { group:'按功能', name:'系动词', desc:'be、become、seem、feel 等，后面接表语。' },
      { group:'按功能', name:'助动词', desc:'be、do、have，构成时态、语态、否定与疑问。' },
      { group:'按功能', name:'情态动词', desc:'can、may、must、should 等，表达能力、许可、义务与推测。' },
      { group:'按性质', name:'状态动词与动态动词', desc:'know、belong 通常不用进行时；run、eat 可以。' },
      { group:'易错', name:'rise / raise / lie / lay', desc:'不及物与及物成对，是写作高频错点。' }
    ],
    description:'动词是句子的发动机。先分清及物/不及物、状态/动态，时态和句型才有正确的基础。' },

  { id:'prepositions', name:'介词', layer:'词性与句子', domain:'语法', status:'待补充', tracks:['语法','词汇'], before:['parts-of-speech'],
    keywords:['preposition','介词','时间介词','地点介词','方位介词','in on at','固定搭配'],
    children:[
      { group:'时间', name:'in / on / at（时间）', desc:'in 年/月/季节，on 具体日期，at 具体时刻。' },
      { group:'地点', name:'in / on / at（地点）', desc:'in 大地点/内部，on 表面，at 具体点。' },
      { group:'方位', name:'above/over、below/under', desc:'相对高低与覆盖关系。' },
      { group:'移动', name:'to / into / onto / through', desc:'方向与路径，以及 arrive in/at 的区别。' },
      { group:'搭配', name:'动词/形容词 + 介词', desc:'depend on、interested in、good at、afraid of。' },
      { group:'易错', name:'介词后接动名词', desc:'look forward to doing、be used to doing，to 是介词不是不定式。' }
    ],
    description:'介词是英语"小词大用"的典型。中文靠语序和动词，英语靠介词，固定搭配必须整块记。' },

  { id:'conjunctions', name:'连词', layer:'词性与句子', domain:'语法', status:'待补充', tracks:['语法','读写'], before:['parts-of-speech'],
    keywords:['conjunction','连词','并列连词','从属连词','关联连词','and but or','because although'],
    children:[
      { group:'并列', name:'and / but / or / so / for / yet / nor', desc:'连接对等成分与并列句。' },
      { group:'从属', name:'because / although / while / if / unless', desc:'引导状语从句，连接主从关系。' },
      { group:'关联', name:'both…and、either…or、neither…nor、not only…but also', desc:'成对使用，注意主谓一致的就近原则。' },
      { group:'易错', name:'because 与 so 不连用', desc:'中文"因为……所以……"在英语里只保留一个。' },
      { group:'易错', name:'although 与 but 不连用', desc:'主从连词与并列连词不能重复。' },
      { group:'标点', name:'逗号与分号', desc:'并列句连接两个完整句子时，连词前通常加逗号。' }
    ],
    description:'连词决定句子的逻辑关系。中文的"因为…所以…"式双重连接，是中式英语的经典错误。' },

  { id:'determiners', name:'限定词', layer:'词性与句子', domain:'语法', status:'待补充', tracks:['语法'], before:['articles','pronouns'],
    keywords:['determiner','限定词','数量词','some any','much many','few little','each every'],
    children:[
      { group:'类别', name:'冠词与指示词', desc:'a/an/the、this/that/these/those。' },
      { group:'类别', name:'物主限定词', desc:'my、your、his、her、our、their。' },
      { group:'数量', name:'some / any / no', desc:'肯定句、否定句与疑问句的基本分工。' },
      { group:'数量', name:'much/many、few/little', desc:'可数与不可数的匹配，a few 与 few 的感情色彩。' },
      { group:'数量', name:'each / every / all / both', desc:'单复数与谓语动词的搭配。' },
      { group:'顺序', name:'限定词不能叠加', desc:'不能说 my the book、some these books。' }
    ],
    description:'限定词负责"范围和数量"。中文没有冠词系统，数量词的位置和可数性需要重新建立规则。' },

  { id:'numerals', name:'数词', layer:'词性与句子', domain:'语法', status:'待补充', tracks:['语法','词汇'], before:['determiners'],
    keywords:['numeral','数词','基数词','序数词','分数','小数','百分比','hundred thousand'],
    children:[
      { group:'基数', name:'基数词', desc:'one、two、hundred、thousand、million 的读法与写法。' },
      { group:'序数', name:'序数词', desc:'first、second、third；日期与排名用序数。' },
      { group:'分数', name:'分数与小数', desc:'one half、two thirds、three point one four。' },
      { group:'百分数', name:'百分比与倍数', desc:'twenty percent、twice、three times as…as。' },
      { group:'一致', name:'数词与名词单复数', desc:'two hundred students，但 hundreds of students。' }
    ],
    description:'数词本身不难，难在快速听说和写作规范。hundred/thousand 的单复数与 of 结构要分清。' },

  { id:'interjections', name:'感叹词', layer:'词性与句子', domain:'语法', status:'待补充', tracks:['语法','听说'], before:['parts-of-speech'],
    keywords:['interjection','感叹词','oh','wow','ouch','hey','语气词'],
    children:[
      { group:'情绪', name:'惊讶与赞叹', desc:'wow、oh、amazing、incredible。' },
      { group:'情绪', name:'疼痛与反感', desc:'ouch、ugh、yuck。' },
      { group:'社交', name:'呼唤与回应', desc:'hey、hi、hello、yeah、hmm。' },
      { group:'语域', name:'口语与书面', desc:'感叹词多用于口语与对话，正式写作中少用。' }
    ],
    description:'感叹词是口语的情绪标点。用得自然能拉近距离，写进正式文章却会显得不专业。' },

  { id:'sentence-elements', name:'句子成分', layer:'词性与句子', domain:'语法', status:'待补充', tracks:['语法'], before:['nouns','verbs-overview'],
    keywords:['sentence elements','句子成分','主语','谓语','宾语','表语','定语','状语','补语','同位语'],
    children:[
      { group:'主干', name:'主语与谓语', desc:'句子必须有的核心：谁/什么 + 做什么/是什么。' },
      { group:'主干', name:'宾语', desc:'动作的承受者：直接宾语与间接宾语。' },
      { group:'主干', name:'表语', desc:'系动词后面的成分，说明主语身份或状态。' },
      { group:'修饰', name:'定语', desc:'修饰名词，可由形容词、从句、介词短语充当。' },
      { group:'修饰', name:'状语', desc:'修饰动作或整句：时间、地点、原因、方式、条件。' },
      { group:'补充', name:'宾语补足语', desc:'补充说明宾语：make him happy、elect her president。' },
      { group:'补充', name:'同位语', desc:'紧挨名词，进一步解释它。' }
    ],
    description:'句子成分是拆句的地图。长难句再复杂，也是这些成分的嵌套与扩展。' },

  { id:'sentence-patterns', name:'五种基本句型', layer:'词性与句子', domain:'语法', status:'待补充', tracks:['语法','读写'], before:['sentence-elements'],
    keywords:['sentence patterns','基本句型','SV','SVO','SVP','SVOO','SVOC','简单句'],
    children:[
      { group:'句型', name:'主谓 SV', desc:'The baby cried. 不及物动词，句子完整。' },
      { group:'句型', name:'主谓宾 SVO', desc:'She reads books. 及物动词带宾语。' },
      { group:'句型', name:'主系表 SVP', desc:'He is a teacher. 系动词 + 表语。' },
      { group:'句型', name:'主谓双宾 SVOO', desc:'He gave me a book. 间接宾语 + 直接宾语。' },
      { group:'句型', name:'主谓宾补 SVOC', desc:'They made him captain. 补语说明宾语。' },
      { group:'应用', name:'先搭主干再挂修饰', desc:'写句子先确定五种句型，再加定语、状语和从句。' }
    ],
    description:'所有英语句子都长在五种骨架上。写作混乱，往往是因为主干没搭稳就开始堆修饰。' },

  { id:'subject-verb-agreement', name:'主谓一致', layer:'词性与句子', domain:'语法', status:'待补充', tracks:['语法'], before:['sentence-patterns'],
    keywords:['subject verb agreement','主谓一致','第三人称单数','就近原则','集合名词','each every'],
    children:[
      { group:'基本', name:'第三人称单数', desc:'一般现在时 he/she/it 后动词加 -s。' },
      { group:'规则', name:'集合名词', desc:'team、family 作整体用单数，强调成员可用复数。' },
      { group:'规则', name:'不定代词', desc:'everyone、each、nobody 通常用单数；both、few 用复数。' },
      { group:'规则', name:'并列主语', desc:'and 连接用复数；either…or、neither…nor 就近原则。' },
      { group:'规则', name:'数量短语', desc:'the number of 用单数，a number of 用复数。' },
      { group:'易错', name:'插入语干扰', desc:'主语后面跟着 with、along with、as well as 时，谓语仍跟主语一致。' }
    ],
    description:'主谓一致是中国学习者写作最稳定的扣分点。规则不复杂，关键是被插入语和数量短语干扰时仍能找回主语。' },

  { id:'word-order', name:'语序', layer:'词性与句子', domain:'语法', status:'待补充', tracks:['语法'], before:['sentence-patterns'],
    keywords:['word order','语序','SVO','状语位置','形容词顺序','倒装基础'],
    children:[
      { group:'基本', name:'主谓宾语序', desc:'英语是 SVO 语言，与中文大体一致，但修饰位置不同。' },
      { group:'修饰', name:'状语的位置', desc:'方式→地点→时间；时间状语可放句首或句尾。' },
      { group:'修饰', name:'定语的位置', desc:'形容词前置，介词短语与从句后置。' },
      { group:'信息', name:'末端重心', desc:'把长而新的信息放句尾，句子更自然。' },
      { group:'对比', name:'中英语序差异', desc:'中文"我昨天在图书馆看书"，英语时间地点通常后置。' }
    ],
    description:'中英语序大体相同，差在修饰语位置和信息重心。写作别扭，很多时候是语序在悄悄说中文。' },

  { id:'negation', name:'否定表达', layer:'词性与句子', domain:'语法', status:'待补充', tracks:['语法'], before:['sentence-patterns'],
    keywords:['negation','否定','not','no','none','never','否定词','双重否定','部分否定'],
    children:[
      { group:'基本', name:'not 的位置', desc:'助动词/be 动词后加 not；实义动词借助 do。' },
      { group:'基本', name:'no 与 none', desc:'no + 名词，none 单独使用。' },
      { group:'范围', name:'全部否定与部分否定', desc:'not all、not every 是部分否定；no one、none 是全部否定。' },
      { group:'范围', name:'否定词前置', desc:'never、hardly、seldom 放句首时主句倒装。' },
      { group:'易错', name:'双重否定', desc:'I don\'t know nothing 在标准英语里是错误；但双重否定可表强调，需看语域。' },
      { group:'易错', name:'否定转移', desc:'I don\'t think he is right 否定的是从句，不是 think。' }
    ],
    description:'否定不只是加 not。全部否定、部分否定、否定转移，都会改变句子的真实含义。' },

  { id:'questions', name:'疑问句', layer:'词性与句子', domain:'语法', status:'待补充', tracks:['语法','听说'], before:['sentence-patterns'],
    keywords:['questions','疑问句','一般疑问句','特殊疑问句','反意疑问句','间接疑问句','wh-'],
    children:[
      { group:'类型', name:'一般疑问句', desc:'助动词/be 提前：Do you…? Are you…? Have you…?' },
      { group:'类型', name:'特殊疑问句', desc:'疑问词 + 助动词 + 主语 + 动词：Where did you go?' },
      { group:'类型', name:'反意疑问句', desc:'前肯后否、前否后肯；注意 I am 用 aren\'t I。' },
      { group:'类型', name:'选择疑问句', desc:'A or B，回答要选一个，不用 yes/no。' },
      { group:'类型', name:'间接疑问句', desc:'宾语从句用陈述语序：Do you know where he is? 不是 where is he。' },
      { group:'语调', name:'升调与降调', desc:'一般疑问句升调，特殊疑问句降调。' },
      { group:'易错', name:'主语疑问句', desc:'Who called you? 疑问词作主语时不再提前助动词。' }
    ],
    description:'疑问句是口语的发动机。间接疑问句的语序、反意疑问句的尾巴，是最容易露怯的两个点。' },

  { id:'imperatives', name:'祈使句', layer:'词性与句子', domain:'语法', status:'待补充', tracks:['语法','听说'], before:['sentence-patterns'],
    keywords:['imperative','祈使句','命令','请求','let us','please','否定祈使'],
    children:[
      { group:'形式', name:'动词原形开头', desc:'Close the door. 主语 you 通常省略。' },
      { group:'形式', name:'否定祈使', desc:'Don\'t + 动词原形；Never + 动词原形加强语气。' },
      { group:'形式', name:'Let 句型', desc:'Let me…、Let\'s…、Let him… 的建议与许可。' },
      { group:'语气', name:'礼貌化', desc:'please、Could you…? Would you mind…? 把命令变成请求。' },
      { group:'应用', name:'说明与指令', desc:'说明书、食谱、路标大量使用祈使句。' }
    ],
    description:'祈使句省主语，语气从命令到请求跨度很大。加 please 或改成疑问句，礼貌度立刻不同。' },

  { id:'exclamations', name:'感叹句', layer:'词性与句子', domain:'语法', status:'待补充', tracks:['语法','听说'], before:['sentence-patterns'],
    keywords:['exclamation','感叹句','what how','how beautiful','what a'],
    children:[
      { group:'形式', name:'What + 名词', desc:'What a beautiful day! What terrible news!' },
      { group:'形式', name:'How + 形容词/副词', desc:'How beautiful! How fast he runs!' },
      { group:'形式', name:'陈述句改感叹', desc:'用 so/such 或语调表达感叹。' },
      { group:'易错', name:'可数与不可数', desc:'What a day! 但 What good weather! 不加 a。' }
    ],
    description:'感叹句结构简单，但 what 与 how 的选择、可数名词前 a 的取舍常错。口语里语调比结构更重要。' },

  { id:'there-be', name:'There be 句型', layer:'词性与句子', domain:'语法', status:'待补充', tracks:['语法'], before:['sentence-patterns'],
    keywords:['there be','存在句','there is','there are','就近原则','there will be'],
    children:[
      { group:'基本', name:'存在表达', desc:'There is a book on the desk. 表示"某处有某物"。' },
      { group:'一致', name:'就近原则', desc:'There is a pen and two books. 谓语跟最近的名词。' },
      { group:'时态', name:'There be 的时态变化', desc:'There was/were、There has been、There will be。' },
      { group:'情态', name:'There must/may be', desc:'推测存在，以及 There seems to be。' },
      { group:'对比', name:'与 have 的区别', desc:'There be 表存在，have 表拥有；不能混用。' }
    ],
    description:'There be 是中文"有"的对应结构，但和 have 分工明确。写作里 There is 开头过多，会显得松散。' },

  { id:'it-patterns', name:'It 句型', layer:'词性与句子', domain:'语法', status:'待补充', tracks:['语法','读写'], before:['sentence-patterns'],
    keywords:['it patterns','it 句型','形式主语','形式宾语','强调句','it is said','weather it'],
    children:[
      { group:'形式主语', name:'It is + 形容词 + to do', desc:'It is important to learn grammar. 真正主语后置。' },
      { group:'形式主语', name:'It is + 名词 + that 从句', desc:'It is a pity that…、It is no surprise that…。' },
      { group:'形式宾语', name:'find/make it + 形容词 + to do', desc:'I find it hard to concentrate. it 代替后面的不定式。' },
      { group:'强调', name:'It is … that 强调句', desc:'强调主语、宾语或状语；去掉 it is 和 that 句子仍完整。' },
      { group:'天气时间', name:'非人称 it', desc:'It is raining. It is five o\'clock. It is a long way.。' }
    ],
    description:'It 是英语最忙的小词：形式主语、形式宾语、强调结构、天气时间都靠它。写作里用好 It，句子会立刻正式起来。' },

  { id:'inversion', name:'倒装', layer:'词性与句子', domain:'语法', status:'待补充', tracks:['语法','读写'], before:['word-order','negation'],
    keywords:['inversion','倒装','完全倒装','部分倒装','never','hardly','only','so do I'],
    children:[
      { group:'类型', name:'完全倒装', desc:'地点状语提前：Here comes the bus. On the table sat a cat.' },
      { group:'类型', name:'部分倒装', desc:'否定词/only 放句首：Never have I seen such a thing. Only then did he realize.' },
      { group:'类型', name:'条件句倒装', desc:'Were I you、Had I known、Should it rain，省略 if。' },
      { group:'类型', name:'So/Neither 倒装', desc:'So do I、Neither does he 表示同样/也不。' },
      { group:'应用', name:'强调与正式度', desc:'倒装能突出重点，但用多了会显得做作。' }
    ],
    description:'倒装是语法的"高级动作"，写作里用一两处能提气，用多了像模板。先保证不倒装时句子也正确。' },

  { id:'ellipsis-substitution', name:'省略与替代', layer:'词性与句子', domain:'语法', status:'待补充', tracks:['语法','听说'], before:['sentence-patterns'],
    keywords:['ellipsis','substitution','省略','替代','so do I','neither','助动词替代','口语省略'],
    children:[
      { group:'省略', name:'口语省略', desc:'(I) Hope so. (Have you) Got it? 主语与助动词常省略。' },
      { group:'省略', name:'并列句省略', desc:'I like tea and (I like) coffee. 重复部分可省。' },
      { group:'替代', name:'助动词替代', desc:'Yes, I do. / He can, and so can she. 用助动词代替整个谓语。' },
      { group:'替代', name:'so / neither 结构', desc:'So do I 表示同样；Neither/Nor do I 表示也不。' },
      { group:'替代', name:'one / ones', desc:'用 one 替代前面出现的可数名词。' }
    ],
    description:'省略和替代让语言经济。听力里省略多，写作里适度省略能避免重复，但过度省略会造成歧义。' },

  { id:'emphasis', name:'强调', layer:'词性与句子', domain:'语法', status:'待补充', tracks:['语法','读写'], before:['it-patterns','inversion'],
    keywords:['emphasis','强调','do 强调','强调句','前置','what 从句','本身'],
    children:[
      { group:'手段', name:'do/does/did 强调', desc:'I do like it. 用于强调肯定语气。' },
      { group:'手段', name:'It is…that 强调句', desc:'强调主语、宾语或状语。' },
      { group:'手段', name:'What 从句强调', desc:'What I need is time. 把信息焦点放到句尾。' },
      { group:'手段', name:'前置与倒装', desc:'把要强调的成分移到句首。' },
      { group:'手段', name:'词汇强调', desc:'very、extremely、indeed、at all 等。' },
      { group:'应用', name:'克制的强调', desc:'学术写作少用感叹式强调，多用结构和选词。' }
    ],
    description:'强调不是大声说话，而是改变信息焦点。写作里一篇用一两次足够，多了反而没有重点。' },

  /* ==================== 时态·语态·情态 ==================== */

  { id:'tense-system', name:'时态体系总览', layer:'时态·语态·情态', domain:'语法', status:'待补充', tracks:['语法'], before:['verbs-overview','sentence-patterns'],
    keywords:['tense','时态','时态体系','12时态','aspect','体','时间','state','动作'],
    children:[
      { group:'两个维度', name:'时间 time', desc:'过去、现在、将来三个时间区域。' },
      { group:'两个维度', name:'体 aspect', desc:'一般、进行、完成、完成进行四种观察方式。' },
      { group:'组合', name:'12 种时态', desc:'3 个时间 × 4 个体，构成 12 个时态格子。' },
      { group:'组合', name:'时态与语态', desc:'每个时态都可以有主动与被动两种形式。' },
      { group:'应用', name:'先确定时间和体', desc:'不要背 12 个名字，先问：什么时候？动作处于什么阶段？' }
    ],
    description:'时态不是 12 个孤立规则，而是"时间 × 观察方式"的坐标系。理解这个格子，时态就不用死记。' },

  { id:'present-simple', name:'一般现在时', layer:'时态·语态·情态', domain:'语法', status:'待补充', tracks:['语法'], before:['tense-system'],
    keywords:['present simple','一般现在时','第三人称单数','习惯','事实','时间表'],
    children:[
      { group:'用法', name:'习惯与反复动作', desc:'I get up at seven every day.' },
      { group:'用法', name:'客观事实与真理', desc:'The earth goes around the sun.' },
      { group:'用法', name:'时间表与安排', desc:'The train leaves at 9. 将来但按时刻表发生。' },
      { group:'形式', name:'第三人称单数', desc:'he/she/it 后动词加 -s 或 -es。' },
      { group:'形式', name:'否定与疑问', desc:'借助 do/does：Does he like it?' },
      { group:'对比', name:'与现在进行时的区别', desc:'一般现在时表习惯，进行时表此刻正在发生。' }
    ],
    description:'一般现在时是英语最基础的时态，但第三人称单数的 -s 是中国学习者写作中最常漏的细节。' },

  { id:'present-continuous', name:'现在进行时', layer:'时态·语态·情态', domain:'语法', status:'待补充', tracks:['语法'], before:['present-simple'],
    keywords:['present continuous','现在进行时','be doing','此刻','临时','趋势'],
    children:[
      { group:'用法', name:'此刻正在发生', desc:'She is reading now. 说话时正在进行的动作。' },
      { group:'用法', name:'现阶段临时状态', desc:'I am living in Beijing this year. 不一定是此刻。' },
      { group:'用法', name:'正在变化的趋势', desc:'Prices are rising. 描述渐变过程。' },
      { group:'用法', name:'安排好的将来', desc:'I am meeting him tomorrow. 已确定的未来安排。' },
      { group:'形式', name:'be + 动词 -ing', desc:'注意 -ing 的拼写变化：run→running、lie→lying。' },
      { group:'限制', name:'状态动词不用进行时', desc:'know、belong、like 通常不用进行时；但 I\'m loving it 是广告语体。' }
    ],
    description:'现在进行时不只是"正在"，还能表达临时状态、变化趋势和确定安排。状态动词的限制要单独记。' },

  { id:'present-perfect', name:'现在完成时', layer:'时态·语态·情态', domain:'语法', status:'待补充', tracks:['语法'], before:['present-simple','past-simple'],
    keywords:['present perfect','现在完成时','have done','since','for','经历','已完成','already yet'],
    children:[
      { group:'用法', name:'过去发生、影响现在', desc:'I have lost my keys. 结果是现在打不开门。' },
      { group:'用法', name:'经历', desc:'Have you ever been to London? 强调人生经验。' },
      { group:'用法', name:'持续到现在', desc:'I have lived here for ten years. 从过去持续到现在。' },
      { group:'用法', name:'刚完成', desc:'She has just finished. now 的语境下刚发生。' },
      { group:'标志词', name:'already / yet / just / ever / never', desc:'这些词常与现在完成时连用。' },
      { group:'标志词', name:'since / for', desc:'since + 时间点，for + 时间段。' },
      { group:'对比', name:'与一般过去时的分界', desc:'有具体过去时间就用过去时；强调与现在的联系才用完成时。' }
    ],
    description:'现在完成时是中文母语者的头号难点：中文说"我去了"，英语要区分"去了（已回来）"和"去过（有经历）"。' },

  { id:'present-perfect-continuous', name:'现在完成进行时', layer:'时态·语态·情态', domain:'语法', status:'待补充', tracks:['语法'], before:['present-perfect','present-continuous'],
    keywords:['present perfect continuous','现在完成进行时','have been doing','持续','刚刚停止'],
    children:[
      { group:'用法', name:'持续到现在', desc:'I have been waiting for two hours. 强调过程与持续。' },
      { group:'用法', name:'刚结束仍有影响', desc:'You have been running—you are sweaty. 动作刚停，结果可见。' },
      { group:'用法', name:'反复发生', desc:'She has been calling me all morning. 一段时间内反复。' },
      { group:'对比', name:'与现在完成时的区别', desc:'完成时强调结果，完成进行时强调过程与持续。' },
      { group:'限制', name:'状态动词仍受限', desc:'know、belong 等通常不用完成进行时。' }
    ],
    description:'现在完成进行时强调"一直在做"。和现在完成时的区别，是结果视角与过程视角的区别。' },

  { id:'past-simple', name:'一般过去时', layer:'时态·语态·情态', domain:'语法', status:'待补充', tracks:['语法'], before:['present-simple'],
    keywords:['past simple','一般过去时','did','yesterday','ago','不规则动词','过去式'],
    children:[
      { group:'用法', name:'过去发生并结束', desc:'I visited my grandmother yesterday. 与现在没有直接联系。' },
      { group:'用法', name:'过去习惯', desc:'When I was a child, I played football every day.' },
      { group:'形式', name:'规则动词 -ed', desc:'-ed 的三种读音与拼写变化。' },
      { group:'形式', name:'不规则动词', desc:'go→went→gone、take→took→taken，需要成表记忆。' },
      { group:'形式', name:'否定与疑问', desc:'didn\'t + 原形；Did you…? 助动词已过去，主动词还原。' },
      { group:'标志词', name:'yesterday / ago / last / in 1990', desc:'明确过去时间是使用过去时的强信号。' }
    ],
    description:'一般过去时本身不难，难在不规则动词和"did 后面动词还原"。写作叙事几乎全靠它。' },

  { id:'past-continuous', name:'过去进行时', layer:'时态·语态·情态', domain:'语法', status:'待补充', tracks:['语法'], before:['past-simple','present-continuous'],
    keywords:['past continuous','过去进行时','was doing','when while','背景动作'],
    children:[
      { group:'用法', name:'过去某时刻正在进行', desc:'At 8 p.m. I was studying. 过去的时间点 + 进行中的动作。' },
      { group:'用法', name:'背景动作', desc:'I was walking home when it started to rain. 长动作作背景，短动作打断。' },
      { group:'用法', name:'两个同时进行的动作', desc:'She was cooking while he was reading.' },
      { group:'形式', name:'was/were + -ing', desc:'注意主语与 was/were 的一致。' },
      { group:'对比', name:'与一般过去时的配合', desc:'when 常接短暂动作，while 常接持续动作。' }
    ],
    description:'过去进行时最常出现在"背景 + 打断"的叙事里。when 与 while 的分工要配合动作长短理解。' },

  { id:'past-perfect', name:'过去完成时', layer:'时态·语态·情态', domain:'语法', status:'待补充', tracks:['语法'], before:['past-simple','present-perfect'],
    keywords:['past perfect','过去完成时','had done','过去的过去','by the time','before'],
    children:[
      { group:'用法', name:'过去的过去', desc:'When I arrived, the train had left. 两个过去动作，先发生的用 had done。' },
      { group:'用法', name:'过去某时之前完成', desc:'By 2020, he had written three books.' },
      { group:'用法', name:'虚拟与条件句中的过去完成', desc:'If I had known… 表示与过去事实相反。' },
      { group:'标志词', name:'by the time / before / already', desc:'这些结构常提示需要用过去完成时。' },
      { group:'注意', name:'不必滥用', desc:'动作顺序已由 before/after 明确时，有时用一般过去时即可。' }
    ],
    description:'过去完成时只用来标"更早的过去"。故事里两个过去动作一前一后，它就是时间轴的箭头。' },

  { id:'past-perfect-continuous', name:'过去完成进行时', layer:'时态·语态·情态', domain:'语法', status:'待补充', tracks:['语法'], before:['past-perfect','present-perfect-continuous'],
    keywords:['past perfect continuous','过去完成进行时','had been doing','持续到过去某时'],
    children:[
      { group:'用法', name:'持续到过去某时', desc:'She had been working there for five years before she quit.' },
      { group:'用法', name:'过去结果可见', desc:'His eyes were red because he had been crying.' },
      { group:'对比', name:'与过去完成时的区别', desc:'had done 强调完成，had been doing 强调持续过程。' },
      { group:'限制', name:'使用频率低', desc:'考试与写作中较少用，理解即可，不必强行使用。' }
    ],
    description:'过去完成进行时是"过去完成 + 进行"的叠加，表示持续到过去某一点的过程。写作中点到为止。' },

  { id:'future-forms', name:'将来时表达', layer:'时态·语态·情态', domain:'语法', status:'待补充', tracks:['语法'], before:['present-simple','modal-verbs'],
    keywords:['future','将来时','will','be going to','现在进行时表将来','be to','be about to'],
    children:[
      { group:'形式', name:'will + 动词原形', desc:'临时决定、预测、承诺：I will help you.' },
      { group:'形式', name:'be going to', desc:'已有计划或明显迹象：I am going to study abroad.' },
      { group:'形式', name:'现在进行时表将来', desc:'确定安排：I am meeting her at six.' },
      { group:'形式', name:'一般现在时表将来', desc:'时刻表与日程：The film starts at eight.' },
      { group:'形式', name:'be to / be about to', desc:'正式安排与即将发生：The meeting is to be held… / I am about to leave.' },
      { group:'对比', name:'will 与 be going to', desc:'临时决定 vs 事先计划；主观预测 vs 有迹象的预测。' }
    ],
    description:'英语没有单一的"将来时"，而是用多种形式表达未来。选哪种，取决于"计划、安排、预测、临时决定"的区别。' },

  { id:'future-perfect', name:'将来完成时', layer:'时态·语态·情态', domain:'语法', status:'待补充', tracks:['语法'], before:['future-forms','present-perfect'],
    keywords:['future perfect','将来完成时','will have done','by next year','将来完成进行'],
    children:[
      { group:'用法', name:'将来某时前完成', desc:'By next June, I will have graduated.' },
      { group:'用法', name:'持续到将来某时', desc:'将来完成进行时 will have been doing，强调持续。' },
      { group:'标志词', name:'by + 将来时间', desc:'by 2028、by the end of this year 是典型标志。' },
      { group:'语态', name:'将来完成被动', desc:'will have been done，正式写作中偶尔出现。' },
      { group:'注意', name:'使用频率', desc:'口语中不如一般将来常用，阅读中认识即可。' }
    ],
    description:'将来完成时用来给未来设一个截止点。阅读里常见于规划、报告与承诺，写作中不要为了炫技硬用。' },

  { id:'tense-contrast', name:'时态对比与选择', layer:'时态·语态·情态', domain:'语法', status:'待补充', tracks:['语法'], before:['present-perfect','past-simple','future-forms'],
    keywords:['tense contrast','时态对比','过去时与完成时','现在完成与一般过去','时态选择'],
    children:[
      { group:'核心对比', name:'现在完成 vs 一般过去', desc:'与现在有联系 vs 明确过去时间。' },
      { group:'核心对比', name:'一般过去 vs 过去完成', desc:'过去动作 vs 更早的过去动作。' },
      { group:'核心对比', name:'一般现在 vs 现在进行', desc:'习惯与事实 vs 此刻与临时。' },
      { group:'核心对比', name:'will vs be going to', desc:'临时决定/预测 vs 计划/迹象。' },
      { group:'方法', name:'先看时间标志词', desc:'yesterday、since、by the time 等词直接指向特定时态。' },
      { group:'方法', name:'再看动作关系', desc:'动作是习惯、进行、完成还是先于另一个过去动作？' }
    ],
    description:'时态题不是背规则，而是做判断：时间标志 + 动作关系 + 与现在的联系。三者确定，答案唯一。' },

  { id:'passive-voice', name:'被动语态', layer:'时态·语态·情态', domain:'语法', status:'待补充', tracks:['语法','学术'], before:['tense-system','verbs-overview'],
    keywords:['passive voice','被动语态','be done','by','被动','学术写作','客观'],
    children:[
      { group:'形式', name:'be + 过去分词', desc:'时态体现在 be 上，主动词用过去分词。' },
      { group:'形式', name:'各时态的被动', desc:'is done、was done、has been done、will be done、is being done。' },
      { group:'用法', name:'不知道或不必说施动者', desc:'The window was broken. 谁打破的不重要。' },
      { group:'用法', name:'强调受事', desc:'把重要信息放句首：The proposal was approved by the board.' },
      { group:'用法', name:'学术与新闻的客观语气', desc:'被动能隐藏施动者，显得客观，但也可能推卸责任。' },
      { group:'限制', name:'不及物动词没有被动', desc:'happen、arrive、rise 不能变被动。' },
      { group:'易错', name:'by 短语的取舍', desc:'施动者不重要时省略 by，不要机械地补上。' }
    ],
    description:'被动语态不是"高级"，而是视角选择。学术写作需要客观时用它，但滥用会让句子没有责任主体。' },

  { id:'modal-verbs', name:'情态动词', layer:'时态·语态·情态', domain:'语法', status:'待补充', tracks:['语法'], before:['verbs-overview'],
    keywords:['modal verbs','情态动词','can could','may might','must','should','have to','推测','义务'],
    children:[
      { group:'能力与许可', name:'can / could', desc:'能力、请求、可能性；could 更委婉或表过去能力。' },
      { group:'可能性', name:'may / might', desc:'可能；might 语气更弱、更不确定。' },
      { group:'义务', name:'must / have to', desc:'must 是主观义务，have to 是外部要求；否定意义不同。' },
      { group:'建议', name:'should / ought to / had better', desc:'建议与警告，语气强度递增。' },
      { group:'意愿', name:'will / would', desc:'意愿、请求、习惯；would 更委婉。' },
      { group:'形式', name:'情态动词后接原形', desc:'没有第三人称 -s，否定直接加 not。' },
      { group:'易错', name:'mustn\'t 与 don\'t have to', desc:'mustn\'t 禁止，don\'t have to 不必。' }
    ],
    description:'情态动词表达的是"态度"：能力、许可、义务、推测。中文一个"应该"对应英语多个词，必须按语气细分。' },

  { id:'modal-perfect', name:'情态动词完成式', layer:'时态·语态·情态', domain:'语法', status:'待补充', tracks:['语法'], before:['modal-verbs','present-perfect'],
    keywords:['modal perfect','情态动词完成式','must have done','should have done','could have','推测过去'],
    children:[
      { group:'推测', name:'must have done', desc:'对过去的强推测：He must have forgotten.' },
      { group:'推测', name:'may/might have done', desc:'对过去的不确定推测。' },
      { group:'推测', name:'can\'t have done', desc:'对过去的否定推测：不可能是……。' },
      { group:'遗憾', name:'should have done', desc:'本该做却没做；shouldn\'t have done 本不该做却做了。' },
      { group:'能力', name:'could have done', desc:'本可以做却没做，或对过去能力的推测。' },
      { group:'应用', name:'听力与阅读中的态度', desc:'情态完成式常承载说话人的遗憾、责备或推断。' }
    ],
    description:'情态动词 + have done 是"对过去的评论"：推测、遗憾、责备。听力里听不出这层，就会漏掉说话人的态度。' },

  { id:'conditionals', name:'条件句', layer:'时态·语态·情态', domain:'语法', status:'待补充', tracks:['语法','思维'], before:['tense-system','modal-verbs'],
    keywords:['conditionals','条件句','if','虚拟条件','零条件','第一条件','第二条件','第三条件','mixed conditional'],
    children:[
      { group:'类型', name:'零条件句', desc:'If + 一般现在时，主句一般现在时：普遍真理。' },
      { group:'类型', name:'第一条件句', desc:'If + 一般现在时，主句 will：真实可能的未来。' },
      { group:'类型', name:'第二条件句', desc:'If + 一般过去时，主句 would：与现在事实相反或不太可能。' },
      { group:'类型', name:'第三条件句', desc:'If + had done，主句 would have done：与过去事实相反。' },
      { group:'类型', name:'混合条件句', desc:'过去条件 + 现在结果，或现在条件 + 过去结果。' },
      { group:'形式', name:'省略 if 的倒装', desc:'Were I you、Had I known、Should it rain。' },
      { group:'易错', name:'主将从现', desc:'时间/条件状语从句中，用一般现在时表将来，不用 will。' }
    ],
    description:'条件句是逻辑的语法化。四种基本类型对应"真实、可能、与现在相反、与过去相反"四种世界。' },

  { id:'subjunctive', name:'虚拟语气', layer:'时态·语态·情态', domain:'语法', status:'待补充', tracks:['语法','思维'], before:['conditionals'],
    keywords:['subjunctive','虚拟语气','wish','if only','would rather','suggest insist demand','as if'],
    children:[
      { group:'愿望', name:'wish / if only', desc:'与现在相反用过去时，与过去相反用过去完成时，将来用 would。' },
      { group:'建议要求', name:'suggest / insist / demand + (should) do', desc:'表示建议、要求、命令的从句用虚拟语气。' },
      { group:'假设', name:'as if / as though', desc:'与事实相反的假设，时态往后退一步。' },
      { group:'选择', name:'would rather + 过去时', desc:'宁愿别人做某事，用过去时表示与现在相反。' },
      { group:'固定', name:'It is time that…', desc:'从句用过去时或 should do，表示"早该做了"。' },
      { group:'易错', name:'虚拟语气的时态后退', desc:'不是所有 that 从句都要虚拟，只有特定动词与形容词。' }
    ],
    description:'虚拟语气是"说反事实"的语法。中文用"要是……就好了"表达，英语靠时态后退。' },

  { id:'reported-speech', name:'间接引语', layer:'时态·语态·情态', domain:'语法', status:'待补充', tracks:['语法','读写'], before:['tense-contrast','questions'],
    keywords:['reported speech','间接引语','时态呼应','said that','told','转述','引语'],
    children:[
      { group:'规则', name:'时态后退', desc:'主句过去时，从句时态往往往后退一步。' },
      { group:'规则', name:'代词与时间地点变化', desc:'now→then、today→that day、here→there。' },
      { group:'类型', name:'陈述句转述', desc:'said (that)、told sb (that)。' },
      { group:'类型', name:'疑问句转述', desc:'ask if/whether 或 ask wh-，用陈述语序。' },
      { group:'类型', name:'命令与请求转述', desc:'tell/ask sb to do、advise sb to do。' },
      { group:'例外', name:'不后退的情况', desc:'普遍真理、仍是事实、引语时间仍相关时可保留原时态。' }
    ],
    description:'间接引语是"把别人的话装进自己的句子"。时态后退、语序还原、时间地点转换，三个动作要同时完成。' },

  { id:'non-finite-verbs', name:'非谓语动词总览', layer:'时态·语态·情态', domain:'语法', status:'待补充', tracks:['语法'], before:['verbs-overview','clauses-overview'],
    keywords:['non-finite','非谓语','不定式','动名词','分词','to do','doing','done'],
    children:[
      { group:'类型', name:'不定式 to do', desc:'表目的、将来、具体动作。' },
      { group:'类型', name:'动名词 doing', desc:'把动作名词化，作主语、宾语或介词宾语。' },
      { group:'类型', name:'现在分词 doing', desc:'主动、进行，作定语、状语或补语。' },
      { group:'类型', name:'过去分词 done', desc:'被动、完成，作定语、状语或补语。' },
      { group:'判断', name:'逻辑主语与语态', desc:'先看非谓语的逻辑主语是谁，再判断主动还是被动。' },
      { group:'判断', name:'时间关系', desc:'不定式多指将来/目的，分词多指同时或先发生。' }
    ],
    description:'非谓语是英语句子的"压缩包"：把从句压成短语。学会非谓语，长难句和写作都会明显上一个台阶。' },

  { id:'gerund-infinitive', name:'动名词与不定式', layer:'时态·语态·情态', domain:'语法', status:'待补充', tracks:['语法'], before:['non-finite-verbs'],
    keywords:['gerund','infinitive','动名词','不定式','remember to do','remember doing','stop to do'],
    children:[
      { group:'规则', name:'只接 doing 的动词', desc:'enjoy、avoid、mind、suggest、look forward to。' },
      { group:'规则', name:'只接 to do 的动词', desc:'decide、hope、want、plan、refuse。' },
      { group:'规则', name:'两者都可但意义不同', desc:'remember/forget/stop/try/regret + to do/doing。' },
      { group:'结构', name:'介词后接 doing', desc:'be interested in doing、succeed in doing。' },
      { group:'结构', name:'不定式表目的', desc:'I went there to see him. 目的状语。' },
      { group:'易错', name:'to 是介词还是不定式', desc:'look forward to doing、be used to doing、devote to doing。' }
    ],
    description:'doing 还是 to do，取决于动词和结构。意义不同的那几组（remember/stop/try）必须按例句记。' },

  { id:'participles', name:'分词', layer:'时态·语态·情态', domain:'语法', status:'待补充', tracks:['语法','读写'], before:['non-finite-verbs'],
    keywords:['participle','分词','现在分词','过去分词','分词短语','分词作状语','独立主格'],
    children:[
      { group:'形式', name:'现在分词 -ing', desc:'主动、进行：a sleeping baby、Walking home, I saw him。' },
      { group:'形式', name:'过去分词 -ed', desc:'被动、完成：a broken window、Given more time, I would…。' },
      { group:'功能', name:'分词作定语', desc:'前置或后置修饰名词：the man standing there。' },
      { group:'功能', name:'分词作状语', desc:'时间、原因、条件、伴随：Having finished work, she left。' },
      { group:'判断', name:'逻辑主语一致', desc:'分词的逻辑主语必须与主句主语一致，否则是悬垂修饰语。' },
      { group:'进阶', name:'独立主格', desc:'分词自带逻辑主语：Weather permitting, we will go。' }
    ],
    description:'分词让句子更紧凑，也最容易写出悬垂修饰语。判断口诀：分词的动作是谁做的？' },

  { id:'causative', name:'使役结构', layer:'时态·语态·情态', domain:'语法', status:'待补充', tracks:['语法'], before:['verbs-overview','passive-voice'],
    keywords:['causative','使役','make let have get','have something done','get someone to do'],
    children:[
      { group:'形式', name:'make / let + 动词原形', desc:'make him go、let me try，不带 to。' },
      { group:'形式', name:'have / get + 宾语 + 过去分词', desc:'have my hair cut、get the work done，表示"让别人做"。' },
      { group:'形式', name:'get + 宾语 + to do', desc:'get him to help，说服某人做某事。' },
      { group:'形式', name:'help + (to) do', desc:'help me (to) carry，to 可省略。' },
      { group:'语义', name:'使役与责任', desc:'have sth done 不一定说明谁做，但说明"你安排/承受"了这件事。' }
    ],
    description:'使役结构是"让别人做事"的语法。have sth done 和 get sb to do 的区别，在写作和口语里都很实用。' },

  { id:'verb-patterns', name:'动词句型', layer:'时态·语态·情态', domain:'语法', status:'待补充', tracks:['语法'], before:['gerund-infinitive'],
    keywords:['verb patterns','动词句型','verb + to do','verb + doing','verb + that','双宾语'],
    children:[
      { group:'模式', name:'动词 + to do', desc:'want to go、decide to leave。' },
      { group:'模式', name:'动词 + doing', desc:'enjoy reading、avoid making mistakes。' },
      { group:'模式', name:'动词 + sb + to do', desc:'ask/tell/advise/want sb to do。' },
      { group:'模式', name:'动词 + that 从句', desc:'say、think、believe、suggest + that 从句。' },
      { group:'模式', name:'双宾语动词', desc:'give/send/show/tell sb sth，可转为 to/for 结构。' },
      { group:'应用', name:'查词典看句型', desc:'词典里的 [V to inf]、[V -ing] 标记比中文释义更重要。' }
    ],
    description:'动词决定后面接什么。背单词时如果不背句型，写作时就会出现 want doing、enjoy to do 这类错误。' },

  { id:'stative-dynamic', name:'状态动词与动态动词', layer:'时态·语态·情态', domain:'语法', status:'待补充', tracks:['语法'], before:['present-continuous','verbs-overview'],
    keywords:['stative verbs','状态动词','动态动词','进行时限制','know','belong','have'],
    children:[
      { group:'概念', name:'状态动词', desc:'know、believe、belong、contain、seem，通常不用进行时。' },
      { group:'概念', name:'动态动词', desc:'run、eat、write、change，可以用于进行时。' },
      { group:'变化', name:'同一个词两种用法', desc:'have a car（状态）vs have lunch（动作）；think 认为 vs 正在思考。' },
      { group:'例外', name:'口语与广告中的破例', desc:'I\'m loving it 这类表达在广告口语里成立。' },
      { group:'应用', name:'避免进行时误用', desc:'I am knowing、She is belonging 是典型错误。' }
    ],
    description:'状态动词的限制是进行时的暗礁。判断标准不是词表，而是"这个动作能不能有过程"。' },

  /* ==================== 从句与复杂句 ==================== */

  { id:'clauses-overview', name:'从句总览', layer:'从句与复杂句', domain:'语法', status:'待补充', tracks:['语法'], before:['sentence-patterns','conjunctions'],
    keywords:['clauses','从句','主句','从句类型','名词性从句','定语从句','状语从句','finite'],
    children:[
      { group:'概念', name:'主句与从句', desc:'主句能独立成句，从句不能独立。' },
      { group:'类型', name:'名词性从句', desc:'在句中充当主语、宾语、表语、同位语。' },
      { group:'类型', name:'定语从句', desc:'修饰名词或代词，相当于形容词。' },
      { group:'类型', name:'状语从句', desc:'表达时间、原因、条件、让步等逻辑关系。' },
      { group:'形式', name:'限定从句与非限定从句', desc:'有谓语动词的限定从句 vs 非谓语简化后的短语。' },
      { group:'应用', name:'先判断从句做什么成分', desc:'从句类型由它在主句中的功能决定，不由引导词决定。' }
    ],
    description:'从句不是"长句子"，而是"在主句里当某个成分的小句子"。先判断功能，再选引导词。' },

  { id:'noun-clauses', name:'名词性从句', layer:'从句与复杂句', domain:'语法', status:'待补充', tracks:['语法','读写'], before:['clauses-overview'],
    keywords:['noun clauses','名词性从句','主语从句','宾语从句','表语从句','同位语从句','that whether'],
    children:[
      { group:'类型', name:'主语从句', desc:'What he said is true. / It is important that…。' },
      { group:'类型', name:'宾语从句', desc:'I think that…、I wonder whether…，用陈述语序。' },
      { group:'类型', name:'表语从句', desc:'The problem is that we have no time.。' },
      { group:'类型', name:'同位语从句', desc:'The news that he won… 解释 news 的内容。' },
      { group:'引导词', name:'that 的取舍', desc:'宾语从句可省 that，主语从句与同位语从句通常保留。' },
      { group:'引导词', name:'whether 与 if', desc:'介词后、句首主语从句、与 or not 连用时用 whether。' },
      { group:'易错', name:'从句用陈述语序', desc:'I don\'t know where he is，不是 where is he。' }
    ],
    description:'名词性从句是把一整句话当名词用。语序必须是陈述语序，这一点和疑问句正好相反。' },

  { id:'relative-clauses', name:'定语从句', layer:'从句与复杂句', domain:'语法', status:'待补充', tracks:['语法','读写'], before:['clauses-overview','pronouns'],
    keywords:['relative clauses','定语从句','关系代词','限制性','非限制性','who which that','whose'],
    children:[
      { group:'基础', name:'关系代词的选择', desc:'who 指人、which 指物、that 通用、whose 表所属。' },
      { group:'基础', name:'限制性与非限制性', desc:'限制性不可省，非限制性用逗号隔开，补充信息。' },
      { group:'基础', name:'关系副词', desc:'where 地点、when 时间、why 原因，等于介词 + which。' },
      { group:'进阶', name:'介词 + which/whom', desc:'the city in which I was born。' },
      { group:'进阶', name:'whose 的用法', desc:'whose 既可指人也可指物：a house whose roof is red。' },
      { group:'进阶', name:'as 引导的定语从句', desc:'such…as、the same…as、as is known to all。' },
      { group:'易错', name:'that 不能用于非限制性', desc:'逗号后的定语从句不能用 that。' }
    ],
    description:'定语从句是英语长句的第一大来源。中文习惯把定语放前面，英语必须后置，这是思维方式的差异。' },

  { id:'relative-advanced', name:'定语从句进阶', layer:'从句与复杂句', domain:'语法', status:'待补充', tracks:['语法','读写'], before:['relative-clauses'],
    keywords:['relative clause advanced','定语从句进阶','介词加关系代词','sentential which','as','whose'],
    children:[
      { group:'结构', name:'介词 + 关系代词', desc:'in which、on which、for whom，介词由从句中的搭配决定。' },
      { group:'结构', name:'关系代词省略', desc:'作宾语时可省略：the book (that) I bought。' },
      { group:'结构', name:'which 指代整句', desc:'He passed the exam, which surprised us. 非限制性 which 指代前文整句。' },
      { group:'结构', name:'there be 与定语从句', desc:'the only one that…、the first thing that…。' },
      { group:'应用', name:'拆分长定语', desc:'写作时把过长的定语从句拆成独立句，避免头重脚轻。' }
    ],
    description:'定语从句进阶的关键是"介词从哪来"和"which 指代什么"。这两个判断清楚了，长句就不再可怕。' },

  { id:'adverbial-clauses', name:'状语从句', layer:'从句与复杂句', domain:'语法', status:'待补充', tracks:['语法','读写'], before:['clauses-overview','conjunctions'],
    keywords:['adverbial clauses','状语从句','时间','原因','条件','让步','目的','结果','比较'],
    children:[
      { group:'时间', name:'when / while / as / before / after / until', desc:'按动作先后与持续关系选择。' },
      { group:'原因', name:'because / since / as / now that', desc:'语气与正式度略有差异。' },
      { group:'条件', name:'if / unless / as long as / provided that', desc:'真实条件与非真实条件。' },
      { group:'让步', name:'although / though / even though / while', desc:'表示"尽管如此"，不能与 but 连用。' },
      { group:'目的与结果', name:'so that / in order that / so…that / such…that', desc:'目的与结果结构要区分。' },
      { group:'比较', name:'than / as…as / the more…the more', desc:'比较状语从句与比较级结构。' },
      { group:'易错', name:'主将从现', desc:'时间和条件状语从句中，将来用一般现在时表示。' }
    ],
    description:'状语从句是逻辑关系的载体。写作时先想清楚是时间、原因、条件还是让步，再选连接词。' },

  { id:'clause-reduction', name:'从句简化', layer:'从句与复杂句', domain:'语法', status:'待补充', tracks:['语法','读写'], before:['adverbial-clauses','non-finite-verbs'],
    keywords:['clause reduction','从句简化','分词短语','不定式短语','省略主语','reduced clause'],
    children:[
      { group:'方法', name:'状语从句改分词短语', desc:'Because he was tired, he went to bed → Being tired, he went to bed。' },
      { group:'方法', name:'定语从句改分词短语', desc:'the man who is standing there → the man standing there。' },
      { group:'方法', name:'定语从句改不定式', desc:'the first person who came → the first person to come。' },
      { group:'方法', name:'名词性从句改短语', desc:'What he said surprised us → His words surprised us。' },
      { group:'注意', name:'逻辑主语必须一致', desc:'简化后分词的逻辑主语要与主句主语一致。' },
      { group:'应用', name:'写作紧凑化', desc:'把冗长从句压成短语，句子更紧凑、更正式。' }
    ],
    description:'从句简化是写作提分的重要技巧：意思不变，句子更紧凑。前提是逻辑主语清楚。' },

  { id:'long-sentence-analysis', name:'长难句分析', layer:'从句与复杂句', domain:'语法', status:'待补充', tracks:['语法','读写','考试'], before:['relative-clauses','adverbial-clauses','noun-clauses'],
    keywords:['long sentence','长难句','拆句','主干','修饰','考研长难句','阅读'],
    children:[
      { group:'步骤', name:'先找主干', desc:'跳过修饰，先找主语、谓语、宾语。' },
      { group:'步骤', name:'识别从句边界', desc:'看引导词与标点，把从句括起来。' },
      { group:'步骤', name:'识别非谓语', desc:'to do、doing、done 引导的短语多为修饰或补充。' },
      { group:'步骤', name:'处理插入语与同位语', desc:'破折号、逗号之间的补充信息先剥离。' },
      { group:'练习', name:'逐句画结构', desc:'用括号与箭头标出主干和修饰关系。' },
      { group:'应用', name:'阅读与翻译', desc:'长难句拆得开，阅读速度和翻译准确度都会提升。' }
    ],
    description:'长难句不是"单词不认识"，而是"结构没拆开"。先主干、后从句、再非谓语，是稳定的拆句顺序。' },

  { id:'parallelism', name:'平行结构', layer:'从句与复杂句', domain:'语法', status:'待补充', tracks:['语法','读写','学术'], before:['sentence-patterns'],
    keywords:['parallelism','平行结构','并列','排比','not only but also','一致'],
    children:[
      { group:'原则', name:'并列成分形式一致', desc:'名词对名词、动词对动词、从句对从句。' },
      { group:'结构', name:'and/or/but 连接', desc:'I like reading, swimming, and hiking。' },
      { group:'结构', name:'not only…but also', desc:'两边结构必须对称。' },
      { group:'结构', name:'比较结构中的平行', desc:'as…as、than 两边成分要对等。' },
      { group:'应用', name:'写作节奏与说服力', desc:'平行结构让句子更有节奏，也更有力量。' }
    ],
    description:'平行结构是写作的"整齐感"来源。中国学习者常在列举时混用词性，读起来就别扭。' },

  { id:'modifier-placement', name:'修饰语位置与歧义', layer:'从句与复杂句', domain:'语法', status:'待补充', tracks:['语法','读写'], before:['adjectives','adverbs'],
    keywords:['modifier','修饰语','位置','歧义','悬垂修饰','misplaced modifier','dangling'],
    children:[
      { group:'原则', name:'修饰语靠近被修饰对象', desc:'位置越近，修饰关系越明确。' },
      { group:'问题', name:'修饰语错位', desc:'She served cake to the children on paper plates. 纸盘是谁的？' },
      { group:'问题', name:'悬垂修饰语', desc:'Walking home, the rain started. 走路的人不是雨。' },
      { group:'问题', name:'only 的位置', desc:'Only I saw him 与 I only saw him 意义不同。' },
      { group:'方法', name:'写作后检查', desc:'逐个修饰语问：它到底修饰谁？' }
    ],
    description:'修饰语放错位置，句子就会歧义甚至闹笑话。悬垂修饰语是中国学习者写作中的高频错误。' },

  { id:'appositives', name:'同位语', layer:'从句与复杂句', domain:'语法', status:'待补充', tracks:['语法','读写'], before:['sentence-elements'],
    keywords:['appositive','同位语','同位语从句','解释说明','逗号','破折号'],
    children:[
      { group:'形式', name:'名词同位语', desc:'My friend Tom、the capital of France, Paris。' },
      { group:'形式', name:'同位语从句', desc:'The idea that we should leave early was accepted。' },
      { group:'标点', name:'逗号与破折号', desc:'非限制性同位语用逗号或破折号隔开。' },
      { group:'应用', name:'补充信息', desc:'同位语能在不另起一句的情况下补充解释。' }
    ],
    description:'同位语是"给名词贴标签"的结构。用得好，信息密度高；用不好，句子会变得拥挤。' },

  { id:'absolute-construction', name:'独立主格', layer:'从句与复杂句', domain:'语法', status:'待补充', tracks:['语法','读写','文学'], before:['participles'],
    keywords:['absolute construction','独立主格','独立结构','weather permitting','with 结构'],
    children:[
      { group:'形式', name:'名词 + 分词', desc:'Weather permitting, we will go. The work done, we went home。' },
      { group:'形式', name:'with + 宾语 + 分词/形容词', desc:'With the door open, he slept. With prices rising, people worry。' },
      { group:'功能', name:'状语作用', desc:'表时间、原因、条件、伴随。' },
      { group:'应用', name:'书面语与文学', desc:'独立主格让句子紧凑有画面感，适合书面叙事。' },
      { group:'注意', name:'不要过度使用', desc:'口语中少用，写作中一篇一两处即可。' }
    ],
    description:'独立主格是"自带主语的分词短语"，书面语色彩强。阅读中认识即可，写作中谨慎使用。' },

  { id:'embedding', name:'嵌套结构', layer:'从句与复杂句', domain:'语法', status:'待补充', tracks:['语法','读写','思维'], before:['noun-clauses','relative-clauses','adverbial-clauses'],
    keywords:['embedding','嵌套','从句套从句','recursion','复杂句','多层修饰'],
    children:[
      { group:'概念', name:'从句套从句', desc:'一个从句内部再包含另一个从句。' },
      { group:'示例', name:'宾语从句 + 定语从句', desc:'I think that the book which you lent me is useful。' },
      { group:'示例', name:'状语从句 + 名词性从句', desc:'Although what he said was true, nobody believed him。' },
      { group:'原则', name:'一层一层拆', desc:'从最外层主干开始，逐层向内。' },
      { group:'写作', name:'控制嵌套层数', desc:'超过两三层就该拆句，否则读者会迷路。' }
    ],
    description:'嵌套是复杂句的本质。阅读要会逐层拆，写作要克制层数：复杂不等于堆叠。' },

  { id:'complexity-style', name:'复杂句写作策略', layer:'从句与复杂句', domain:'写作', status:'待补充', tracks:['语法','读写','学术'], before:['embedding','clause-reduction','parallelism'],
    keywords:['complex sentence','复杂句写作','句式变化','长短句','subordination','coordination'],
    children:[
      { group:'策略', name:'主从结合', desc:'用从句表达逻辑关系，而不是全部用 and 连接。' },
      { group:'策略', name:'长短句交替', desc:'长句展开论证，短句强调结论。' },
      { group:'策略', name:'避免头重脚轻', desc:'主语过长时改用形式主语或拆句。' },
      { group:'策略', name:'控制从句数量', desc:'一句话一个核心关系，不要把五个逻辑塞进一句。' },
      { group:'检查', name:'朗读检验', desc:'读不顺的地方，通常就是句子结构出了问题。' }
    ],
    description:'复杂句的目标是"清楚"，不是"长"。真正的高手用长短句配合节奏，而不是每句都套三层从句。' },

  { id:'punctuation-clauses', name:'标点与从句', layer:'从句与复杂句', domain:'语法', status:'待补充', tracks:['语法','读写'], before:['clauses-overview','punctuation'],
    keywords:['punctuation clauses','标点与从句','逗号','分号','冒号','非限制性从句','逗号 splice'],
    children:[
      { group:'逗号', name:'非限制性从句用逗号', desc:'My brother, who lives in London, is a doctor。' },
      { group:'逗号', name:'状语从句位置', desc:'从句在前通常加逗号，在后可不加。' },
      { group:'分号', name:'连接两个完整句', desc:'分号连接关系紧密但独立的两个句子。' },
      { group:'冒号', name:'引出解释或列举', desc:'冒号前必须是完整句。' },
      { group:'错误', name:'逗号粘连', desc:'两个完整句不能只用逗号连接，需要连词或分号。' },
      { group:'错误', name:'限制性从句不加逗号', desc:'加逗号会改变限制性/非限制性的意义。' }
    ],
    description:'标点不是装饰，它标记句子结构。逗号粘连和限制性从句乱加逗号，是写作中最常见的结构错误。' }

]);
