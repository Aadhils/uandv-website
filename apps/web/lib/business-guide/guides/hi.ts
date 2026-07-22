import type { BusinessGuideCopy } from '../types';

/** Hindi business guide — conversational consultant voice (human-authored). */
export const hiGuide: BusinessGuideCopy = {
  language: 'hi',
  badge: 'आपका व्यक्तिगत बिज़नेस गाइड',
  languagePrompt: 'मैं आपको किस भाषा में गाइड करूँ?',
  languageHelper:
    'पूरी यात्रा में मैं इसी भाषा में आपके साथ रहूँगा/रहूँगी। वेबसाइट का बाकी हिस्सा अंग्रेज़ी में ही रहेगा।',
  greeting:
    'मैं आपके साथ हूँ — जैसे एक भरोसेमंद बिज़नेस सलाहकार आपके सामने बैठा हो। बताइए आप क्या हासिल करना चाहते हैं, मैं साफ़ रास्ता दिखाऊँगा। कोई दबाव नहीं, कोई उलझाने वाली भाषा नहीं।',
  question: 'आज आप क्या हासिल करना चाहेंगे?',
  scrollHint:
    'अभी चुनने के लिए तैयार नहीं? कोई बात नहीं — नीचे स्क्रॉल करके हमारा काम देख सकते हैं।',
  panelEyebrow: 'ऐसे हम साथ-साथ आगे बढ़ेंगे',
  stepsLabel: 'आपके लिए सुझाया गया रास्ता',
  partnerPrompt: 'किस तरह की पार्टनरशिप आपको सही लगती है?',
  nextStepPrompt:
    'जब तैयार हों, अगला कदम चुनें। आपकी यात्रा हमें पहले से पता होगी — बातचीत ठंडी नहीं, गर्मजोशी से शुरू होगी।',
  clearSelection: 'कोई और लक्ष्य चुनें',
  changeLanguage: 'गाइड की भाषा बदलें',
  ctaContinue: 'चलिए शुरू करते हैं',
  ctaConsultation: 'मुफ़्त रणनीति बातचीत बुक करें',
  ctaPartner: 'U&V के साथ पार्टनर बनें',
  journeys: [
    {
      id: 'start-new-business',
      title: 'नया बिज़नेस शुरू करें',
      description:
        'आपके पास एक आइडिया है। चलिए उसे कदम-दर-कदम असली बिज़नेस बनाते हैं — बिना घबराहट के।',
      icon: 'Rocket',
      interestSlug: 'startup-business-consulting',
      visitorType: 'new-business',
      consultantIntro:
        'कुछ नया शुरू करना हिम्मत मांगता है। आइडिया से रजिस्ट्रेशन, ब्रांडिंग और मार्केट-रेडी बिज़नेस तक — मैं आपको सुरक्षित लगने वाली रफ़्तार से गाइड करूँगा।',
      reassurance:
        'सब कुछ अभी पता होना ज़रूरी नहीं। पहले स्पष्टता, फिर आगे बढ़ना।',
      steps: [
        {
          id: 'idea',
          label: 'आइडिया',
          coachNote: 'आप क्या बना रहे हैं और किसके लिए — इसे साफ़ करते हैं।',
        },
        {
          id: 'registration',
          label: 'रजिस्ट्रेशन',
          coachNote: 'कानूनी और सेटअप की बुनियाद साफ़ तरीके से रखवाते हैं।',
        },
        {
          id: 'branding',
          label: 'ब्रांडिंग',
          coachNote: 'ऐसा नाम और रूप बनाते हैं जिस पर लोग भरोसा करें।',
        },
        {
          id: 'website-app',
          label: 'वेबसाइट/ऐप',
          coachNote: 'ग्राहकों को आपको खोजने और चुनने की जगह देते हैं।',
        },
        {
          id: 'marketing',
          label: 'मार्केटिंग',
          coachNote: 'सही लोग आपकी ऑफ़र तक पहुँच सकें — इसमें मदद करते हैं।',
        },
        {
          id: 'growth',
          label: 'ग्रोथ',
          coachNote: 'ट्रैक्शन सिस्टम बने तब तक आपके साथ रहते हैं।',
        },
      ],
    },
    {
      id: 'grow-existing-business',
      title: 'मौजूदा बिज़नेस बढ़ाएँ',
      description:
        'आप पहले से चला रहे हैं। जो काम कर रहा है उसे मज़बूत करें, जो रोक रहा है उसे हटाएँ।',
      icon: 'TrendingUp',
      interestSlug: 'digital-marketing',
      visitorType: 'existing-business',
      consultantIntro:
        'ग्रोथ का मतलब सब कुछ ज़्यादा करना नहीं है। बिज़नेस को ईमानदारी से देखकर, अगले स्तर के कुछ सही कदमों पर ध्यान देंगे।',
      reassurance:
        'आपके पास पहले से गति है। हमारा काम उसे बचाना — और बढ़ाना है।',
      steps: [
        {
          id: 'audit',
          label: 'बिज़नेस ऑडिट',
          coachNote: 'क्या मज़बूत है, क्या अटका है, क्या कमी है — देखते हैं।',
        },
        {
          id: 'digital-presence',
          label: 'डिजिटल उपस्थिति',
          coachNote: 'ऑनलाइन आपको ढूँढना और भरोसा करना आसान बनाते हैं।',
        },
        {
          id: 'crm-erp',
          label: 'CRM/ERP',
          coachNote: 'सेल्स, ऑपरेशन और डेटा को व्यवस्थित रखते हैं।',
        },
        {
          id: 'marketing',
          label: 'मार्केटिंग',
          coachNote: 'लीड और रिटेंशन के लिए स्थिर इंजन बनाते हैं।',
        },
        {
          id: 'automation',
          label: 'ऑटोमेशन',
          coachNote: 'दोहराए जाने वाले काम हटाकर टीम को स्केल करने देते हैं।',
        },
        {
          id: 'growth',
          label: 'ग्रोथ',
          coachNote: 'एक बार का प्रोजेक्ट नहीं — लगातार सुधार के साथ।',
        },
      ],
    },
    {
      id: 'build-software-or-app',
      title: 'सॉफ़्टवेयर या ऐप बनाएँ',
      description:
        'आपको सही तरीक़े से बना उत्पाद चाहिए — साफ़ प्लान, अच्छा डिज़ाइन, भरोसेमंद डिलीवरी।',
      icon: 'Code2',
      interestSlug: 'custom-software-development',
      visitorType: 'software-buyer',
      consultantIntro:
        'सॉफ़्टवेयर बनाना अव्यवस्थित नहीं, नियंत्रित लगना चाहिए। आवश्यकता से लॉन्च तक साधारण भाषा और साफ़ माइलस्टोन के साथ साथ चलूँगा।',
      reassurance:
        'हम क्या बना रहे हैं, क्यों ज़रूरी है, आगे क्या है — यह हमेशा स्पष्ट रहेगा।',
      steps: [
        {
          id: 'requirement',
          label: 'ज़रूरत',
          coachNote: 'पहले सुनते हैं — लक्ष्य, यूज़र, सीमाएँ।',
        },
        {
          id: 'solution-plan',
          label: 'सॉल्यूशन प्लान',
          coachNote: 'सही आर्किटेक्चर और डिलीवरी प्लान बनाते हैं।',
        },
        {
          id: 'ui-ux',
          label: 'UI/UX',
          coachNote: 'ऐसा अनुभव डिज़ाइन करते हैं जो लोग सच में पसंद करें।',
        },
        {
          id: 'development',
          label: 'डेवलपमेंट',
          coachNote: 'ऐसे चरणों में बनाते हैं जिन्हें आप देख और Approve कर सकें।',
        },
        {
          id: 'testing',
          label: 'टेस्टिंग',
          coachNote: 'ग्राहक से पहले गुणवत्ता जाँचते हैं।',
        },
        {
          id: 'launch',
          label: 'लॉन्च',
          coachNote: 'सावधानी से लाइव करते हैं — फिर सपोर्ट जारी रहता है।',
        },
      ],
    },
    {
      id: 'automate-with-ai',
      title: 'AI से बिज़नेस ऑटोमेट करें',
      description:
        'मैन्युअल काम ज़्यादा है? देखें AI कहाँ सुरक्षित और व्यावहारिक तरीक़े से समय बचा सकता है।',
      icon: 'Bot',
      interestSlug: 'ai-automation',
      visitorType: 'ai-automation',
      consultantIntro:
        'AI बोझ घटाए, उलझन न बढ़ाए। असली प्रक्रियाओं से शुरू करेंगे, और सिर्फ़ वहीं ऑटोमेट करेंगे जहाँ साफ़ फ़ायदा दिखे।',
      reassurance:
        'कोई हाइप नहीं। सिर्फ़ ऐसी ऑटोमेशन जिसे आपकी टीम समझे और भरोसा करे।',
      steps: [
        {
          id: 'process-analysis',
          label: 'प्रोसेस विश्लेषण',
          coachNote: 'आज काम असल में कैसे होता है — उसे मैप करते हैं।',
        },
        {
          id: 'opportunities',
          label: 'ऑटोमेशन अवसर',
          coachNote: 'पहले ज़्यादा असर वाले काम चुनते हैं।',
        },
        {
          id: 'ai-solution',
          label: 'AI समाधान',
          coachNote: 'आपके बिज़नेस के अनुकूल AI तरीक़ा डिज़ाइन करते हैं।',
        },
        {
          id: 'integration',
          label: 'इнтеग्रेशन',
          coachNote: 'टीम के मौजूदा टूल्स से जोड़ते हैं।',
        },
        {
          id: 'monitoring',
          label: 'मॉनिटरिंग',
          coachNote: 'नतीजे देखते हैं और समय के साथ सुधारते हैं।',
        },
      ],
    },
    {
      id: 'partner-with-uandv',
      title: 'U&V के साथ पार्टनर बनें',
      description:
        'सिर्फ़ क्लाइंट नहीं — साथ मिलकर बढ़ना चाहते हैं।',
      icon: 'Handshake',
      interestSlug: 'startup-business-consulting',
      visitorType: 'partner',
      consultantIntro:
        'अच्छी पार्टनरशिप स्पष्टता से शुरू होती है। बताइए आप कैसे साथ काम करना चाहते हैं — सम्मानजनक, व्यावहारिक अगला कदम दिखाऊँगा।',
      reassurance:
        'चाहे आप बनाएँ, मार्केट करें, रेफ़र करें या निवेश करें — रिश्ते को सावधानी से संभालेंगे।',
      partnerTypes: [
        {
          id: 'technology-partner',
          label: 'टेक्नोलॉजी पार्टनर',
          description:
            'साझा क्लाइंट्स के लिए सॉफ़्टवेयर, AI और डिजिटल प्रोडक्ट साथ बनाएँ।',
        },
        {
          id: 'freelancer-developer',
          label: 'फ़्रीलांसर / डेवलपर',
          description:
            'जब प्रोजेक्ट्स को भरोसेमंद हाथ चाहिए हों, डिलीवरी में साथ जुड़ें।',
        },
        {
          id: 'marketing-partner',
          label: 'मार्केटिंग पार्टनर',
          description:
            'कैंपेन, कंटेंट और परफ़ॉर्मेंस से ब्रांड्स को साथ बढ़ाएँ।',
        },
        {
          id: 'vendor-service-provider',
          label: 'वेंडर / सर्विस प्रोवाइडर',
          description:
            'पूरक सेवाओं को एक जुड़े हुए क्लाइंट अनुभव में लाएँ।',
        },
        {
          id: 'referral-partner',
          label: 'रेफ़रल पार्टनर',
          description:
            'सही अवसरों का परिचय कराएँ — और आपसी भरोसे से बढ़ें।',
        },
        {
          id: 'investor-strategic-partner',
          label: 'इन्वेस्टर / स्ट्रेटेजिक पार्टनर',
          description:
            'लंबी अवधि की रणनीतिक या निवेश बातचीत को सावधानी से देखें।',
        },
      ],
    },
  ],
};
