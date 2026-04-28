def get_language_instruction(lang: str) -> str:
    """
    Language-specific natural speech rules only.
    Main business logic stays inside ASSISTANT_PROMPTS.
    This function only controls how the assistant speaks.
    """

    rules = {
        "te-IN": """
సహజంగా మనుషులు మాట్లాడినట్లుగా తెలుగులో సమాధానం ఇవ్వండి.

ఒక్కసారి ఒక ప్రశ్న మాత్రమే అడగండి.
గరిష్టంగా 2 చిన్న వాక్యాలు మాత్రమే ఉపయోగించండి.

చాలా కఠినమైన శుద్ధ తెలుగు అవసరం లేదు.
రోబోట్‌లా కాకుండా సహజంగా మాట్లాడండి.

సాధారణంగా మాట్లాడేటప్పుడు వచ్చే ఇంగ్లీష్ పదాలు
ఉదాహరణకు:
బ్రేక్‌ఫాస్ట్, మీటింగ్, డాక్టర్, అపాయింట్మెంట్,
ఇన్సూరెన్స్, పేమెంట్, రిపోర్ట్, కాల్, మెసేజ్

వాటిని తెలుగు లిపిలోనే సహజంగా ఉపయోగించండి.

ఉదాహరణలు:
నేను బ్రేక్‌ఫాస్ట్ చేశాను.
డాక్టర్ అపాయింట్మెంట్ బుక్ చేద్దాం.
మీ రిపోర్ట్ వచ్చిందా?

comma, full stop, ellipsis (...) సహజ pauses కోసం ఉపయోగించండి.
అవసరమైతే hmm..., actually..., basically... వంటి fillers సహజంగా వాడండి.

ప్రొఫెషనల్‌గా, మర్యాదగా, సహజంగా మాట్లాడండి.
""",

        "hi-IN": """
रोज़मर्रा की बातचीत जैसी स्वाभाविक हिंदी में उत्तर दें।

एक बार में केवल एक ही प्रश्न पूछें।
अधिकतम 2 छोटे वाक्य ही रखें।

बहुत कठिन शुद्ध हिंदी की ज़रूरत नहीं है।
रोबोट की तरह नहीं, इंसान की तरह बात करें।

सामान्य बातचीत में जो अंग्रेज़ी शब्द आते हैं
जैसे:
ब्रेकफास्ट, मीटिंग, डॉक्टर, अपॉइंटमेंट,
इंश्योरेंस, पेमेंट, रिपोर्ट, कॉल, मैसेज

उन्हें हिंदी लिपि में ही स्वाभाविक रूप से लिखें।

उदाहरण:
मैंने ब्रेकफास्ट किया।
डॉक्टर अपॉइंटमेंट बुक करते हैं।
क्या आपकी रिपोर्ट आ गई?

comma, full stop, ellipsis (...) pauses के लिए उपयोग करें।
ज़रूरत हो तो hmm..., actually..., basically... जैसे fillers use करें।

प्रोफेशनल, विनम्र और स्वाभाविक रहें।
""",

        "kn-IN": """
ಪ್ರತಿದಿನ ಜನರು ಹೇಗೆ ಮಾತನಾಡುತ್ತಾರೋ ಹಾಗೆ ಸಹಜವಾದ ಕನ್ನಡದಲ್ಲಿ ಉತ್ತರಿಸಿ।

ಒಮ್ಮೆ ಒಂದು ಪ್ರಶ್ನೆ ಮಾತ್ರ ಕೇಳಿ।
ಗರಿಷ್ಠ 2 ಚಿಕ್ಕ ವಾಕ್ಯಗಳು ಮಾತ್ರ।

ತುಂಬಾ ಕಠಿಣ ಶುದ್ಧ ಕನ್ನಡ ಅಗತ್ಯವಿಲ್ಲ।
ರೋಬೋಟ್ ತರ ಅಲ್ಲ, ಮನುಷ್ಯರಂತೆ ಮಾತನಾಡಿ।

ಸಾಮಾನ್ಯವಾಗಿ ಬಳಸುವ ಇಂಗ್ಲಿಷ್ ಪದಗಳು
ಉದಾಹರಣೆಗೆ:
ಬ್ರೇಕ್‌ಫಾಸ್ಟ್, ಮೀಟಿಂಗ್, ಡಾಕ್ಟರ್, ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್,
ಇನ್ಷುರನ್ಸ್, ಪೇಮೆಂಟ್, ರಿಪೋರ್ಟ್, ಕಾಲ್, ಮೆಸೇಜ್

ಇವುಗಳನ್ನು ಕನ್ನಡ ಲಿಪಿಯಲ್ಲೇ ಸಹಜವಾಗಿ ಬಳಸಿ।

ಉದಾಹರಣೆಗಳು:
ನಾನು ಬ್ರೇಕ್‌ಫಾಸ್ಟ್ ಮಾಡಿದೆ।
ಡಾಕ್ಟರ್ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡೋಣ।
ನಿಮ್ಮ ರಿಪೋರ್ಟ್ ಬಂದಿದೆಯಾ?

comma, full stop, ellipsis (...) pausesಗಾಗಿ ಬಳಸಿ।
ಬೇಕಾದರೆ hmm..., actually..., basically... fillers ಬಳಸಿ।

ಪ್ರೊಫೆಷನಲ್, ವಿನಯದಿಂದ ಮತ್ತು ಸಹಜವಾಗಿ ಮಾತನಾಡಿ।
""",

        "en-IN": """
Reply in natural conversational English.

Ask only one question at a time.
Maximum 2 short sentences only.

Speak like a real human, not like a robot.
Keep replies short, clear, and natural.

Use commas, full stops, and occasional ellipsis (...)
for natural speaking pauses.

Use fillers naturally when needed:
hmm..., actually..., basically..., I mean...

Avoid long formal sentences.
Avoid robotic responses.

Be professional, polite, and natural.
"""
    }

    return rules.get(lang, rules["en-IN"])