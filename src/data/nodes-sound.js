/* ============================================================
 * 知识点数据：语音与音系 / 拼写与拼读（最底下两层）
 * ------------------------------------------------------------
 * id        唯一标识，连线用它引用
 * layer     所属层（必须在 config.js 的 LAYERS 里）
 * domain    问题域
 * status    作者标注：已掌握 / 待补充 / 模糊
 * tracks    学习方向（可多个）
 * before    学习前置的 id 数组
 * keywords  搜索别名（俗称、英文、缩写、常见写法）
 * children  细分知识点：{ group, name, desc }
 * ============================================================ */
window.KB = window.KB || {};
window.KB.NODES = (window.KB.NODES || []).concat([

  /* ==================== 语音与音系 ==================== */

  { id:'phonetics-basics', name:'语音学基础', layer:'语音与音系', domain:'发音', status:'待补充', tracks:['语音'], before:[],
    keywords:['phonetics','发音器官','语音','articulation','清浊','发音部位','发音方式','语音学'],
    children:[
      { group:'发音机制', name:'发音器官', desc:'肺、喉、声带、口腔、鼻腔各自负责什么，声音从哪里来。' },
      { group:'发音机制', name:'气流与气流机制', desc:'肺部呼出的气流是大多数英语音的动力来源。' },
      { group:'发音机制', name:'清音与浊音', desc:'声带是否振动：/p/ 与 /b/、/s/ 与 /z/ 的根本区别。' },
      { group:'发音机制', name:'声带与喉部', desc:'声门开合、声带振动频率决定音高与嗓音。' },
      { group:'分类维度', name:'发音部位', desc:'双唇、唇齿、齿间、齿龈、硬腭、软腭、声门。' },
      { group:'分类维度', name:'发音方式', desc:'爆破、摩擦、破擦、鼻音、边音、近音。' },
      { group:'分类维度', name:'送气与否', desc:'英语 /p t k/ 在词首的送气，与中文送气音的对应关系。' }
    ],
    description:'所有发音问题的总根：先知道声音由哪个器官、用什么方式发出来，后面学音标才不会变成死记符号。' },

  { id:'ipa', name:'国际音标 IPA', layer:'语音与音系', domain:'发音', status:'待补充', tracks:['语音'], before:['phonetics-basics'],
    keywords:['ipa','音标','国际音标','phonetic symbols','48个音标','元音音标','辅音音标','dj音标','kk音标'],
    children:[
      { group:'体系', name:'音标是什么', desc:'用一套符号精确记录发音，一个符号对应一个音素。' },
      { group:'体系', name:'英式与美式音标体系', desc:'DJ（英）、KK（美）与 IPA 的关系，词典里看到的是哪一套。' },
      { group:'元音', name:'元音图', desc:'舌位高低、前后与唇形圆展，三个维度定位每个元音。' },
      { group:'辅音', name:'辅音表', desc:'按发音部位与方式排成一张表，清浊成对记忆。' },
      { group:'标记', name:'重音与长音符号', desc:'ˈ 主重音、ˌ 次重音、ː 长音，词典音标必看的三类符号。' },
      { group:'标记', name:'宽式与严式标音', desc:'/ / 记音位，[ ] 记实际音值；词典通常是宽式。' },
      { group:'应用', name:'用音标查读音', desc:'看到生词先读音标，再听音频核对，别依赖拼写猜。' }
    ],
    description:'音标是英语的"拼音"。掌握 20 个元音 + 24 个辅音，就能独立读出任何词典里的单词。' },

  { id:'vowels', name:'元音', layer:'语音与音系', domain:'发音', status:'待补充', tracks:['语音'], before:['ipa'],
    keywords:['vowel','元音','单元音','双元音','长短音','schwa','ə','梅花音','æ','iː','uː'],
    children:[
      { group:'单元音', name:'短元音', desc:'/ɪ e æ ɒ ʊ ʌ ə/：短促、口型相对放松。' },
      { group:'单元音', name:'长元音', desc:'/iː ɑː ɔː uː ɜː/：时长更长，口型更紧张。' },
      { group:'单元音', name:'Schwa 弱央元音', desc:'/ə/ 是英语出现频率最高的音，几乎每个弱读音节都有它。' },
      { group:'双元音', name:'合口双元音', desc:'/eɪ aɪ ɔɪ aʊ əʊ/：从一个元音滑向另一个元音。' },
      { group:'双元音', name:'集中双元音', desc:'/ɪə eə ʊə/：滑向 /ə/，英音特征明显。' },
      { group:'易错点', name:'长短音对立', desc:'ship/sheep、full/fool：中文没有长短音对立，必须刻意区分。' },
      { group:'易错点', name:'元音与拼写不对应', desc:'同一字母组合可能读不同元音，必须借助音标而不是字母。' }
    ],
    description:'英语元音决定"听起来像不像"。中国人最常见的发音问题，一半出在长短音和 schwa 上。' },

  { id:'consonants', name:'辅音', layer:'语音与音系', domain:'发音', status:'待补充', tracks:['语音'], before:['ipa'],
    keywords:['consonant','辅音','爆破音','摩擦音','破擦音','鼻音','边音','半元音','清浊'],
    children:[
      { group:'按方式', name:'爆破音', desc:'/p b t d k g/：先完全阻塞再释放气流。' },
      { group:'按方式', name:'摩擦音', desc:'/f v θ ð s z ʃ ʒ h/：气流通过狭窄通道产生摩擦。' },
      { group:'按方式', name:'破擦音', desc:'/tʃ dʒ/：先阻塞后摩擦，church、judge 的开头。' },
      { group:'按方式', name:'鼻音', desc:'/m n ŋ/：气流从鼻腔出，词尾 -ing 是 /ŋ/ 不是 /n/。' },
      { group:'按方式', name:'边音与近音', desc:'/l r j w/：/l/ 在词尾要舌尖抵齿龈，不能吞掉。' },
      { group:'按特征', name:'清浊成对记忆', desc:'/p-b/、/t-d/、/k-g/、/f-v/、/s-z/、/ʃ-ʒ/、/tʃ-dʒ/、/θ-ð/。' },
      { group:'易错点', name:'词尾辅音', desc:'中文习惯开音节，英语词尾辅音必须发出来：cat、dog、help。' }
    ],
    description:'英语辅音有 24 个，清浊成对是记忆主线。词尾辅音吞掉，是"中式口音"最明显的来源之一。' },

  { id:'phoneme-pairs', name:'音位与最小对立对', layer:'语音与音系', domain:'发音', status:'待补充', tracks:['语音','方法'], before:['vowels','consonants'],
    keywords:['minimal pairs','最小对立','音位','音位变体','易混音','ship sheep','bit beat'],
    children:[
      { group:'概念', name:'音位', desc:'能区分词义的音；换掉它，词就变成另一个词。' },
      { group:'概念', name:'最小对立对', desc:'只差一个音的两个词：ship/sheep、bit/beat、thin/sin。' },
      { group:'概念', name:'音位变体', desc:'同一音位在不同位置的实际读音差异，如 /t/ 的送气与闪音。' },
      { group:'训练', name:'易混音清单', desc:'/iː-ɪ/、/æ-e/、/θ-s/、/ð-z/、/v-w/、/l-r/、/n-ŋ/。' },
      { group:'训练', name:'听辨优先于发音', desc:'先能听出差别，嘴才可能发对；用最小对立对做听辨练习。' }
    ],
    description:'发音不准往往不是嘴的问题，而是耳朵没建立对立。最小对立对是最有效的听辨训练材料。' },

  { id:'syllable', name:'音节与音节划分', layer:'语音与音系', domain:'发音', status:'待补充', tracks:['语音','词汇'], before:['vowels','consonants'],
    keywords:['syllable','音节','音节划分','开音节','闭音节','重读音节','成音节'],
    children:[
      { group:'结构', name:'音节的三部分', desc:'onset 声母、nucleus 韵核、coda 韵尾；韵核通常是元音。' },
      { group:'结构', name:'开音节与闭音节', desc:'以元音结尾为开，以辅音结尾为闭，影响元音读音。' },
      { group:'划分', name:'音节划分规则', desc:'两个辅音之间分界、前缀后缀独立、双写辅音的处理。' },
      { group:'划分', name:'成音节辅音', desc:'button、bottle 里的 /l/、/n/ 可以自己成音节。' },
      { group:'应用', name:'数音节与拼写', desc:'音节数决定重音位置、比较级变化与移行断词。' }
    ],
    description:'音节是节奏的单位，也是拼写和重音的坐标。会数音节，很多规则就不用死记。' },

  { id:'word-stress', name:'单词重音', layer:'语音与音系', domain:'发音', status:'待补充', tracks:['语音'], before:['syllable'],
    keywords:['word stress','重音','stress','重读','次重音','重音位置','photograph photography'],
    children:[
      { group:'基础', name:'重音是什么', desc:'更用力、更响、更长、音高更高，四个特征同时出现。' },
      { group:'规则', name:'双音节名词与动词', desc:'名词常重前（record），动词常重后（record），词性决定重音。' },
      { group:'规则', name:'后缀对重音的影响', desc:'-tion/-ic/-ity 常把重音吸到前一个音节。' },
      { group:'规则', name:'前缀与重音', desc:'多数前缀不重读，但 re-/pre- 等在同形词里可能改变重音。' },
      { group:'规则', name:'复合词重音', desc:'名词复合词重前（blackbird），形容词+名词常双重音。' },
      { group:'应用', name:'重音与词性变化', desc:'present、object、increase：重音位置一变，词性就变。' }
    ],
    description:'重音放错，比个别音发错更影响理解。英语重音有规律，但规律要和词性、后缀一起记。' },

  { id:'sentence-stress', name:'句子重音与节奏', layer:'语音与音系', domain:'发音', status:'待补充', tracks:['语音','听说'], before:['word-stress'],
    keywords:['sentence stress','句子重音','节奏','rhythm','重读','内容词','功能词','stress-timed'],
    children:[
      { group:'原则', name:'内容词与功能词', desc:'名词、动词、形容词、副词重读；冠词、介词、连词弱读。' },
      { group:'原则', name:'信息重音', desc:'新信息重读，已知信息弱读；重音跟着说话人想强调的内容走。' },
      { group:'节奏', name:'重音计时节奏', desc:'英语以重读音节为节拍，重音之间的轻音节要压缩。' },
      { group:'节奏', name:'对比重音', desc:'I said THAT book，重音落在对比项上，句意随之改变。' },
      { group:'应用', name:'重音与听力', desc:'听不出重音，就抓不住句子的信息骨架。' }
    ],
    description:'英语句子的节奏由重音撑起来。把每个词读得一样重，是"听着不像英语"的核心原因。' },

  { id:'weak-forms', name:'弱读', layer:'语音与音系', domain:'发音', status:'待补充', tracks:['语音','听说'], before:['sentence-stress'],
    keywords:['weak forms','弱读','强读','reduction','schwa','to for of and','function words'],
    children:[
      { group:'概念', name:'强读与弱读', desc:'同一个功能词在句中有两种读法，弱读是常态。' },
      { group:'清单', name:'冠词与介词弱读', desc:'a/an、the、to、for、of、at、from 的弱读形式。' },
      { group:'清单', name:'助动词与情态动词弱读', desc:'am/is/are/was/were/have/has/had/can/could 的弱读。' },
      { group:'清单', name:'代词与连词弱读', desc:'you、he、she、and、but、than、that 的弱读。' },
      { group:'应用', name:'弱读与听力', desc:'听不懂 fast speech，多半是弱读和连读没建立。' }
    ],
    description:'弱读是英语听力的隐形门槛：书上每个词都认识，连起来就听不懂，问题常在这里。' },

  { id:'linking', name:'连读', layer:'语音与音系', domain:'发音', status:'待补充', tracks:['语音','听说'], before:['weak-forms'],
    keywords:['linking','连读','辅元连读','r连读','滑音','liaison','turn on','an apple'],
    children:[
      { group:'类型', name:'辅音+元音连读', desc:'turn on /tɜːn ɒn/ 听起来像 tur non。' },
      { group:'类型', name:'r 连读', desc:'英音词尾 r 平时不发音，后接元音时读出来：far away。' },
      { group:'类型', name:'滑音连读', desc:'/iː/ 后接元音加 /j/，/uː/ 后接元音加 /w/：see it、go on。' },
      { group:'类型', name:'元音+元音连读', desc:'两个元音之间自然过渡，避免硬断开。' },
      { group:'应用', name:'连读与意群', desc:'连读发生在意群内部，意群之间要停顿，不能一口气连到底。' }
    ],
    description:'连读不是故意"吞音"，而是气流自然衔接。听不出连读，就会把 turn on 听成两个陌生词。' },

  { id:'elision-assimilation', name:'省音与同化', layer:'语音与音系', domain:'发音', status:'待补充', tracks:['语音','听说'], before:['linking'],
    keywords:['elision','assimilation','省音','同化','吞音','next day','did you','coalescence'],
    children:[
      { group:'省音', name:'辅音省音', desc:'next day 的 /t/、asked 的 /k/ 在快速语流中常被省略。' },
      { group:'省音', name:'弱读音节脱落', desc:'interesting、vegetable 等词的中间音节在口语里被压缩。' },
      { group:'同化', name:'清浊同化', desc:'of course 的 /v/ 受 /k/ 影响变清；ten bikes 的 /n/ 变 /m/。' },
      { group:'同化', name:'部位同化', desc:'did you /dɪd juː/ 常变成 /dɪdʒuː/。' },
      { group:'融合', name:'破擦化融合', desc:'would you、miss you 里的 /d/、/s/ 与 /j/ 融合成 /dʒ/、/ʃ/。' },
      { group:'应用', name:'听懂真实语流', desc:'新闻、电影、播客里省音同化极多，精听时要专门标记。' }
    ],
    description:'真实口语不会一个音一个音地念。省音与同化是"听懂了但没听清"的常见原因。' },

  { id:'intonation', name:'语调', layer:'语音与音系', domain:'发音', status:'待补充', tracks:['语音','听说'], before:['sentence-stress'],
    keywords:['intonation','语调','升调','降调','降升调','fall','rise','fall-rise','语气'],
    children:[
      { group:'基本调型', name:'降调', desc:'陈述句、特殊疑问句、命令句的默认调型，表示确定、结束。' },
      { group:'基本调型', name:'升调', desc:'一般疑问句、列举未完成项，表示疑问、未完、礼貌。' },
      { group:'基本调型', name:'降升调', desc:'表示保留、对比、委婉的反对："Well, maybe…"。' },
      { group:'应用', name:'语调与态度', desc:'同一句话换语调，可以从礼貌变成不耐烦。' },
      { group:'应用', name:'列举与选择', desc:'列举时前面各项升调，最后一项降调。' },
      { group:'应用', name:'语调与听力推断', desc:'说话人的态度常写在语调里，而不是词面。' }
    ],
    description:'语调是句子的"表情"。发音再准，语调平直也会显得生硬或冷淡。' },

  { id:'prosody', name:'韵律与意群', layer:'语音与音系', domain:'发音', status:'待补充', tracks:['语音','听说'], before:['intonation'],
    keywords:['prosody','韵律','意群','thought groups','停顿','pausing','语速','chunking'],
    children:[
      { group:'意群', name:'意群划分', desc:'按意义把句子切成若干块，每块内部连读、块间停顿。' },
      { group:'意群', name:'停顿的位置', desc:'在从句边界、介词短语前后、并列项之间停顿。' },
      { group:'节奏', name:'语速控制', desc:'重要信息放慢，过渡部分加快，而不是全程匀速。' },
      { group:'节奏', name:'音高范围', desc:'英语音高起伏比中文大，太平会显得没有重点。' },
      { group:'应用', name:'口语与听力双向', desc:'会切意群，说的人清楚，听的人也更容易跟上。' }
    ],
    description:'意群是口语的"标点"。不会停顿，长句子就会说得上气不接下气，听的人也抓不住结构。' },

  { id:'british-american', name:'英音与美音', layer:'语音与音系', domain:'发音', status:'待补充', tracks:['语音','文化'], before:['vowels','consonants'],
    keywords:['british','american','英音','美音','accent','卷舌','rhotic','flap','can t','water'],
    children:[
      { group:'差异', name:'卷舌音 /r/', desc:'美音词尾和辅音前的 r 要卷舌，英音通常不发音。' },
      { group:'差异', name:'闪音 /t/', desc:'美音 water、better 中 /t/ 变成类似 /d/ 的闪音。' },
      { group:'差异', name:'元音差异', desc:'/ɑː-æ/、/ɒ-ɑː/、/əʊ-oʊ/ 等成组对应。' },
      { group:'差异', name:'重音与拼写差异', desc:'advertisement、schedule 的重音不同；colour/color。' },
      { group:'差异', name:'词汇差异', desc:'lift/elevator、petrol/gas、holiday/vacation。' },
      { group:'选择', name:'选一套为主', desc:'先固定一种口音模仿，另一种做到听懂即可。' }
    ],
    description:'英音美音没有高下，关键是别混着学。先选一套作为输出标准，另一套练听力。' },

  { id:'pronunciation-errors', name:'中国人常见发音错误', layer:'语音与音系', domain:'发音', status:'待补充', tracks:['语音'], before:['phoneme-pairs','word-stress'],
    keywords:['中式发音','th音','v w','l n','词尾辅音','辅音连缀','加音','吞音','pronunciation problems'],
    children:[
      { group:'音段', name:'/θ/ /ð/ 替代', desc:'用 /s/ /z/ 或 /t/ /d/ 代替 think、this，中文没有齿间音。' },
      { group:'音段', name:'/v/ 与 /w/ 混淆', desc:'very 读成 wery、west 读成 vest，唇齿与双唇没区分。' },
      { group:'音段', name:'/l/ 与 /n/ 混淆', desc:'南方口音常见 light/night 不分，词尾 /l/ 也容易吞。' },
      { group:'结构', name:'词尾辅音吞掉', desc:'把 cat 读成 ca，把 dogs 的 /z/ 读成 /s/。' },
      { group:'结构', name:'辅音连缀加音', desc:'school、street 前加 /sə/，或在辅音间插元音。' },
      { group:'结构', name:'长短元音不分', desc:'ship/sheep、full/fool、bad/bed。' },
      { group:'超音段', name:'重音与语调平直', desc:'每个音节一样重，句尾没有升降，听起来像念书。' }
    ],
    description:'这些错误有明确的母语迁移原因。对照清单逐项录音排查，比泛泛地"多听"有效得多。' },

  { id:'pronunciation-training', name:'发音训练法', layer:'语音与音系', domain:'发音', status:'待补充', tracks:['语音','方法'], before:['pronunciation-errors','prosody'],
    keywords:['发音训练','听辨','录音对比','影子跟读','最小对立','口型','模仿','training'],
    children:[
      { group:'方法', name:'最小对立听辨', desc:'每天 10 组，先听辨再跟读，建立耳朵的对立。' },
      { group:'方法', name:'录音回听', desc:'录下自己朗读，与标准音频逐句对比，标出差异。' },
      { group:'方法', name:'慢速分解', desc:'把单词拆成音节和音素慢读，再逐步加速到正常语速。' },
      { group:'方法', name:'口型与肌肉记忆', desc:'对着镜子练口型，让发音部位形成肌肉记忆。' },
      { group:'方法', name:'影子跟读', desc:'与音频同步跟读，练节奏、重音和语调，而不只是音素。' },
      { group:'方法', name:'反馈闭环', desc:'每周复录同一段材料，用旧录音对比进步。' }
    ],
    description:'发音是运动技能，靠的是听辨—模仿—反馈的闭环。只看音标不开口，永远不会真的发对。' },

  { id:'voice-quality', name:'发声与共鸣', layer:'语音与音系', domain:'发音', status:'待补充', tracks:['语音','听说'], before:['phonetics-basics'],
    keywords:['发声','共鸣','气息','嗓音','voice','resonance','breath','口腔开合'],
    children:[
      { group:'基础', name:'口腔开合度', desc:'英语需要更大的口腔空间，尤其是 /æ/、/ɑː/、/ɔː/。' },
      { group:'基础', name:'共鸣位置', desc:'声音放在口腔前部，避免闷在喉咙里。' },
      { group:'基础', name:'气息控制', desc:'用腹部气息支撑长句，句尾不飘不抖。' },
      { group:'应用', name:'音量与距离', desc:'演讲时音量与语速的配合，让最后一排也听清。' },
      { group:'应用', name:'保护嗓子', desc:'长时间朗读、授课后的放松与补水。' }
    ],
    description:'同样的音标，有人读得清亮有人读得含糊，差别常在气息和口腔开合。发声是发音的物理基础。' },

  /* ==================== 拼写与拼读 ==================== */

  { id:'alphabet', name:'字母与字母名', layer:'拼写与拼读', domain:'拼写', status:'待补充', tracks:['词汇','语音'], before:[],
    keywords:['alphabet','字母','字母名','26个字母','letter name','letter sound','大小写'],
    children:[
      { group:'基础', name:'26 个字母', desc:'大小写形态、书写笔顺与常见连写。' },
      { group:'基础', name:'字母名与字母音', desc:'字母 B 读 /biː/，但在单词里常发 /b/，两套系统要分开。' },
      { group:'基础', name:'元音字母与辅音字母', desc:'a e i o u 是元音字母，其余是辅音字母，但发音由音素决定。' },
      { group:'应用', name:'拼读单词', desc:'看到字母组合先想可能的音，再用词典音标确认。' },
      { group:'应用', name:'缩写与字母读音', desc:'VIP、CEO、USB 逐个字母读，还是当作单词读。' }
    ],
    description:'字母名和字母音是两套系统。很多拼读困惑，源于把"字母怎么念"和"字母在词里发什么音"混为一谈。' },

  { id:'phonics', name:'自然拼读', layer:'拼写与拼读', domain:'拼写', status:'待补充', tracks:['词汇','语音'], before:['alphabet'],
    keywords:['phonics','自然拼读','letter sound','cvc','blends','digraphs','拼读','读音规则'],
    children:[
      { group:'基础', name:'字母与音对应', desc:'每个辅音字母最常见的发音，以及元音字母的短音。' },
      { group:'基础', name:'CVC 结构', desc:'辅音-元音-辅音：cat、dog、sit，元音读短音。' },
      { group:'组合', name:'辅音连缀', desc:'bl、br、cl、cr、st、sp、sk 等两个辅音连读。' },
      { group:'组合', name:'辅音二合字母', desc:'sh、ch、th、ph、wh、ck、ng 两个字母发一个音。' },
      { group:'组合', name:'元音二合字母', desc:'ai、ay、ee、ea、oa、oo、ou、ow 的常见读音。' },
      { group:'组合', name:'r 控制的元音', desc:'ar、er、ir、or、ur 在重读音节中的读音。' },
      { group:'局限', name:'拼读规则的边界', desc:'英语借词多、拼写历史复杂，规则只能覆盖大部分，不能覆盖全部。' }
    ],
    description:'自然拼读解决"看到词大概怎么读"，是词汇启蒙的高效工具，但不能替代音标和查词典。' },

  { id:'spelling-rules', name:'拼写规则', layer:'拼写与拼读', domain:'拼写', status:'待补充', tracks:['词汇'], before:['phonics'],
    keywords:['spelling rules','拼写规则','双写','silent e','i before e','y变i','加ing','加ed'],
    children:[
      { group:'规则', name:'不发音 e 的取舍', desc:'make→making 去 e，但 notice→noticeable 保留 e。' },
      { group:'规则', name:'双写末尾辅音', desc:'重读闭音节 + 元音开头后缀：big→bigger、run→running。' },
      { group:'规则', name:'y 变 i 的规则', desc:'辅音 + y 结尾：carry→carried，但 play→played。' },
      { group:'规则', name:'i before e', desc:'一般 i 在 e 前，但 c 后、或读 /eɪ/ 时相反：receive、weigh。' },
      { group:'规则', name:'复数与第三人称 -s', desc:'/s/ /z/ /ɪz/ 三种读音与拼写变化。' },
      { group:'规则', name:'英式与美式拼写', desc:'-our/-or、-ise/-ize、-re/-er、双写 l 的差异。' }
    ],
    description:'拼写规则不是装饰，它直接决定 -ed/-ing/-s 怎么写。规则 + 高频词表比死记硬背可靠。' },

  { id:'spelling-patterns', name:'常见拼写模式', layer:'拼写与拼读', domain:'拼写', status:'待补充', tracks:['词汇','语音'], before:['phonics'],
    keywords:['spelling patterns','拼写模式','元音组合','sight words','word families','-ough','-tion'],
    children:[
      { group:'元音模式', name:'常见元音组合', desc:'ee/ea/ie/oa/oo/ou/ow/oi/oy 的高频词。' },
      { group:'元音模式', name:'-igh 与 -ough', desc:'light、night；though、through、thought 的多重读音。' },
      { group:'词尾模式', name:'-tion / -sion / -cian', desc:'名词后缀的三种拼法，按词根尾音选择。' },
      { group:'词尾模式', name:'-able / -ible', desc:'常见形容词后缀的拼写选择。' },
      { group:'词族', name:'Word families', desc:'按韵脚与拼写模式成组记词：light/right/night/bright。' },
      { group:'高频词', name:'Sight words', desc:'不按规则拼、必须整体认读的高频词：the、said、was、could。' }
    ],
    description:'把单词按拼写模式成组记忆，比孤立背词效率高得多；视觉词则要整体认读，不拆规则。' },

  { id:'silent-letters', name:'不发音字母', layer:'拼写与拼读', domain:'拼写', status:'待补充', tracks:['词汇'], before:['spelling-patterns'],
    keywords:['silent letters','不发音字母','kn','wr','mb','gh','ps','st','不发音'],
    children:[
      { group:'词首', name:'kn- / wr- / ps-', desc:'know、write、psychology：首字母不发音。' },
      { group:'词尾', name:'-mb / -mn', desc:'climb、comb、autumn：尾字母不发音。' },
      { group:'词尾', name:'-gh', desc:'high、though、night 中 gh 不发音或只影响前面元音。' },
      { group:'词中', name:'d/t/h 的脱落', desc:'Wednesday、Christmas、hour、honest。' },
      { group:'词中', name:'-alk / -alf', desc:'walk、talk、half 中 l 不发音。' },
      { group:'策略', name:'按词源理解', desc:'不发音字母多来自历史拼写，了解词源反而容易记。' }
    ],
    description:'不发音字母让拼写和读音脱节。按词首、词尾、词中归类记忆，比逐词硬背快。' },

  { id:'homophones', name:'同音异形词', layer:'拼写与拼读', domain:'拼写', status:'待补充', tracks:['词汇'], before:['phonics'],
    keywords:['homophones','同音词','their there','to too two','your you re','its it s','affect effect'],
    children:[
      { group:'高频', name:'their / there / they\'re', desc:'所有格、地点、缩写三兄弟，写作高频错点。' },
      { group:'高频', name:'to / too / two', desc:'介词、也/太、数字二。' },
      { group:'高频', name:'your / you\'re', desc:'所有格与缩写的区别。' },
      { group:'高频', name:'its / it\'s', desc:'所有格没有撇号，it\'s = it is / it has。' },
      { group:'近音', name:'affect / effect', desc:'动词"影响"与名词"效果"，读音接近但不是同音。' },
      { group:'近音', name:'then / than', desc:'时间/顺序与比较，写作中经常混用。' },
      { group:'策略', name:'用句子区分', desc:'把易混词放进固定对比句，建立语境记忆。' }
    ],
    description:'同音词是拼写与写作的双重陷阱。用固定对比句记，比单独背词义有效。' },

  { id:'syllabification', name:'音节划分与移行', layer:'拼写与拼读', domain:'拼写', status:'待补充', tracks:['词汇'], before:['syllable','spelling-rules'],
    keywords:['syllabification','音节划分','移行','断词','hyphenation','syllable division'],
    children:[
      { group:'规则', name:'元音之间一个辅音', desc:'通常把辅音划给后一个音节：pa-per。' },
      { group:'规则', name:'元音之间两个辅音', desc:'两个辅音分开：win-ter；但双写字母与固定组合例外。' },
      { group:'规则', name:'前缀与后缀独立', desc:'un-happy、re-read 尽量保持词素完整。' },
      { group:'规则', name:'不能移行的情况', desc:'单音节词、缩写、数字、专有名词一般不断开。' },
      { group:'应用', name:'拼写与发音', desc:'会划分音节，重音与比较级变化更容易判断。' }
    ],
    description:'音节划分既是拼写规则，也是口语节奏的基础。写作文移行、判断重音都用得上。' },

  { id:'irregular-spelling', name:'不规则拼写与高频错词', layer:'拼写与拼读', domain:'拼写', status:'待补充', tracks:['词汇'], before:['spelling-rules'],
    keywords:['irregular spelling','不规则拼写','高频错词','commonly misspelled','necessary','accommodation'],
    children:[
      { group:'清单', name:'高频错拼词', desc:'necessary、accommodation、receive、separate、definitely。' },
      { group:'清单', name:'双写字母陷阱', desc:'beginning、occurred、committee、tomorrow。' },
      { group:'清单', name:'不发音与外来拼写', desc:'rhythm、bureaucracy、entrepreneur、questionnaire。' },
      { group:'方法', name:'按音节切块', desc:'把长词切成音节块记忆：ac-com-mo-da-tion。' },
      { group:'方法', name:'错词本', desc:'只记录自己写错的词，每周回看，形成个人清单。' }
    ],
    description:'英语拼写不是完全规则的。高频错词要建立个人错词本，用音节切块和词源辅助记忆。' },

  { id:'capitalization', name:'大小写规则', layer:'拼写与拼读', domain:'拼写', status:'待补充', tracks:['词汇','读写'], before:['alphabet'],
    keywords:['capitalization','大小写','capital letters','专有名词','标题大小写','句首大写'],
    children:[
      { group:'基本', name:'句首大写', desc:'每个句子的第一个字母大写。' },
      { group:'基本', name:'专有名词大写', desc:'人名、地名、国家、语言、民族、机构、节日。' },
      { group:'基本', name:'I 永远大写', desc:'英语中的第一人称单数代词 I 在任何位置都大写。' },
      { group:'细节', name:'标题大小写', desc:'标题实词首字母大写，虚词一般小写（APA/Chicago 有差异）。' },
      { group:'细节', name:'缩写与品牌', desc:'iPhone、eBay 等品牌拼写按官方写法，不强行首字母大写。' }
    ],
    description:'大小写是写作规范的一部分。中文没有大小写，中国学习者最容易漏掉句首、专有名词和 I。' },

  { id:'spelling-strategies', name:'拼写记忆策略', layer:'拼写与拼读', domain:'方法', status:'待补充', tracks:['方法','词汇'], before:['spelling-rules','spelling-patterns'],
    keywords:['拼写记忆','spelling strategy','mnemonic','chunking','look say cover write check','自然拼读'],
    children:[
      { group:'方法', name:'看-读-盖-写-查', desc:'Look-Say-Cover-Write-Check 五步法，适合小学生与初学者。' },
      { group:'方法', name:'按音节切块', desc:'长词拆成音节块，降低记忆负担。' },
      { group:'方法', name:'词源辅助', desc:'了解前缀、词根、后缀，拼写自然有逻辑。' },
      { group:'方法', name:'记忆口诀', desc:'用谐音、故事、首字母缩略建立独特线索。' },
      { group:'方法', name:'听写与间隔复习', desc:'听写检验真实掌握，间隔重复防止回生。' }
    ],
    description:'拼写靠的不是"多看几眼"，而是多通道编码：读、写、听、拆、用，五条路一起走。' }

]);
