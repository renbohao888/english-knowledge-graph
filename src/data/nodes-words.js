/* ============================================================
 * 知识点数据：构词与词源 / 词汇与语义
 * ============================================================ */
window.KB = window.KB || {};
window.KB.NODES = (window.KB.NODES || []).concat([

  /* ==================== 构词与词源 ==================== */

  { id:'morpheme', name:'语素与词素', layer:'构词与词源', domain:'词汇', status:'待补充', tracks:['词汇'], before:['syllable'],
    keywords:['morpheme','语素','词素','自由语素','粘着语素','词根','词缀','free morpheme'],
    children:[
      { group:'概念', name:'语素是什么', desc:'语言中能独立表义的最小单位，比单词更小。' },
      { group:'分类', name:'自由语素', desc:'可以独立成词：book、run、happy。' },
      { group:'分类', name:'粘着语素', desc:'必须依附词根：-s、-ed、un-、-ness。' },
      { group:'分类', name:'词根与词缀', desc:'词根承载核心意义，词缀提供语法或附加意义。' },
      { group:'应用', name:'拆词阅读', desc:'遇到生词先拆语素，猜出大致方向，再查词典确认。' }
    ],
    description:'语素是构词的最小积木。掌握"词根 + 词缀"的拆法，词汇量会从线性增长变成指数增长。' },

  { id:'roots-latin', name:'拉丁词根', layer:'构词与词源', domain:'词汇', status:'待补充', tracks:['词汇','学术'], before:['morpheme'],
    keywords:['latin roots','拉丁词根','spect','port','dict','duc','form','struct','词根'],
    children:[
      { group:'高频', name:'spect / spic 看', desc:'inspect、respect、spectator、conspicuous。' },
      { group:'高频', name:'port 携带', desc:'transport、import、export、portable、support。' },
      { group:'高频', name:'dict 说', desc:'dictate、predict、contradict、dictionary。' },
      { group:'高频', name:'duc / duct 引导', desc:'produce、reduce、conduct、introduce。' },
      { group:'高频', name:'form 形状', desc:'reform、transform、uniform、formulate。' },
      { group:'高频', name:'struct 建造', desc:'structure、construct、instruct、destruction。' },
      { group:'高频', name:'scrib / script 写', desc:'describe、prescribe、manuscript、subscribe。' },
      { group:'方法', name:'一词根一串词', desc:'按词根成组记，比按字母顺序背词效率高数倍。' }
    ],
    description:'拉丁词根覆盖学术、商务与考试词汇的大半。把 spect、port、dict 这类高频词根吃透，长词立刻变得透明。' },

  { id:'roots-greek', name:'希腊词根', layer:'构词与词源', domain:'词汇', status:'待补充', tracks:['词汇','学术'], before:['morpheme'],
    keywords:['greek roots','希腊词根','phon','graph','logy','bio','geo','psych','chron','科技词汇'],
    children:[
      { group:'高频', name:'phon 声音', desc:'phone、phonetics、symphony、microphone。' },
      { group:'高频', name:'graph / gram 写、画', desc:'graph、photograph、grammar、diagram。' },
      { group:'高频', name:'log / logy 学科、说', desc:'biology、psychology、dialogue、logic。' },
      { group:'高频', name:'bio 生命', desc:'biology、biography、antibiotic、biosphere。' },
      { group:'高频', name:'geo 地球', desc:'geography、geology、geometry、geopolitics。' },
      { group:'高频', name:'psych 心灵', desc:'psychology、psychiatry、psychic。' },
      { group:'高频', name:'chron 时间', desc:'chronology、chronic、synchronize、anachronism。' },
      { group:'应用', name:'科技与学术词汇', desc:'医学、科学、哲学词汇大量由希腊词根构成。' }
    ],
    description:'希腊词根是科技与学术英语的骨架。看到 -ology、-graph、-phon- 就知道大概在说什么领域。' },

  { id:'prefixes', name:'前缀', layer:'构词与词源', domain:'词汇', status:'待补充', tracks:['词汇','学术'], before:['morpheme'],
    keywords:['prefix','前缀','否定前缀','un in im dis','re pre post','sub super','数字前缀'],
    children:[
      { group:'否定', name:'un- / in- / im- / il- / ir-', desc:'unhappy、invisible、impossible、illegal、irregular。' },
      { group:'否定', name:'dis- / non- / mis-', desc:'disagree、nonsense、misunderstand。' },
      { group:'方向', name:'re- / pre- / post-', desc:'return、preview、postpone：再次、之前、之后。' },
      { group:'方向', name:'sub- / super- / trans-', desc:'subway、supermarket、transport：下、上、跨越。' },
      { group:'数量', name:'mono- / bi- / tri- / multi-', desc:'monopoly、bilingual、triangle、multimedia。' },
      { group:'程度', name:'over- / under- / hyper-', desc:'overwork、underestimate、hyperactive。' },
      { group:'应用', name:'前缀不改变词性', desc:'前缀主要改变词义，后缀才常改变词性。' }
    ],
    description:'前缀负责"改意思"，多数不改变词性。否定前缀最有价值：认识一个 un-，等于解锁成百上千个反义词。' },

  { id:'suffixes', name:'后缀', layer:'构词与词源', domain:'词汇', status:'待补充', tracks:['词汇','语法'], before:['morpheme'],
    keywords:['suffix','后缀','名词后缀','形容词后缀','动词后缀','副词后缀','-tion','-ness','-able','-ly'],
    children:[
      { group:'名词', name:'-tion / -sion / -ment / -ness', desc:'creation、decision、development、happiness。' },
      { group:'名词', name:'-er / -or / -ist / -ism', desc:'teacher、actor、artist、capitalism：人、职业、主义。' },
      { group:'形容词', name:'-able / -ful / -less / -ous', desc:'comfortable、useful、hopeless、dangerous。' },
      { group:'形容词', name:'-ive / -al / -ic / -ly', desc:'active、natural、economic、friendly。' },
      { group:'动词', name:'-ize / -ify / -en', desc:'modernize、simplify、strengthen。' },
      { group:'副词', name:'-ly', desc:'quickly、carefully、frankly；但 friendly、lovely 是形容词。' },
      { group:'应用', name:'后缀决定词性', desc:'写作时先把词性想清楚，再选后缀，避免 create/creation 混用。' }
    ],
    description:'后缀决定词性，是语法与词汇的接口。词性用错，多半是后缀没选对。' },

  { id:'word-formation', name:'构词法', layer:'构词与词源', domain:'词汇', status:'待补充', tracks:['词汇','语法'], before:['prefixes','suffixes'],
    keywords:['word formation','构词法','派生','合成','转化','混成','截短','首字母缩略','borrowing'],
    children:[
      { group:'主要方式', name:'派生 derivation', desc:'词根加词缀造新词：happy→unhappiness。' },
      { group:'主要方式', name:'合成 compounding', desc:'两个独立词合并：blackboard、sunflower、well-known。' },
      { group:'主要方式', name:'转化 conversion', desc:'词性转换不改变拼写：book a ticket、water the plants。' },
      { group:'次要方式', name:'混成 blending', desc:'smoke + fog = smog，breakfast + lunch = brunch。' },
      { group:'次要方式', name:'截短 clipping', desc:'advertisement→ad，laboratory→lab，influencer→influencer。' },
      { group:'次要方式', name:'首字母缩略 acronym', desc:'NASA、AIDS、FAQ；按词读还是按字母读。' },
      { group:'次要方式', name:'逆构词与借词', desc:'edit 来自 editor；英语从法语、拉丁语、汉语大量借词。' }
    ],
    description:'英语每年都在造新词。认识构词方式，才能理解没见过的词，也能自己造出可被理解的表达。' },

  { id:'inflection', name:'屈折变化', layer:'构词与词源', domain:'语法', status:'待补充', tracks:['语法','词汇'], before:['suffixes'],
    keywords:['inflection','屈折变化','复数','过去式','比较级','所有格','词形变化','-s -ed -ing'],
    children:[
      { group:'名词', name:'复数变化', desc:'规则 -s/-es、不规则 man→men、child→children、单复数同形 sheep。' },
      { group:'名词', name:'所有格', desc:'\'s 与 of 结构，以及复数名词的所有格写法。' },
      { group:'动词', name:'时态与分词', desc:'-s、-ed、-ing、不规则动词三态。' },
      { group:'形容词', name:'比较级与最高级', desc:'-er/-est 与 more/most 的选择，以及不规则 good→better→best。' },
      { group:'概念', name:'屈折 vs 派生', desc:'屈折只改变语法形式，不产生新词；派生产生新词。' }
    ],
    description:'屈折变化是语法形式，不是新词。中国学习者常在第三人称单数、过去式和不规则动词上丢分。' },

  { id:'etymology', name:'词源与英语史', layer:'构词与词源', domain:'文化', status:'待补充', tracks:['词汇','文化'], before:['morpheme'],
    keywords:['etymology','词源','英语史','old english','norman','拉丁借词','history of english'],
    children:[
      { group:'历史', name:'古英语', desc:'日耳曼语底子：house、water、man、wife 等核心词。' },
      { group:'历史', name:'维京与古诺斯语', desc:'sky、egg、they、them 等来自北欧入侵者。' },
      { group:'历史', name:'诺曼征服与法语', desc:'1066 年后大量法语词进入：government、justice、beef。' },
      { group:'历史', name:'拉丁与希腊借词', desc:'文艺复兴与科学革命带来学术词汇：data、method、analysis。' },
      { group:'历史', name:'现代英语与全球化', desc:'殖民、贸易、科技持续造词，英语成为全球借词最多的语言之一。' },
      { group:'应用', name:'词源辅助记忆', desc:'知道词从哪来，拼写、词义和搭配都会变得有逻辑。' }
    ],
    description:'英语是"三层词汇"叠起来的：日耳曼日常词、法语正式词、拉丁希腊学术词。了解来源，才能理解语域差异。' },

  { id:'word-families', name:'词族与派生词', layer:'构词与词源', domain:'词汇', status:'待补充', tracks:['词汇'], before:['word-formation'],
    keywords:['word family','词族','派生词','同根词','act action active','economy economic'],
    children:[
      { group:'概念', name:'什么是词族', desc:'同一词根派生出的名词、动词、形容词、副词整组。' },
      { group:'示例', name:'act 词族', desc:'act、action、active、activity、actor、react、reaction。' },
      { group:'示例', name:'economy 词族', desc:'economy、economic、economical、economist、economize。' },
      { group:'示例', name:'succeed 词族', desc:'succeed、success、successful、successfully。' },
      { group:'应用', name:'写作换词', desc:'同一词族里按词性选词，避免一个词用到底。' },
      { group:'应用', name:'阅读猜词', desc:'认识词族中的一员，就能猜出其他成员的大致意思。' }
    ],
    description:'背单词要背"一族"，不是背"一个"。词族掌握后，写作选词和阅读猜词都会顺很多。' },

  { id:'academic-roots', name:'学术词根与后缀', layer:'构词与词源', domain:'词汇', status:'待补充', tracks:['学术','词汇'], before:['roots-latin','roots-greek','suffixes'],
    keywords:['academic roots','学术词根','-ology','-ism','-tion','-ity','-ous','学术词汇'],
    children:[
      { group:'学科', name:'-ology / -ics / -ry', desc:'biology、economics、chemistry：学科名称。' },
      { group:'抽象名词', name:'-tion / -ity / -ism / -ment', desc:'information、possibility、capitalism、development。' },
      { group:'性质', name:'-ous / -al / -ive / -ic', desc:'dangerous、natural、effective、scientific。' },
      { group:'过程', name:'-ize / -ify / -ate', desc:'standardize、classify、activate：使……化。' },
      { group:'否定', name:'a- / an- / non- / anti-', desc:'atypical、anonymous、nonfiction、antibody。' },
      { group:'应用', name:'学术写作选词', desc:'学术写作偏好拉丁来源的正式词，而不是短语动词。' }
    ],
    description:'学术英语有一套自己的构词偏好。掌握这些后缀，读论文和写论文都会少查很多词。' },

  { id:'loanwords', name:'外来词', layer:'构词与词源', domain:'文化', status:'待补充', tracks:['词汇','文化'], before:['etymology'],
    keywords:['loanwords','外来词','借词','法语借词','中文借词','taco','sushi','typhoon','功夫'],
    children:[
      { group:'来源', name:'法语借词', desc:'restaurant、ballet、genre、cliché、déjà vu。' },
      { group:'来源', name:'拉丁与希腊借词', desc:'agenda、data、formula、crisis、phenomenon。' },
      { group:'来源', name:'阿拉伯语借词', desc:'algebra、algorithm、sugar、coffee、alcohol。' },
      { group:'来源', name:'汉语与日语借词', desc:'tea、typhoon、kung fu、tofu；karate、sushi、tsunami。' },
      { group:'来源', name:'其他语言', desc:'意大利语 pizza、西班牙语 taco、印地语 yoga、德语 kindergarten。' },
      { group:'应用', name:'复数与发音', desc:'外来词保留原语言复数（crisis→crises）或已英语化（formulas）。' }
    ],
    description:'英语的开放性是它词汇量巨大的原因。外来词让英语更丰富，也让拼写和复数更不规则。' },

  { id:'false-friends', name:'假朋友与易混词', layer:'构词与词源', domain:'词汇', status:'待补充', tracks:['词汇','翻译'], before:['etymology','word-meaning'],
    keywords:['false friends','假朋友','易混词','actual','eventually','sensible','economic economical'],
    children:[
      { group:'跨语言', name:'actual / eventually', desc:'actual 是"实际的"不是"当前的"；eventually 是"最终"不是"可能"。' },
      { group:'跨语言', name:'sensible / sensitive', desc:'sensible 明智，sensitive 敏感，中文都译"敏感"时容易混。' },
      { group:'跨语言', name:'economic / economical', desc:'economic 经济的，economical 省钱的经济实惠。' },
      { group:'同语言', name:'affect / effect', desc:'动词影响 vs 名词效果。' },
      { group:'同语言', name:'adapt / adopt / adept', desc:'适应、采用、熟练，拼写接近但意义不同。' },
      { group:'同语言', name:'principal / principle', desc:'校长/主要的 vs 原则。' }
    ],
    description:'假朋友是翻译与写作的隐形地雷。建立个人易混词表，比泛背同义词更防错。' },

  { id:'word-analysis', name:'长词拆解', layer:'构词与词源', domain:'词汇', status:'待补充', tracks:['词汇','方法','学术'], before:['prefixes','suffixes','roots-latin'],
    keywords:['word analysis','长词拆解','拆词','词根词缀','猜词','unbelievable','international'],
    children:[
      { group:'步骤', name:'先找后缀定词性', desc:'-tion 名词、-able 形容词、-ize 动词，先判断词性。' },
      { group:'步骤', name:'再找前缀定方向', desc:'un-、re-、pre- 等给出否定、重复、时间方向。' },
      { group:'步骤', name:'最后锁定词根', desc:'词根给出核心意义，结合语境确定具体含义。' },
      { group:'示例', name:'internationalization', desc:'inter + nation + al + iz + ation：跨国 + 国家 + 形容词 + 动词化 + 名词化。' },
      { group:'示例', name:'unbelievable', desc:'un + believe + able：不 + 相信 + 可……的。' },
      { group:'边界', name:'不能过度拆解', desc:'有些词的历史形态已不可分析，拆错反而误导，最终仍要查词典。' }
    ],
    description:'拆词是阅读猜词的第一反应。按"后缀→前缀→词根"的顺序拆，比从左往右瞎猜准确得多。' },

  /* ==================== 词汇与语义 ==================== */

  { id:'word-meaning', name:'词义与多义', layer:'词汇与语义', domain:'词汇', status:'待补充', tracks:['词汇'], before:['morpheme'],
    keywords:['word meaning','词义','多义词','polysemy','语境','context','熟词僻义'],
    children:[
      { group:'概念', name:'本义与引申义', desc:'一个词从核心意义扩展出多个相关意义。' },
      { group:'概念', name:'多义词 polysemy', desc:'bank 河岸/银行，run 跑/经营/运行。' },
      { group:'概念', name:'熟词僻义', desc:'考试常考：address 处理、appreciate 意识到、subject to 易受。' },
      { group:'方法', name:'语境定词义', desc:'先看搭配和句子逻辑，再决定用哪个义项。' },
      { group:'方法', name:'查词典看义项顺序', desc:'高频义项通常在前，但考试语境可能取后面的义项。' }
    ],
    description:'"背过这个词"不等于"知道它在这句话里的意思"。词义由语境决定，多义词必须结合搭配判断。' },

  { id:'denotation-connotation', name:'外延与内涵', layer:'词汇与语义', domain:'词汇', status:'待补充', tracks:['词汇','读写'], before:['word-meaning'],
    keywords:['denotation','connotation','外延','内涵','褒贬','感情色彩','thin slim skinny'],
    children:[
      { group:'概念', name:'外延 denotation', desc:'词的字面意义，词典里的客观定义。' },
      { group:'概念', name:'内涵 connotation', desc:'词附带的感情、态度、文化联想。' },
      { group:'示例', name:'thin / slim / skinny', desc:'中性瘦、褒义苗条、贬义皮包骨。' },
      { group:'示例', name:'cheap / affordable / inexpensive', desc:'廉价贬义、负担得起、价格不高。' },
      { group:'应用', name:'写作选词的温度', desc:'同义词替换前先判断褒贬，别把褒义写成贬义。' }
    ],
    description:'同义词不是等号。外延相同、内涵不同，写作的立场和语气就完全不同。' },

  { id:'synonyms', name:'同义词辨析', layer:'词汇与语义', domain:'词汇', status:'待补充', tracks:['词汇','读写'], before:['word-meaning'],
    keywords:['synonyms','同义词','辨析','近义词','say tell speak talk','big large great'],
    children:[
      { group:'辨析维度', name:'语义强度', desc:'warm / hot / boiling，程度不同。' },
      { group:'辨析维度', name:'搭配限制', desc:'make a decision，不说 do a decision。' },
      { group:'辨析维度', name:'语域正式度', desc:'ask / request / inquire，正式程度递增。' },
      { group:'辨析维度', name:'及物与句型', desc:'say sth、tell sb sth、speak to sb，句型不同。' },
      { group:'示例', name:'看/说/做高频组', desc:'look/see/watch；say/tell/speak/talk；do/make。' },
      { group:'方法', name:'查同义词词典看例句', desc:'用例句和搭配区分，而不是只看中文释义。' }
    ],
    description:'同义词辨析要看四个维度：强度、搭配、语域、句型。只背中文意思，写作时一定用错。' },

  { id:'antonyms', name:'反义词', layer:'词汇与语义', domain:'词汇', status:'待补充', tracks:['词汇'], before:['synonyms'],
    keywords:['antonyms','反义词','对立','gradable','complementary','relational','前缀否定'],
    children:[
      { group:'类型', name:'等级反义', desc:'hot/cold、big/small，中间有过渡。' },
      { group:'类型', name:'互补反义', desc:'alive/dead、true/false，非此即彼。' },
      { group:'类型', name:'关系反义', desc:'buy/sell、teacher/student，互为关系。' },
      { group:'构词', name:'前缀构成反义', desc:'un-、in-、dis-、non- 构成的反义词。' },
      { group:'应用', name:'写作对比', desc:'用反义词建立对比，让论证更清楚。' }
    ],
    description:'反义词不只是"意思相反"，还分等级、互补、关系三类。写作中的对比论证靠它撑起来。' },

  { id:'collocations', name:'搭配', layer:'词汇与语义', domain:'词汇', status:'待补充', tracks:['词汇','读写'], before:['word-meaning','parts-of-speech'],
    keywords:['collocation','搭配','固定搭配','动名搭配','形名搭配','介词搭配','make do'],
    children:[
      { group:'类型', name:'动词+名词', desc:'make a decision、take a shower、pay attention。' },
      { group:'类型', name:'形容词+名词', desc:'heavy rain、strong coffee、high price。' },
      { group:'类型', name:'动词/形容词+介词', desc:'depend on、interested in、afraid of。' },
      { group:'类型', name:'副词+形容词/动词', desc:'highly likely、deeply concerned、strongly recommend。' },
      { group:'方法', name:'整块记忆', desc:'把搭配当作一个词块记，不要拆成单词逐个翻译。' },
      { group:'方法', name:'语料库验证', desc:'拿不准时查语料库或词典例句，看母语者怎么说。' }
    ],
    description:'搭配是"地道"的核心。语法全对但搭配不对，读起来就是中式英语。' },

  { id:'idioms', name:'习语', layer:'词汇与语义', domain:'词汇', status:'待补充', tracks:['词汇','文化'], before:['collocations'],
    keywords:['idioms','习语','成语','惯用语','break the ice','piece of cake','under the weather'],
    children:[
      { group:'概念', name:'什么是习语', desc:'整体意义不等于字面意义之和的固定表达。' },
      { group:'高频', name:'日常高频习语', desc:'break the ice、piece of cake、under the weather、hit the books。' },
      { group:'高频', name:'职场习语', desc:'get the ball rolling、think outside the box、on the same page。' },
      { group:'高频', name:'含身体部位的习语', desc:'give someone a hand、keep an eye on、pull someone\'s leg。' },
      { group:'方法', name:'按场景记', desc:'把习语放进对话场景，而不是按字母表背。' },
      { group:'注意', name:'不要直译', desc:'习语直译往往不通，翻译时要找对应表达或意译。' }
    ],
    description:'习语是文化的浓缩。理解习语需要场景和故事，单靠字面翻译会闹笑话。' },

  { id:'phrasal-verbs', name:'短语动词', layer:'词汇与语义', domain:'词汇', status:'待补充', tracks:['词汇','听说'], before:['collocations'],
    keywords:['phrasal verbs','短语动词','动词短语','look up','turn on','give up','可分离','不可分离'],
    children:[
      { group:'结构', name:'动词+副词', desc:'turn on、give up、find out，宾语是代词时必须放中间：turn it on。' },
      { group:'结构', name:'动词+介词', desc:'look after、depend on、look forward to，宾语不能插中间。' },
      { group:'结构', name:'动词+副词+介词', desc:'put up with、look forward to、get along with。' },
      { group:'语义', name:'一词多义', desc:'take off 起飞/脱下/请假；get over 克服/恢复。' },
      { group:'语域', name:'口语与正式语体', desc:'正式写作常用单个拉丁词替代短语动词：find out→discover。' },
      { group:'方法', name:'按动词成组记', desc:'以 get、take、come、go 为核心，成组整理。' }
    ],
    description:'短语动词是英语口语的灵魂，也是听力的难点。记的时候要连宾语位置和语域一起记。' },

  { id:'register', name:'语域与正式度', layer:'词汇与语义', domain:'词汇', status:'待补充', tracks:['词汇','读写','学术'], before:['synonyms'],
    keywords:['register','语域','正式','非正式','formal','informal','口语','书面语','academic'],
    children:[
      { group:'层级', name:'正式 / 中性 / 非正式', desc:'commence / begin / start；assist / help / give a hand。' },
      { group:'层级', name:'学术语域', desc:'避免口语缩写、第一人称滥用和情感化表达。' },
      { group:'层级', name:'商务语域', desc:'礼貌、克制、以事为中心，避免过于随意。' },
      { group:'标记', name:'词典里的正式度标记', desc:'formal、informal、slang、vulgar、technical 等标签。' },
      { group:'应用', name:'写作一致性', desc:'一篇文章内保持同一语域，别一半论文一半聊天。' }
    ],
    description:'同样正确的英语，放进错误场合就是错的。语域是"得体"的核心，也是学术写作的第一道门槛。' },

  { id:'word-frequency', name:'词频与核心词', layer:'词汇与语义', domain:'词汇', status:'待补充', tracks:['词汇','方法'], before:['word-meaning'],
    keywords:['word frequency','词频','高频词','Zipf','覆盖率','BNC','COCA','核心词汇'],
    children:[
      { group:'规律', name:'齐普夫定律', desc:'少数词出现极多，长尾词出现极少。' },
      { group:'规律', name:'覆盖率', desc:'最常用的 3000 词覆盖日常文本约 90% 以上。' },
      { group:'清单', name:'高频词表', desc:'NGSL、Oxford 3000/5000、COCA 词表的不同用途。' },
      { group:'清单', name:'学术词表 AWL', desc:'学术文本中跨学科高频的 570 个词族。' },
      { group:'策略', name:'先吃高频再补专业', desc:'先把高频词学透，再按领域补专业词。' },
      { group:'策略', name:'用词频判断优先级', desc:'同一篇材料里反复出现的词，优先查、优先记。' }
    ],
    description:'词汇学习不是平均用力。先拿下最高频的 3000 词，阅读和听力的收益最大。' },

  { id:'cefr-levels', name:'CEFR 与词汇量', layer:'词汇与语义', domain:'词汇', status:'待补充', tracks:['词汇','方法','考试'], before:['word-frequency'],
    keywords:['CEFR','A1','A2','B1','B2','C1','C2','词汇量','欧标','英语水平'],
    children:[
      { group:'等级', name:'A1-A2 基础', desc:'日常问候、简单描述，词汇量约 1000-2000。' },
      { group:'等级', name:'B1-B2 独立', desc:'能处理熟悉话题与大部分工作场景，约 3000-5000。' },
      { group:'等级', name:'C1-C2 精通', desc:'学术与专业表达自如，约 8000-15000+。' },
      { group:'测评', name:'CEFR 与考试对应', desc:'雅思、托福、四六级与 CEFR 的大致对应关系，仅作参考。' },
      { group:'方法', name:'按等级选材料', desc:'听力与阅读材料略高于当前等级，才有可理解输入。' },
      { group:'方法', name:'词汇量自测', desc:'用词表抽样估算认识比例，再推算总量。' }
    ],
    description:'CEFR 是选材料、定目标的坐标系。知道自己在 A2 还是 B2，才知道该读什么、考什么。' },

  { id:'academic-vocabulary', name:'学术词汇', layer:'词汇与语义', domain:'词汇', status:'待补充', tracks:['学术','词汇','考试'], before:['cefr-levels','register'],
    keywords:['academic vocabulary','学术词汇','AWL','论文词汇','hedging','nominalization'],
    children:[
      { group:'清单', name:'AWL 学术词表', desc:'analyze、approach、concept、derive、evaluate 等 570 个词族。' },
      { group:'功能', name:'论证动词', desc:'argue、claim、suggest、demonstrate、indicate。' },
      { group:'功能', name:'模糊限制语 hedging', desc:'may、tend to、to some extent，降低断言强度。' },
      { group:'功能', name:'名词化', desc:'把动作写成名词：decide→decision，便于学术表达。' },
      { group:'搭配', name:'学术高频搭配', desc:'conduct research、draw a conclusion、play a role。' },
      { group:'应用', name:'论文阅读与写作', desc:'先认得出，再写得出；按功能分类积累。' }
    ],
    description:'学术词汇不是"难词"，而是论文里高频的功能词。按论证功能分类记，比按字母顺序背有用。' },

  { id:'business-vocabulary', name:'商务词汇', layer:'词汇与语义', domain:'词汇', status:'待补充', tracks:['商务','词汇'], before:['cefr-levels','register'],
    keywords:['business vocabulary','商务英语','金融','市场营销','会议','谈判','BEC'],
    children:[
      { group:'领域', name:'金融与财务', desc:'revenue、profit、budget、invoice、cash flow。' },
      { group:'领域', name:'市场营销', desc:'brand、campaign、target audience、market share。' },
      { group:'领域', name:'会议与谈判', desc:'agenda、proposal、negotiate、compromise、deadline。' },
      { group:'领域', name:'人力资源', desc:'recruit、appraisal、promotion、resign、severance。' },
      { group:'表达', name:'商务套语', desc:'Please find attached、I am writing to、Looking forward to。' },
      { group:'应用', name:'邮件与报告', desc:'把词汇放进真实邮件场景，边用边记。' }
    ],
    description:'商务词汇按场景成组出现。与其背词表，不如精读 20 封真实商务邮件并整理词块。' },

  { id:'topic-vocabulary', name:'话题词汇', layer:'词汇与语义', domain:'词汇', status:'待补充', tracks:['词汇','考试','读写'], before:['cefr-levels'],
    keywords:['topic vocabulary','话题词汇','环境','科技','教育','健康','社会','雅思话题'],
    children:[
      { group:'常见话题', name:'环境与气候', desc:'emission、sustainable、renewable、biodiversity、carbon footprint。' },
      { group:'常见话题', name:'科技与媒体', desc:'artificial intelligence、algorithm、privacy、social media。' },
      { group:'常见话题', name:'教育与工作', desc:'curriculum、critical thinking、career path、work-life balance。' },
      { group:'常见话题', name:'健康与社会', desc:'obesity、mental health、aging population、inequality。' },
      { group:'方法', name:'话题词云', desc:'每个话题建一个 30-50 词的词云，写作前先激活。' },
      { group:'方法', name:'观点+例子', desc:'词汇要和观点、例子一起准备，考试时才能展开。' }
    ],
    description:'考试写作与口语按话题出题。按话题建立词云和观点库，比零散背词更能在考场调用。' },

  { id:'semantic-relations', name:'语义关系', layer:'词汇与语义', domain:'词汇', status:'待补充', tracks:['词汇','思维'], before:['word-meaning'],
    keywords:['semantic relations','语义关系','上下义','部分整体','同形同音','hyponymy','meronymy'],
    children:[
      { group:'关系', name:'上下义关系', desc:'animal→dog→poodle，从一般到具体。' },
      { group:'关系', name:'部分整体关系', desc:'car→wheel→tire，整体与部件。' },
      { group:'关系', name:'同形同音关系', desc:'bank 河岸/银行、bat 蝙蝠/球棒。' },
      { group:'关系', name:'语义场', desc:'同一主题下的词构成网络：厨房、天气、情绪。' },
      { group:'应用', name:'词汇网络记忆', desc:'按语义关系画词网，比线性词表更符合大脑存储方式。' }
    ],
    description:'词汇在大脑里是按网络存的。用上下义、部分整体、语义场组织单词，回忆时线索更多。' },

  { id:'figurative-language', name:'比喻与修辞义', layer:'词汇与语义', domain:'词汇', status:'待补充', tracks:['文学','读写','文化'], before:['word-meaning'],
    keywords:['figurative language','比喻','隐喻','明喻','拟人','转喻','metaphor','simile'],
    children:[
      { group:'类型', name:'明喻 simile', desc:'用 like/as 明着比：as brave as a lion。' },
      { group:'类型', name:'隐喻 metaphor', desc:'不用 like/as，直接把 A 说成 B：time is money。' },
      { group:'类型', name:'拟人 personification', desc:'把事物当人写：the wind whispered。' },
      { group:'类型', name:'转喻与提喻', desc:'用部分代整体：the crown 指王室；用容器代内容。' },
      { group:'类型', name:'夸张与反讽', desc:'hyperbole 夸大；irony 说反话。' },
      { group:'应用', name:'阅读与写作', desc:'识别修辞义，避免把比喻当事实；写作时用来增强表现力。' }
    ],
    description:'修辞义是文学与新闻的常用手法。读不懂比喻，阅读就会停在字面；用不好比喻，写作就会平淡。' },

  { id:'euphemism', name:'委婉语', layer:'词汇与语义', domain:'文化', status:'待补充', tracks:['词汇','文化','商务'], before:['register','denotation-connotation'],
    keywords:['euphemism','委婉语','礼貌','pass away','let go','between jobs','政治正确'],
    children:[
      { group:'场景', name:'死亡与疾病', desc:'pass away、passed on、terminal illness。' },
      { group:'场景', name:'失业与裁员', desc:'let someone go、downsizing、between jobs。' },
      { group:'场景', name:'政治与军事', desc:'collateral damage、enhanced interrogation。' },
      { group:'场景', name:'外貌与年龄', desc:'senior、plus-size、visually challenged。' },
      { group:'应用', name:'听懂言外之意', desc:'委婉语常隐藏负面信息，听力和新闻阅读要能解码。' }
    ],
    description:'委婉语是文化的礼貌机制，也可能是语言操纵。理解它，才能听懂新闻里的"话外音"。' },

  { id:'slang', name:'俚语与网络用语', layer:'词汇与语义', domain:'文化', status:'待补充', tracks:['词汇','文化','听说'], before:['register'],
    keywords:['slang','俚语','网络用语','goat','lol','brb','ghost','binge','meme'],
    children:[
      { group:'类型', name:'传统俚语', desc:'cool、awesome、bucks、kick the bucket。' },
      { group:'类型', name:'网络缩写', desc:'lol、brb、tbh、imo、idk、fomo。' },
      { group:'类型', name:'社交媒体新词', desc:'ghost、binge-watch、influencer、clickbait、doomscrolling。' },
      { group:'注意', name:'使用场合', desc:'俚语适合口语和社交媒体，正式写作中避免。' },
      { group:'注意', name:'时效性', desc:'俚语更新极快，考试与商务场合不要冒险使用。' }
    ],
    description:'俚语能拉近关系，也容易过时或冒犯。看懂是听力能力，用不用要看场合。' },

  { id:'abbreviations', name:'缩写与首字母缩略', layer:'词汇与语义', domain:'词汇', status:'待补充', tracks:['词汇','读写'], before:['word-formation'],
    keywords:['abbreviations','缩写','首字母缩略','acronym','initialism','e.g.','i.e.','etc.'],
    children:[
      { group:'类型', name:'首字母缩略词', desc:'NASA、NATO 按词读；FBI、CEO 按字母读。' },
      { group:'类型', name:'截短词', desc:'ad、exam、phone、flu、gym。' },
      { group:'类型', name:'拉丁缩写', desc:'e.g. 例如、i.e. 即、etc. 等等、vs. 对比、et al. 等人。' },
      { group:'类型', name:'商务与技术缩写', desc:'ASAP、FYI、KPI、ROI、API、URL。' },
      { group:'规范', name:'缩写在写作中的用法', desc:'首次出现给全称，正式写作少用网络缩写。' }
    ],
    description:'缩写分"按词读"和"按字母读"两类，拉丁缩写还有固定标点。写作里用错，会显得不专业。' },

  { id:'numbers-dates', name:'数字与时间日期', layer:'词汇与语义', domain:'词汇', status:'待补充', tracks:['词汇','听说','商务'], before:['numerals'],
    keywords:['numbers','数字','日期','时间','分数','小数','百分比','years','o clock'],
    children:[
      { group:'数字', name:'大数字读法', desc:'hundred、thousand、million、billion；英式 billion 的历史差异。' },
      { group:'数字', name:'分数、小数与百分比', desc:'one third、two point five、twenty percent。' },
      { group:'日期', name:'日期读法', desc:'英式 5 May 2026 与美式 May 5, 2026；序数词读法。' },
      { group:'日期', name:'年份读法', desc:'1998 读 nineteen ninety-eight，2005 读 two thousand and five。' },
      { group:'时间', name:'时间表达', desc:'past/to、a quarter past、half past、AM/PM。' },
      { group:'应用', name:'听力中的数字', desc:'价格、电话号码、航班号是听力高频失分点。' }
    ],
    description:'数字与日期是中英差异最大的日常表达之一。听力里数字一慌就全错，需要专项练习。' },

  { id:'measurement-units', name:'度量衡与单位', layer:'词汇与语义', domain:'词汇', status:'待补充', tracks:['词汇','商务','文化'], before:['numbers-dates'],
    keywords:['measurement','度量衡','单位','meter','mile','pound','gallon','currency'],
    children:[
      { group:'长度重量', name:'公制与英制', desc:'meter/kilometer、mile；kilogram/pound、ounce。' },
      { group:'容积温度', name:'升、加仑与温度', desc:'liter、gallon、pint；Celsius 与 Fahrenheit 换算。' },
      { group:'货币', name:'货币表达', desc:'dollar、pound、euro；$5、£10、€20 的读法。' },
      { group:'应用', name:'阅读与旅行', desc:'英美单位不同，读食谱、路标、天气时要换算。' }
    ],
    description:'英美仍大量使用英制单位。读新闻、看食谱、出国旅行，单位换算会直接影响理解。' },

  { id:'titles-address', name:'称谓与称呼', layer:'词汇与语义', domain:'文化', status:'待补充', tracks:['词汇','文化','商务'], before:['register'],
    keywords:['titles','称谓','Mr','Mrs','Ms','Dr','professor','first name','sir madam'],
    children:[
      { group:'基本', name:'Mr / Mrs / Ms / Miss', desc:'Ms 不透露婚姻状况，商务场合最稳妥。' },
      { group:'基本', name:'Dr / Professor / Sir / Madam', desc:'学术与正式场合的称谓，以及英式 Sir 的特殊用法。' },
      { group:'习惯', name:'名与姓的使用', desc:'英语国家日常直呼其名，正式场合用 title + 姓氏。' },
      { group:'习惯', name:'邮件称呼', desc:'Dear Mr Smith、Dear Sir or Madam、Hi John 的场合差异。' },
      { group:'应用', name:'跨文化礼貌', desc:'直呼其名不一定是失礼，过度正式也可能显得疏远。' }
    ],
    description:'称呼是文化距离的刻度。英语里 first name 的使用比中文更普遍，但正式场合仍有明确规则。' },

  { id:'word-choice', name:'选词与常见用词错误', layer:'词汇与语义', domain:'词汇', status:'待补充', tracks:['词汇','读写'], before:['synonyms','collocations','register'],
    keywords:['word choice','选词','用词错误','中式表达','搭配错误','重复','冗余'],
    children:[
      { group:'错误', name:'中文一一对应', desc:'把"学习知识"直译成 learn knowledge，应为 acquire knowledge。' },
      { group:'错误', name:'搭配不当', desc:'do a mistake、open the light 这类母语迁移错误。' },
      { group:'错误', name:'词性误用', desc:'把名词当动词、形容词当副词。' },
      { group:'错误', name:'重复冗余', desc:'return back、repeat again、very unique。' },
      { group:'方法', name:'查搭配与例句', desc:'确定词义后再查典型搭配，确认能用再写。' },
      { group:'方法', name:'朗读检查', desc:'写完后朗读，别扭的地方往往是选词或搭配问题。' }
    ],
    description:'写作里的错，很多不是语法错，而是选词和搭配不对。建立"词 + 搭配 + 例句"三位一体的词条。' }

]);
