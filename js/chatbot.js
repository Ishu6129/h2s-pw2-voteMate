// js/chatbot.js — VoteMate Chat Logic (Gemini API + Rule-based fallback)
// Includes: rate limiting, exponential backoff, multi-lingual support

// ── Rate Limiter ──────────────────────────────────────
const rateLimiter = {
  lastRequestTime: 0,
  minInterval: 4000,
  record() { this.lastRequestTime = Date.now(); },
  canRequest() { return (Date.now() - this.lastRequestTime) >= this.minInterval; },
  waitTime() { return Math.max(0, this.minInterval - (Date.now() - this.lastRequestTime)); }
};

// ── Rule-Based Responses (Multi-lingual Fallback) ───────
const RULE_RESPONSES = {
  en: {
    voter_id: 'Your Voter ID (EPIC — Elector Photo Identity Card) is issued by ECI. Apply online at nvsp.in by filling Form 6. You can also download your e-EPIC digitally from the Voter Portal. 🪪',
    register: 'To register as a new voter:\n1️⃣ Visit nvsp.in or use the Voter Helpline App\n2️⃣ Fill Form 6 with your details\n3️⃣ Upload age proof + address proof\n4️⃣ Submit — a BLO will verify your application\n5️⃣ Receive your e-EPIC or physical EPIC card 📋',
    eligibility: 'Eligibility to vote in India:\n✅ Indian citizen\n✅ Age 18+ as of Jan 1 of qualifying year\n✅ Ordinarily resident of the constituency\n✅ Not disqualified under any law\n\nNRIs with Indian passports can also register! 🇮🇳',
    evm: '🗳️ EVM (Electronic Voting Machine) is tamper-proof with no internet — used to cast votes electronically.\n\n📄 VVPAT (Voter Verifiable Paper Audit Trail) shows a paper slip with your chosen party symbol for 7 seconds so you can verify your vote. ✅',
    election: 'An election is a formal group decision-making process by which a population chooses an individual or multiple individuals to hold public office. In India, it is the festival of democracy where every vote counts! 🗳️',
    default: 'I\'m not sure about that specific query. For accurate information:\n📞 Call Voter Helpline: 1950 (Toll Free)\n🌐 Visit: eci.gov.in or nvsp.in\n\nOr use quick questions below to explore common topics! 💬',
    hello: 'Jai Hind! 🇮🇳 Welcome to VoteMate — your guide to Indian elections!\n\nHow can I help you today? 😊'
  },
  hi: {
    voter_id: 'आपका वोटर आईडी (EPIC) चुनाव आयोग द्वारा जारी किया जाता है। फॉर्म 6 भरकर nvsp.in पर ऑनलाइन आवेदन करें। आप वोटर पोर्टल से अपना ई-एपिक भी डाउनलोड कर सकते हैं। 🪪',
    register: 'नये मतदाता के रूप में पंजीकरण के लिए:\n1️⃣ nvsp.in पर जाएं या वोटर हेल्पलाइन ऐप का उपयोग करें\n2️⃣ फॉर्म 6 भरें\n3️⃣ आयु और पते का प्रमाण अपलोड करें\n4️⃣ सबमिट करें — बीएलओ आपके आवेदन का सत्यापन करेगा 📋',
    eligibility: 'भारत में मतदान के लिए पात्रता:\n✅ भारतीय नागरिक\n✅ अर्हक वर्ष की 1 जनवरी को आयु 18+\n✅ निर्वाचन क्षेत्र का सामान्य निवासी\n✅ किसी भी कानून के तहत अयोग्य नहीं 🇮🇳',
    evm: '🗳️ EVM एक छेड़छाड़-मुक्त मशीन है जिसका इंटरनेट से कोई संबंध नहीं है।\n\n📄 VVPAT एक पर्ची दिखाता है जिससे आप 7 सेकंड तक अपने वोट की पुष्टि कर सकते हैं। ✅',
    election: 'चुनाव एक औपचारिक सामूहिक निर्णय लेने की प्रक्रिया है जिसके द्वारा जनता सार्वजनिक पद के लिए एक व्यक्ति या कई व्यक्तियों का चयन करती है। भारत में, यह लोकतंत्र का उत्सव है! 🗳️',
    default: 'मुझे उस विशिष्ट प्रश्न के बारे में यकीन नहीं है। सटीक जानकारी के लिए:\n📞 वोटर हेल्पलाइन: 1950\n🌐 वेबसाइट: eci.gov.in या nvsp.in',
    hello: 'जय हिंद! 🇮🇳 VoteMate में आपका स्वागत है!\n\nमैं आज आपकी कैसे मदद कर सकता हूँ? 😊'
  },
  bn: {
    voter_id: 'আপনার ভোটার আইডি (EPIC) নির্বাচন কমিশন দ্বারা জারি করা হয়। nvsp.in-এ অনলাইনে আবেদন করুন। 🪪',
    register: 'নতুন ভোটার হিসেবে নিবন্ধনের জন্য nvsp.in দেখুন। 📋',
    eligibility: 'ভারতে ভোট দেওয়ার যোগ্যতা: ১৮ বছর বয়স এবং ভারতীয় নাগরিকত্ব। 🇮🇳',
    evm: '🗳️ EVM একটি ইলেকট্রনিক ভোটিং মেশিন। ✅',
    election: 'নির্বাচন হল একটি আনুষ্ঠানিক গোষ্ঠীগত সিদ্ধান্ত গ্রহণের প্রক্রিয়া যার মাধ্যমে একটি জনসংখ্যা জনপদ ধরে রাখার জন্য একজন ব্যক্তি বা একাধিক ব্যক্তিকে বেছে নেয়। ভারতে এটি গণতন্ত্রের উৎসব! 🗳️',
    default: 'আমি আপনার প্রশ্নটি ঠিক বুঝতে পারিনি। আরও তথ্যের জন্য ১৯৫০ নম্বরে কল করুন। 💬',
    hello: 'জয় হিন্দ! 🇮🇳 VoteMate-এ আপনাকে স্বাগত! আমি আপনাকে কীভাবে সাহায্য করতে পারি? 😊'
  },
  te: {
    voter_id: 'మీ ఓటరు ఐడి (EPIC) ఎన్నికల సంఘం జారీ చేస్తుంది. nvsp.in లో దరఖాస్తు చేయండి. 🪪',
    register: 'కొత్త ఓటరుగా నమోదు చేసుకోవడానికి nvsp.in సందర్శించండి. 📋',
    eligibility: 'ఓటు హక్కు అర్హత: 18 ఏళ్లు నిండిన భారతీయ పౌరులు. 🇮🇳',
    evm: '🗳️ EVM అనేది ఎలక్ట్రానిక్ ఓటింగ్ మెషిన్. ✅',
    election: 'ఎన్నికలు అనేది ఒక అధికారిక సమూహ నిర్ణయాత్మక ప్రక్రియ, దీని ద్వారా జనాభా ఒక వ్యక్తిని లేదా బహుళ వ్యక్తులను ఎన్నుకుంటారు. భారతదేశంలో, ఇది ప్రజాస్వామ్య పండుగ! 🗳️',
    default: 'మీరు అడిగిన ప్రశ్న నాకు అర్థం కాలేదు. మరిన్ని వివరాల కోసం 1950 కి కాల్ చేయండి. 💬',
    hello: 'జై హింద్! 🇮🇳 VoteMate కి స్వాగతం! నేను మీకు ఎలా సహాయం చేయగలను? 😊'
  },
  mr: {
    voter_id: 'तुमचे मतदार ओळखपत्र (EPIC) निवडणूक आयोगाद्वारे जारी केले जाते. nvsp.in वर अर्ज करा. 🪪',
    register: 'नवीन मतदार नोंदणीसाठी nvsp.in ला भेट द्या. 📋',
    eligibility: 'मतदानासाठी पात्रता: १८ वर्षे पूर्ण आणि भारतीय नागरिकत्व. 🇮🇳',
    evm: '🗳️ EVM हे इलेक्ट्रॉनिक मतदान यंत्र आहे. ✅',
    election: 'निवडणूक ही एक औपचारिक समूह निर्णय घेण्याची प्रक्रिया आहे ज्याद्वारे लोक सार्वजनिक पदावर राहण्यासाठी एक किंवा अनेक व्यक्तींची निवड करतात. भारतात हा लोकशाहीचा उत्सव आहे! 🗳️',
    default: 'मला तुमच्या प्रश्नाचे उत्तर माहित नाही. अधिक माहितीसाठी १९५০ वर कॉल करा. 💬',
    hello: 'जय हिंद! 🇮🇳 VoteMate मध्ये आपले स्वागत आहे! मी तुम्हाला कशी मदत करू शकतो? 😊'
  },
  gu: {
    voter_id: 'તમારું મતદાર ઓળખકાર્ડ (EPIC) ચૂંટણી પંચ દ્વારા જારી કરવામાં આવે છે. nvsp.in પર અરજી કરો. 🪪',
    register: 'નવા મતદાર તરીકે નોંધણી માટે nvsp.in ની મુલાકાત લો. 📋',
    eligibility: 'મતદાન માટેની પાત્રતા: ૧૮ વર્ષ પૂર્ણ અને ભારતીય નાગરિકત્વ. 🇮🇳',
    evm: '🗳️ EVM એ ઇલેક્ટ્રોનિક વોટિંગ મશીન છે. ✅',
    election: 'ચૂંટણી એ એક ઔપચારિક જૂથ નિર્ણય લેવાની પ્રક્રિયા છે જેના દ્વારા વસ્તી જાહેર પદ ધરાવવા માટે એક વ્યક્તિ અથવા બહુવિધ વ્યક્તિઓને પસંદ કરે છે. ભારતમાં આ લોકશાહીનો ઉત્સવ છે! 🗳️',
    default: 'મને તમારા પ્રશ્નનો ઉત્તર ખબર નથી. વધુ માહિતી માટે ૧૯૫૦ પર કોલ કરો. 💬',
    hello: 'જય હિન્દ! 🇮🇳 VoteMate માં આપનું સ્વાગત છે! હું તમને કેવી રીતે મદદ કરી શકું? 😊'
  }
};

function getRuleBasedResponse(message, lang = 'en') {
  const lower = message.toLowerCase();
  const res = RULE_RESPONSES[lang] || RULE_RESPONSES.en;
  
  if (lower.includes('voter id') || lower.includes('epic') || lower.includes('id card') || lower.includes('पहचान पत्र') || lower.includes('அடையாள அட்டை')) return res.voter_id;
  if (lower.includes('register') || lower.includes('enroll') || lower.includes('form 6') || lower.includes('पंजीकरण') || lower.includes('பதிவு')) return res.register;
  if (lower.includes('eligib') || lower.includes('age') || lower.includes('पात्रता') || lower.includes('तகுதி') || lower.includes('வயது')) return res.eligibility;
  if (lower.includes('evm') || lower.includes('vvpat') || lower.includes('machine') || lower.includes('मशीन')) return res.evm;
  if (lower.includes('election') || lower.includes('चुनाव') || lower.includes('தேர்தல்') || lower.includes('নির্বাচন')) return res.election;
  if (lower.includes('hi') || lower.includes('hello') || lower.includes('namaste') || lower.includes('jai hind') || lower.includes('नमस्ते') || lower.includes('வணக்கம்') || lower.includes('জয় হিন্দ')) return res.hello;
  
  return res.default;
}

// ── Backend API Integration ──────────────────────────────
async function callGeminiAPI(message, lang, retries = 1) {
  const langName = window.LANGUAGES.find(l => l.code === lang)?.name || 'English';
  
  if (!rateLimiter.canRequest()) {
    await new Promise(r => setTimeout(r, rateLimiter.waitTime()));
  }

  try {
    rateLimiter.record();
    console.log(`Calling Backend API (Lang: ${langName})...`);
    
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, lang, langName })
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.details || `HTTP_${response.status}`);
    }

    const data = await response.json();
    return data.text;

  } catch (err) {
    console.error('Chatbot API Error:', err.message);
    
    // Auto-retry once on failure if it's a transient issue
    if (retries > 0) {
      console.log('Retrying in 2s...');
      await new Promise(r => setTimeout(r, 2000));
      return callGeminiAPI(message, lang, retries - 1);
    }
    return null;
  }
}

async function getResponse(message, lang) {
  // Always try Gemini (Backend) first
  const geminiResp = await callGeminiAPI(message, lang);
  if (geminiResp) {
    return { text: geminiResp, source: 'gemini' };
  }

  // Fallback to rules if backend fails or returns null
  console.log('Falling back to rule-based response.');
  const ruleResp = getRuleBasedResponse(message, lang);
  return { text: ruleResp, source: 'rules' };
}

const SUGGESTIONS = {
  en: ['How do I register to vote?', 'What is EVM & VVPAT?', 'What is Model Code of Conduct?', 'Voter helpline number?'],
  hi: ['मतदाता पंजीकरण कैसे करें?', 'EVM क्या है?', 'आचार संहिता क्या है?', 'हेल्पलाइन नंबर?'],
  ta: ['வாக்காளர் பதிவு எப்படி?', 'EVM என்றால் என்ன?', 'நடத்தை விதிகள் என்ன?', 'உதவி எண்?'],
  bn: ['ভোটার নিবন্ধন কীভাবে?', 'EVM কী?', 'আচার বিধি কী?', 'হেল্পলাইন নম্বর?'],
  te: ['వోటరు నమోదు ఎలా?', 'EVM అంటే ఏమిటి?', 'నియమావళి ఏమిటి?', 'హెల్ప్‌లైన్?'],
  mr: ['मतदार नोंदणी कशी?', 'EVM म्हणजे काय?', 'आचारसंहिता काय?', 'हेल्पलाइन?'],
  gu: ['મતદાર નોંધણી કેવી?', 'EVM શું છે?', 'આચારસંહિતા શું?', 'હેલ્પલાઇન?'],
};

window.getResponse = getResponse;
window.SUGGESTIONS = SUGGESTIONS;
