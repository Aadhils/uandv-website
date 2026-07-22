import type { DiscoveryCopy } from '../types';
import { enDiscovery } from './en';

/** Hindi discovery — warm consultant voice (human-authored). */
export const hiDiscovery: DiscoveryCopy = {
  ...enDiscovery,
  language: 'hi',
  sectionBadge: 'U&V के साथ एक बातचीत',
  bridgeTitle: 'सबसे पहले आपके व्यवसाय को समझते हैं।',
  bridgeBody: [
    'हर सफल व्यवसाय सही समझ से शुरू होता है।',
    'मैं केवल कुछ आसान प्रश्न पूछूँगा।',
    'कोई दबाव नहीं।',
    'कोई तकनीकी भाषा नहीं।',
    'यह कोई फ़ॉर्म नहीं है।',
    'यह एक बातचीत है।',
  ].join('\n'),
  startCta: 'चलिए शुरू करते हैं',
  progressBeginLabel: 'शुरू करते हैं',
  progressConversationLabel: 'बातचीत {current} / {total}',
  progressCompleteLabel: 'आपको जानना',
  backLabel: 'वापस जाएँ',
  skipBudgetLabel: 'अभी छोड़ें — कोई दबाव नहीं',
  continueLabel: 'आगे बढ़ें',
  summaryEyebrow: 'जो मैं समझ पाया हूँ',
  summaryTitle: 'अब तक आपके व्यवसाय की स्पष्ट तस्वीर',
  labelYourBusiness: 'आपका व्यवसाय',
  labelCurrentStage: 'आप कहाँ हैं',
  labelMainGoal: 'आपके लिए सबसे ज़रूरी',
  labelBiggestChallenge: 'अभी की चुनौती',
  labelPreferredStart: 'जब आप तैयार हों',
  labelBudget: 'आरामदायक निवेश सीमा',
  labelRecommendedServices: 'आपके विकास के लिए अगले कदम',
  labelEstimatedTimeline: 'सुझाई गई यात्रा अवधि',
  labelBusinessReadiness: 'व्यवसाय तैयारी',
  timelineDays: '{days} दिन',
  disclaimer:
    'यह हमारी बातचीत पर आधारित एक प्रारंभिक सिफ़ारिश है। आपके पूरे व्यवसाय को समझने के बाद U&V विशेषज्ञ एक व्यक्तिगत विकास रणनीति तैयार करेंगे।',
  ctaDownloadRoadmap: 'अपना विकास रोडमैप डाउनलोड करें',
  ctaBookSession: 'मुफ़्त रणनीति बातचीत बुक करें',
  ctaWhatsApp: 'WhatsApp पर बात करें',
  ctaEmailReport: 'यह सारांश ईमेल करें',
  restartLabel: 'यह बातचीत फिर से शुरू करें',
  changeAnswerHint:
    'आप कभी भी वापस जा सकते हैं। यह एक बातचीत है — न फ़ॉर्म, न सर्वे, न परीक्षा।',
  reassuranceMessages: [
    'बहुत अच्छा।',
    'साझा करने के लिए धन्यवाद।',
    'बढ़िया। इससे मुझे आपका व्यवसाय बेहतर समझने में मदद मिली।',
    'उत्तम। चलिए अगले कदम पर चलते हैं।',
    'समझ गया — धन्यवाद।',
    'अब तस्वीर और साफ़ हो रही है।',
  ],
  questions: {
    industry: {
      prompt: 'हम किस तरह के व्यवसाय की बात कर रहे हैं?',
      helper: 'सबसे नज़दीकी विकल्प चुनें। विवरण हम बाद में साथ मिलकर साफ़ करेंगे।',
    },
    stage: {
      prompt: 'आज आपका व्यवसाय कहाँ खड़ा है?',
      helper: 'कोई सही या गलत जवाब नहीं — मैं वहीं से शुरू करना चाहता हूँ जहाँ आप हैं।',
    },
    challenge: {
      prompt: 'अभी आपके मन में सबसे बड़ी चुनौती क्या है?',
      helper: 'जो आज सबसे ज़रूरी लगे, वही चुनें।',
    },
    goal: {
      prompt: 'अगला अध्याय आपके लिए कैसा दिखना चाहिए?',
      helper: 'सही विकास मार्ग दिखाने में इससे मदद मिलती है।',
    },
    timeline: {
      prompt: 'अगला कदम आप कब उठाना चाहेंगे?',
      helper: 'ईमानदारी से बताएँ — वास्तविक गति हमें बेहतर साथ देने में मदद करती है।',
    },
    budget: {
      prompt: 'अभी के लिए कौन-सी निवेश सीमा आरामदायक लगती है?',
      helper: 'वैकल्पिक। तैयार न हों तो छोड़ दें — बिल्कुल कोई दबाव नहीं।',
    },
  },
};
