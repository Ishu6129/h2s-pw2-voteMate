// js/data.js — VoteMate localized content
const PROCESS_CARDS = {
  en: {
    loksabha: [
      { icon:'📢', num:'01', title:'Schedule Announcement', desc:'ECI announces election dates and the Model Code of Conduct (MCC) comes into force immediately.', accent:'var(--grad-saffron)' },
      { icon:'📝', num:'02', title:'Nominations', desc:'Candidates file nomination papers with the Returning Officer (RO). Scrutiny and withdrawals follow.', accent:'var(--grad-saffron)' },
      { icon:'🗳️', num:'05', title:'Polling Day', desc:'Citizens cast their votes at polling booths using EVMs and VVPAT. EPIC is required for identification.', accent:'var(--grad-saffron)' },
      { icon:'🏆', num:'06', title:'Results & Formation', desc:'Counting of votes. The party/alliance with majority forms the government. PM is appointed by President.', accent:'var(--grad-green)' },
    ],
    state: [
      { icon:'📢', num:'01', title:'Date Announcement', desc:'State Election Commission or ECI announces the poll dates for the specific state assembly.', accent:'var(--grad-saffron)' },
      { icon:'🗳️', num:'05', title:'Polling Day', desc:'Citizens vote for their preferred MLA. EVM and VVPAT are used. EPIC is required.', accent:'var(--grad-saffron)' },
      { icon:'🏆', num:'06', title:'Results & Government', desc:'Counting of votes. Majority party forms government. Governor invites the leader to form government.', accent:'var(--grad-green)' },
    ]
  },
  hi: {
    loksabha: [
      { icon:'📢', num:'01', title:'चुनाव कार्यक्रम की घोषणा', desc:'ECI चुनाव की तारीखों की घोषणा करता है और आदर्श आचार संहिता (MCC) तुरंत प्रभाव से लागू हो जाती है।', accent:'var(--grad-saffron)' },
      { icon:'📝', num:'02', title:'नामांकन प्रक्रिया', desc:'उम्मीदवार रिटर्निंग ऑफिसर (RO) के पास नामांकन पत्र दाखिल करते हैं। जांच और वापसी की प्रक्रिया होती है।', accent:'var(--grad-saffron)' },
      { icon:'🗳️', num:'05', title:'मतदान का दिन', desc:'नागरिक EVM और VVPAT का उपयोग करके मतदान केंद्रों पर अपना वोट डालते हैं। पहचान के लिए EPIC आवश्यक है।', accent:'var(--grad-saffron)' },
      { icon:'🏆', num:'06', title:'परिणाम और सरकार गठन', desc:'मतों की गिनती। बहुमत वाला दल/गठबंधन सरकार बनाता है। राष्ट्रपति द्वारा प्रधानमंत्री की नियुक्ति।', accent:'var(--grad-green)' },
    ],
    state: [
      { icon:'📢', num:'01', title:'तारीख की घोषणा', desc:'राज्य चुनाव आयोग या ECI विशिष्ट राज्य विधानसभा के लिए मतदान की तारीखों की घोषणा करता है।', accent:'var(--grad-saffron)' },
      { icon:'🗳️', num:'05', title:'मतदान का दिन', desc:'नागरिक अपने पसंदीदा विधायक के लिए वोट करते हैं। EVM और VVPAT का उपयोग किया जाता है। पहचान के लिए EPIC आवश्यक है।', accent:'var(--grad-saffron)' },
      { icon:'🏆', num:'06', title:'परिणाम और सरकार गठन', desc:'मतों की गिनती। बहुमत वाला दल सरकार बनाता है। राज्यपाल बहुमत दल के नेता को सरकार बनाने के लिए आमंत्रित करते हैं।', accent:'var(--grad-green)' },
    ]
  },
  ta: {
    loksabha: [
      { icon:'📢', num:'01', title:'தேர்தல் அறிவிப்பு', desc:'இந்திய தேர்தல் ஆணையம் (ECI) தேர்தல் அட்டவணையை அறிவிக்கிறது மற்றும் மாதிரி நடத்தை விதிகள் (MCC) உடனடியாக அமலுக்கு வரும்.', accent:'var(--grad-saffron)' },
      { icon:'📝', num:'02', title:'வேட்புமனு தாக்கல்', desc:'வேட்பாளர்கள் தேர்தல் நடத்தும் அலுவலரிடம் வேட்புமனு தாக்கல் செய்கிறார்கள்.', accent:'var(--grad-saffron)' },
      { icon:'🗳️', num:'05', title:'வாக்குப்பதிவு நாள்', desc:'வாக்காளர்கள் மின்னணு வாக்குப்பதிவு இயந்திரத்தில் (EVM) வாக்களிக்கின்றனர்.', accent:'var(--grad-saffron)' },
      { icon:'🏆', num:'06', title:'முடிவுகள்', desc:'வாக்குகள் எண்ணப்பட்டு முடிவுகள் அறிவிக்கப்படுகின்றன.', accent:'var(--grad-green)' },
    ],
    state: [
      { icon:'📢', num:'01', title:'தேதி அறிவிப்பு', desc:'மாநில தேர்தல் ஆணையம் அல்லது ECI தேர்தல் தேதியை அறிவிக்கிறது.', accent:'var(--grad-saffron)' },
      { icon:'🗳️', num:'05', title:'வாக்குப்பதிவு', desc:'மின்னணு வாக்குப்பதிவு இயந்திரம் (EVM) மற்றும் VVPAT பயன்படுத்தப்படுகிறது.', accent:'var(--grad-saffron)' },
      { icon:'🏆', num:'06', title:'முடிவுகள்', desc:'பெரும்பான்மை பெற்ற கட்சி ஆட்சி அமைக்கிறது.', accent:'var(--grad-green)' },
    ]
  },
  bn: {
    loksabha: [
      { icon:'📢', num:'01', title:'তফসিল ঘোষণা', desc:'নির্বাচন কমিশন নির্বাচনের তারিখ ঘোষণা করে এবং আদর্শ আচরণবিধি (MCC) অবিলম্বে কার্যকর হয়।', accent:'var(--grad-saffron)' },
      { icon:'📝', num:'02', title:'মনোনয়ন', desc:'প্রার্থীরা রিটার্নিং অফিসারের কাছে মনোনয়নপত্র জমা দেন।', accent:'var(--grad-saffron)' },
      { icon:'🗳️', num:'05', title:'ভোটের দিন', desc:'নাগরিকরা EVM এবং VVPAT ব্যবহার করে ভোট দেন।', accent:'var(--grad-saffron)' },
      { icon:'🏆', num:'06', title:'ফলাফল', desc:'ভোট গণনা এবং সরকার গঠন।', accent:'var(--grad-green)' },
    ],
    state: [
      { icon:'📢', num:'01', title:'তারিখ ঘোষণা', desc:'রাজ্য বিধানসভা নির্বাচনের তারিখ ঘোষণা।', accent:'var(--grad-saffron)' },
      { icon:'🗳️', num:'05', title:'ভোটের দিন', desc:'নাগরিকরা তাদের পছন্দের বিধায়ককে ভোট দেন।', accent:'var(--grad-saffron)' },
      { icon:'🏆', num:'06', title:'ফলাফল', desc:'রাজ্য সরকার গঠন।', accent:'var(--grad-green)' },
    ]
  },
  te: {
    loksabha: [
      { icon:'📢', num:'01', title:'షెడ్యూల్ ప్రకటన', desc:'ఎన్నికల సంఘం తేదీలను ప్రకటిస్తుంది మరియు ఎన్నికల నియమావళి అమలులోకి వస్తుంది.', accent:'var(--grad-saffron)' },
      { icon:'📝', num:'02', title:'నామినేషన్లు', desc:'అభ్యర్థులు రిటర్నింగ్ ఆఫీసర్‌కు నామినేషన్ పత్రాలను సమర్పిస్తారు.', accent:'var(--grad-saffron)' },
      { icon:'🗳️', num:'05', title:'పోలింగ్ రోజు', desc:'పౌరులు EVM మరియు VVPAT ఉపయోగించి ఓటు వేస్తారు.', accent:'var(--grad-saffron)' },
      { icon:'🏆', num:'06', title:'ఫలితాలు', desc:'ఓట్ల లెక్కింపు మరియు ప్రభుత్వం ఏర్పాటు.', accent:'var(--grad-green)' },
    ],
    state: [
      { icon:'📢', num:'01', title:'తేదీ ప్రకటన', desc:'రాష్ట్ర అసెంబ్లీ ఎన్నికల తేదీల ప్రకటన.', accent:'var(--grad-saffron)' },
      { icon:'🏆', num:'06', title:'ప్రభుత్వ ఏర్పాటు', desc:'కొత్త రాష్ట్ర ప్రభుత్వం ఏర్పాటు.', accent:'var(--grad-green)' },
    ]
  },
  mr: {
    loksabha: [
      { icon:'📢', num:'01', title:'निवडणूक कार्यक्रम घोषणा', desc:'निवडणूक आयोग तारखा जाहीर करतो आणि आचारसंहिता लागू होते.', accent:'var(--grad-saffron)' },
      { icon:'📝', num:'02', title:'नामनिर्देशन', desc:'उमेदवार निवडणूक निर्णय अधिकाऱ्याकडे अर्ज दाखल करतात.', accent:'var(--grad-saffron)' },
      { icon:'🗳️', num:'05', title:'मतदानाचा दिवस', desc:'नागरिक EVM आणि VVPAT वापरून मतदान करतात.', accent:'var(--grad-saffron)' },
      { icon:'🏆', num:'06', title:'निकाल', desc:'मतमोजणी आणि सरकार स्थापना.', accent:'var(--grad-green)' },
    ],
    state: [
      { icon:'📢', num:'01', title:'तारीख घोषणा', desc:'राज्य विधानसभा निवडणुकीच्या तारखांची घोषणा.', accent:'var(--grad-saffron)' },
      { icon:'🏆', num:'06', title:'सरकार स्थापना', desc:'राज्यात नवीन सरकार स्थापन.', accent:'var(--grad-green)' },
    ]
  },
  gu: {
    loksabha: [
      { icon:'📢', num:'01', title:'કાર્યક્રમની જાહેરાત', desc:'ચૂંટણી પંચ તારીખો જાહેર કરે છે અને આચારસંહિતા લાગુ પડે છે.', accent:'var(--grad-saffron)' },
      { icon:'📝', num:'02', title:'નામાંકન', desc:'ઉમેદવારો ચૂંટણી અધિકારી પાસે ફોર્મ ભરે છે.', accent:'var(--grad-saffron)' },
      { icon:'🗳️', num:'05', title:'મતદાનનો દિવસ', desc:'નાગરિકો EVM અને VVPAT દ્વારા મતદાન કરે છે.', accent:'var(--grad-saffron)' },
      { icon:'🏆', num:'06', title:'પરિણામ', desc:'મતગણતરી અને સરકારની રચના.', accent:'var(--grad-green)' },
    ],
    state: [
      { icon:'📢', num:'01', title:'તારીખની જાહેરાત', desc:'રાજ્ય વિધાનસભા ચૂંટણીની તારીખોની જાહેરાત.', accent:'var(--grad-saffron)' },
      { icon:'🏆', num:'06', title:'સરકારની રચના', desc:'રાજ્યમાં નવી સરકારની રચના.', accent:'var(--grad-green)' },
    ]
  }
};

const TIMELINE_STEPS = {
  en: {
    loksabha: [
      { icon:'🗓️', tag:'Announcement', title:'Election Dates', desc:'ECI releases the full schedule for all phases across the nation.' },
      { icon:'📝', tag:'Nominations', title:'Candidate Filing', desc:'Candidates register their names and undergo scrutiny.' },
      { icon:'🗳️', tag:'Election', title:'Polling Day', desc:'The actual day when citizens visit booths to cast their votes.' },
      { icon:'🏆', tag:'Results', title:'Counting Day', desc:'Votes are counted and results for all 543 seats are declared.' }
    ],
    state: [
      { icon:'🗓️', tag:'Announcement', title:'Election Dates', desc:'ECI announces dates for the state assembly polls.' },
      { icon:'🏛️', tag:'Government', title:'Cabinet Formation', desc:'New state government is formed after results.' }
    ]
  },
  hi: {
    loksabha: [
      { icon:'🗓️', tag:'घोषणा', title:'चुनाव की तारीखें', desc:'ECI पूरे देश में सभी चरणों के लिए पूर्ण कार्यक्रम जारी करता है।' },
      { icon:'📝', tag:'नामांकन', title:'उम्मीदवार का नामांकन', desc:'उम्मीदवार अपना नाम पंजीकृत करते हैं और जांच की प्रक्रिया से गुजरते हैं।' },
      { icon:'🗳️', tag:'चुनाव', title:'मतदान का दिन', desc:'वह वास्तविक दिन जब नागरिक वोट डालने के लिए मतदान केंद्रों पर जाते हैं।' },
      { icon:'🏆', tag:'परिणाम', title:'मतगणना का दिन', desc:'मतों की गिनती की जाती है और सभी 543 सीटों के परिणाम घोषित किए जाते हैं।' }
    ],
    state: [
      { icon:'🗓️', tag:'घोषणा', title:'चुनाव की तारीखें', desc:'ECI राज्य विधानसभा चुनावों के लिए तारीखों की घोषणा करता है।' },
      { icon:'🏛️', tag:'सरकार', title:'मंत्रिमंडल गठन', desc:'परिणामों के बाद नई राज्य सरकार का गठन किया जाता है।' }
    ]
  },
  ta: {
    loksabha: [
      { icon:'🗓️', tag:'அறிவிப்பு', title:'தேதி அறிவிப்பு', desc:'தேர்தல் ஆணையம் அட்டவணையை வெளியிடுகிறது.' },
      { icon:'📝', tag:'வேட்புமனு', title:'வேட்புமனு தாக்கல்', desc:'வேட்பாளர்கள் தங்களை பதிவு செய்கிறார்கள்.' },
      { icon:'🗳️', tag:'வாக்குப்பதிவு', title:'தேர்தல் நாள்', desc:'வாக்காளர்கள் வாக்களிக்கிறார்கள்.' },
      { icon:'🏆', tag:'முடிவு', title:'வாக்கு எண்ணிக்கை', desc:'மக்களின் தீர்ப்பு அறிவிக்கப்படுகிறது.' }
    ],
    state: [
      { icon:'🗓️', tag:'அறிவிப்பு', title:'அறிவிப்பு', desc:'மாநில தேர்தல் தேதிகள் அறிவிக்கப்படுகின்றன.' },
      { icon:'🏆', tag:'ஆட்சி', title:'ஆட்சி அமைத்தல்', desc:'புதிய அரசு பொறுப்பேற்கிறது.' }
    ]
  },
  bn: {
    loksabha: [
      { icon:'🗓️', tag:'ঘোষণা', title:'নির্বাচনের তারিখ', desc:'ECI নির্বাচনের তফসিল প্রকাশ করে।' },
      { icon:'🗳️', tag:'নির্বাচন', title:'ভোটের দিন', desc:'নাগরিকরা ভোট দেন।' },
    ],
    state: [
      { icon:'🗓️', tag:'ঘোষণা', title:'তারিখ ঘোষণা', desc:'বিধানসভা নির্বাচনের তারিখ।' },
    ]
  },
  te: {
    loksabha: [
      { icon:'🗓️', tag:'ప్రకటన', title:'ఎన్నికల తేదీలు', desc:'ఎన్నికల సంఘం షెడ్యూల్ విడుదల చేస్తుంది.' },
    ],
    state: [
      { icon:'🗓️', tag:'ప్రకటన', title:'తేదీలు', desc:'అసెంబ్లీ ఎన్నికల తేదీలు.' },
    ]
  },
  mr: {
    loksabha: [
      { icon:'🗓️', tag:'घोषणा', title:'निवडणूक तारखा', desc:'आयोग वेळापत्रक जाहीर करतो.' },
    ],
    state: [
      { icon:'🗓️', tag:'घोषणा', title:'तारखा', desc:'विधानसभा निवडणूक तारखा.' },
    ]
  },
  gu: {
    loksabha: [
      { icon:'🗓️', tag:'જાહેરાત', title:'ચૂંટણીની તારીખો', desc:'પંચ કાર્યક્રમ જાહેર કરે છે.' },
    ],
    state: [
      { icon:'🗓️', tag:'જાહેરાત', title:'તારીખો', desc:'વિધાનસભા ચૂંટણીની તારીખો.' },
    ]
  }
};

const ELIGIBILITY = {
  en: ['Must be an Indian Citizen', 'Must be 18 years or older on Jan 1st of election year', 'Must be a resident of the polling area', 'Must not be disqualified under law'],
  hi: ['भारतीय नागरिक होना अनिवार्य है', 'चुनाव वर्ष की 1 जनवरी को 18 वर्ष या उससे अधिक आयु का होना चाहिए', 'मतदान क्षेत्र का निवासी होना चाहिए', 'कानून के तहत अयोग्य घोषित नहीं होना चाहिए'],
  ta: ['இந்திய குடிமகனாக இருக்க வேண்டும்', '18 வயது பூர்த்தியாகি இருக்க வேண்டும்', 'அந்தப் பகுதியின் குடியிருப்பாளராக இருக்க வேண்டும்'],
  bn: ['অবশ্যই ভারতের নাগরিক হতে হবে', '১৮ বছর বা তার বেশি বয়স হতে হবে'],
  te: ['భారత పౌరుడై ఉండాలి', '18 ఏళ్లు నిండి ఉండాలి'],
  mr: ['भारतीय नागरिक असणे आवश्यक आहे', 'वय १८ वर्ष पूर्ण असावे'],
  gu: ['ભારતીય નાગરિક હોવા જોઈએ', '૧૮ વર્ષ કે તેથી વધુ ઉંમર હોવી જોઈએ']
};

const REG_STEPS = {
  en: [
    { num:'1', title:'Visit NVSP Portal', desc:' Go to nvsp.in or Voter Helpline App' },
    { num:'2', title:'Fill Form 6', desc:' For new registration or shifting' },
    { num:'3', title:'Verify Details', desc:' Upload photo and age/address proof' },
    { num:'4', title:'EPIC Delivery', desc:' Get your ID card by post after verification' }
  ],
  hi: [
    { num:'1', title:'NVSP पोर्टल पर जाएं', desc:' nvsp.in या वोटर हेल्पलाइन ऐप का उपयोग करें' },
    { num:'2', title:'फॉर्म 6 भरें', desc:' नए पंजीकरण या स्थानांतरण के लिए' },
    { num:'3', title:'विवरण सत्यापित करें', desc:' फोटो और आयु/पते का प्रमाण अपलोड करें' },
    { num:'4', title:'EPIC डिलीवरी', desc:' सत्यापन के बाद डाक से अपना पहचान पत्र प्राप्त करें' }
  ],
  ta: [
    { num:'1', title:'NVSP போர்டல்', desc:' nvsp.in அல்லது செயலிக்குச் செல்லவும்' },
    { num:'2', title:'படிவம் 6', desc:' புதிய பதிவிற்கு படிவம் 6-ஐ நிரப்பவும்' }
  ],
  bn: [
    { num:'1', title:'NVSP পোর্টালে যান', desc:' nvsp.in ব্যবহার করুন' },
    { num:'2', title:'ফর্ম ৬ পূরণ করুন', desc:' নতুন নিবন্ধনের জন্য' }
  ],
  te: [
    { num:'1', title:'NVSP పోర్టల్', desc:' nvsp.in సందర్శించండి' },
  ],
  mr: [
    { num:'1', title:'NVSP पोर्टल', desc:' nvsp.in ला भेट द्या' },
  ],
  gu: [
    { num:'1', title:'NVSP પોર્ટલ', desc:' nvsp.in ની મુલાકાત લો' },
  ]
};

const DOCS = {
  en: ['Passport size photo', 'Identity Proof (Aadhaar/PAN)', 'Age Proof (Birth Certificate/10th Marksheet)', 'Address Proof (Passport/Utility Bill)'],
  hi: ['पासपोर्ट साइज फोटो', 'पहचान पत्र (आधार/पैन)', 'आयु प्रमाण (जन्म प्रमाण पत्र/10वीं की मार्कशीट)', 'पते का प्रमाण (पासपोर्ट/बिजली बिल)'],
  ta: ['புகைப்படம்', 'அடையாளச் சான்று', 'முகவரிச் சான்று'],
  bn: ['ছবি', 'পরিচয়পত্র', 'ঠিকানার প্রমাণ'],
  te: ['ఫోటో', 'గుర్తింపు కార్డు', 'చిరునామా ధృవీకరణ'],
  mr: ['फोटो', 'ओळखपत्र', 'पत्ता पुरावा'],
  gu: ['ફોટો', 'ઓળખપત્ર', 'સરનામાંનો પુરાવો']
};

const FAQ_DATA = {
  en: [
    { q:'How can I check my name in voter list?', a:'Visit eceroll.nic.in or use the Voter Helpline App. Enter your EPIC number or search by details.' },
    { q:'What if I don\'t have a Voter ID card?', a:'If your name is in the list, you can still vote with valid photo ID like Aadhaar, PAN, or Passport.' },
    { q:'Can NRIs vote in Indian elections?', a:'Yes, NRIs can register as overseas voters by filing Form 6A but must be physically present at their polling booth.' }
  ],
  hi: [
    { q:'मैं मतदाता सूची में अपना नाम कैसे देख सकता हूँ?', a:'voterportal.eci.gov.in पर जाएं या वोटर हेल्पलाइन ऐप का उपयोग करें। अपना EPIC नंबर डालें या विवरण से खोजें।' },
    { q:'अगर मेरे पास वोटर आईडी कार्ड नहीं है तो क्या होगा?', a:'यदि आपका नाम सूची में है, तो आप आधार, पैन या पासपोर्ट जैसे वैध फोटो पहचान पत्र के साथ मतदान कर सकते हैं।' },
    { q:'क्या प्रवासी भारतीय (NRI) चुनाव में मतदान कर सकते हैं?', a:'हाँ, NRI फॉर्म 6A भरकर विदेशी मतदाता के रूप में पंजीकरण कर सकते हैं, लेकिन मतदान के लिए उन्हें व्यक्तिगत रूप से उपस्थित होना होगा।' }
  ],
  ta: [
    { q:'வாக்காளர் பட்டியலில் பெயர் பார்ப்பது எப்படி?', a:'voterportal.eci.gov.in இணையதளத்தில் சரிபார்க்கலாம்.' },
    { q:'வாக்காளர் அட்டை இல்லையென்றால் என்ன செய்வது?', a:'பட்டியலில் பெயர் இருந்தால் ஆதார் அல்லது பான் கார்டு கொண்டு வாக்களிக்கலாம்.' }
  ],
  bn: [
    { q:'ভোটার তালিকায় নাম কীভাবে দেখব?', a:'voterportal.eci.gov.in দেখুন।' },
  ],
  te: [
    { q:'ఓటరు జాబితాలో పేరు ఎలా చూడాలి?', a:'voterportal.eci.gov.in సందర్శించండి।' },
  ],
  mr: [
    { q:'मतदार यादीत नाव कसे तपासायचे?', a:'voterportal.eci.gov.in ला भेट द्या।' },
  ],
  gu: [
    { q:'મતદાર યાદીમાં નામ કેવી રીતે જોવું?', a:'voterportal.eci.gov.in ની મુલાકાત લો।' },
  ]
};

const GUIDE_STEPS = {
  en: [
    { num:'1', icon:'🌐', title:'Choose Your Language', desc:'Click the 🇮🇳 selector in the top-right corner. Support for 7+ Indian languages.' },
    { num:'2', icon:'🏛️', title:'Select Election Type', desc:'Toggle between Lok Sabha and State Assembly modes in the navigation bar.' },
    { num:'3', icon:'📖', title:'Explore the Process', desc:'Read step-by-step process cards explaining every key election phase.' },
    { num:'4', icon:'📅', title:'Follow the Timeline', desc:'The interactive timeline shows every milestone from announcement to government formation.' },
    { num:'5', icon:'🗳️', title:'Register to Vote', desc:'Registration section tells you if you are eligible and what docs you need.' },
    { num:'6', icon:'💬', title:'Chat with VoteMate', desc:'Click "Ask VoteMate" for AI-powered answers. Add your Gemini key for full power.' },
  ],
  hi: [
    { num:'1', icon:'🌐', title:'अपनी भाषा चुनें', desc:'ऊपरी दाएं कोने में 🇮🇳 चयनकर्ता पर क्लिक करें। 7+ भारतीय भाषाओं के लिए समर्थन।पि' },
    { num:'2', icon:'🏛️', title:'चुनाव प्रकार चुनें', desc:'नेविगेशन बार में लोकसभा और राज्य विधानसभा मोड के बीच टॉगल करें।' },
    { num:'3', icon:'📖', title:'प्रक्रिया देखें', desc:'प्रमुख चुनाव चरणों की व्याख्या करने वाले चरण-दर-चरण कार्ड पढ़ें।' },
    { num:'4', icon:'📅', title:'समयरेखा का पालन करें', desc:'घोषणा से सरकार गठन तक के हर पड़ाव को समयरेखा में देखें।' },
    { num:'5', icon:'🗳️', title:'वोट के लिए पंजीकरण', desc:'पंजीकरण अनुभाग आपको पात्रता और आवश्यक दस्तावेजों के बारे में बताता है।' },
    { num:'6', icon:'💬', title:'VoteMate से बात करें', desc:'AI-संचालित उत्तरों के लिए "VoteMate से पूछें" पर क्लिक करें। पूर्ण शक्ति के लिए अपनी कुंजी जोड़ें।' },
  ],
  ta: [
    { num:'1', icon:'🌐', title:'மொழியைத் தேர்ந்தெடுக்கவும்', desc:'7+ மொழிகள் ஆதரிக்கப்படுகின்றன.' },
    { num:'2', icon:'🏛️', title:'தேர்தல் வகை', desc:'மக்களவை அல்லது சட்டமன்றத்தை தேர்வு செய்யவும்.' }
  ],
  bn: [
    { num:'1', icon:'🌐', title:'ভাষা চয়ন করুন', desc:'আপনার পছন্দসই ভাষা নির্বাচন করুন।' },
  ],
  te: [
    { num:'1', icon:'🌐', title:'భాషను ఎంచుకోండి', desc:'మీకు నచ్చిన భాషను ఎంచుకోండి।' },
  ],
  mr: [
    { num:'1', icon:'🌐', title:'भाषा निवडा', desc:'तुमची आवडती भाषा निवडा।' },
  ],
  gu: [
    { num:'1', icon:'🌐', title:'ભાષા પસંદ કરો', desc:'તમારી પસંદગીની ભાષા પસંદ કરો।' },
  ]
};

const GUIDE_FEATURES = {
  en: [
    { icon:'🌐', title:'Choose Your Language', desc:'Click the language selector in the top-right corner. Supports English, Hindi, Tamil, etc.' },
    { icon:'📊', title:'Interactive Timeline', desc:'Visual representation of the entire election journey from notification to results.' },
    { icon:'📋', title:'Registration Guide', desc:'Detailed requirements and steps to become a registered voter in India.' },
    { icon:'🤖', title:'Smart AI Assistant', desc:'Ask any election-related query and get instant localized answers powered by Gemini.' }
  ],
  hi: [
    { icon:'🌐', title:'अपनी भाषा चुनें', desc:'ऊपरी दाएं कोने में भाषा चयनकर्ता पर क्लिक करें। अंग्रेजी, हिंदी, तमिल आदि का समर्थन करता है।' },
    { icon:'📊', title:'इंटरएक्टिव समयरेखा', desc:'अधिसूचना से परिणामों तक पूरी चुनाव यात्रा का दृश्य प्रतिनिधित्व।' },
    { icon:'📋', title:'पंजीकरण गाइड', desc:'भारत में पंजीकृत मतदाता बनने के लिए विस्तृत आवश्यकताएं और चरण।' },
    { icon:'🤖', title:'स्मार्ट AI सहायक', desc:'चुनाव संबंधी कोई भी प्रश्न पूछें और Gemini द्वारा संचालित त्वरित स्थानीय उत्तर प्राप्त करें।' }
  ],
  ta: [
    { icon:'🌐', title:'உங்கள் மொழியைத் தேர்வுசெய்க', desc:'ஆங்கிலம், இந்தி, தமிழ் போன்ற மொழிகளை ஆதரிக்கிறது.' }
  ],
  bn: [
    { icon:'🌐', title:'আপনার ভাষা চয়ন করুন', desc:'বাংলা সহ অন্যান্য ভাষা সমর্থিত।' }
  ],
  te: [
    { icon:'🌐', title:'మీ భాషను ఎంచుకోండి', desc:'తెలుగు మరియు ఇతర భాషలు అందుబాటులో ఉన్నాయి।' }
  ],
  mr: [
    { icon:'🌐', title:'तुमची भाषा निवडा', desc:'मराठी आणि इतर भाषा समर्थित आहेत।' }
  ],
  gu: [
    { icon:'🌐', title:'તમારી ભાષા પસંદ કરો', desc:'ગુજરાતી અને અન્ય ભાષાઓ ઉપલબ્ધ છે।' }
  ]
};

const PHOTO_STRIP = [
  { url:'assets/images/parliament.png', caption:'Parliament House' },
  { url:'assets/images/vote-box.png', caption:'Democracy in Action' },
  { url:'assets/images/voters-ballot.png', caption:'Citizen Participation' },
  { url:'assets/images/india-flag.png', caption:'Pride of India' },
  { url:'assets/images/election-campaign.png', caption:'Election Spirit' },
];

window.PROCESS_CARDS = PROCESS_CARDS;
window.TIMELINE_STEPS = TIMELINE_STEPS;
window.ELIGIBILITY = ELIGIBILITY;
window.REG_STEPS = REG_STEPS;
window.DOCS = DOCS;
window.FAQ_DATA = FAQ_DATA;
window.GUIDE_FEATURES = GUIDE_FEATURES;
window.GUIDE_STEPS = GUIDE_STEPS;
window.PHOTO_STRIP = PHOTO_STRIP;
