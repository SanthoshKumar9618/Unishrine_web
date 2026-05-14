# src/domain/config/greetings.py

VOICE_NAME_MAP = {
    "male_1": "Abhilash",
    "female_1": "Vidya",
    "female_2": "Manisha",
}


def _get_gender_word(selected_voice: str) -> str:
    if selected_voice in ["female_1", "female_2"]:
        return {
            "en-IN": "speaking",
            "hi-IN": "बोल रही हूँ",
            "te-IN": "మాట్లాడుతున్నాను",
            "kn-IN": "ಮಾತನಾಡುತ್ತಿದ್ದೇನೆ",
        }

    return {
        "en-IN": "speaking",
        "hi-IN": "बोल रहा हूँ",
        "te-IN": "మాట్లాడుతున్నాను",
        "kn-IN": "ಮಾತನಾಡುತ್ತಿದ್ದೇನೆ",
    }


def _build_greeting_map(
    voice_name: str,
    gender_words: dict,
):
    return {
        "clinic_receptionist": {
            "en-IN": (
                f"Namaste! This is {voice_name} {gender_words['en-IN']} "
                f"from CarePlus Clinic. I can help you with appointment booking. "
                f"May I know your preferred doctor and your name?"
            ),

            "hi-IN": (
                f"नमस्ते! मैं {voice_name} {gender_words['hi-IN']} "
                f"CarePlus Clinic से। मैं आपकी appointment booking में मदद कर सकता हूँ। "
                f"कृपया अपना नाम और पसंदीदा doctor बताइए।"
            ),

            "te-IN": (
                f"నమస్కారం! నేను {voice_name} {gender_words['te-IN']} "
                f"CarePlus Clinic నుండి. మీ appointment booking లో సహాయం చేస్తాను. "
                f"మీ పేరు మరియు కావలసిన doctor పేరు చెప్పండి."
            ),

            "kn-IN": (
                f"ನಮಸ್ಕಾರ! ನಾನು {voice_name} {gender_words['kn-IN']} "
                f"CarePlus Clinic ಇಂದ. ನಿಮ್ಮ appointment booking ನಲ್ಲಿ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ. "
                f"ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರು ಮತ್ತು ಬೇಕಾದ doctor ಹೆಸರನ್ನು ತಿಳಿಸಿ."
            ),
        },

        "insurance_advisor": {
            "en-IN": (
                f"Namaste! This is {voice_name} {gender_words['en-IN']} "
                f"from Bharat Insurance Group. I can help you choose the right insurance plan. "
                f"May I know your age and family coverage needs?"
            ),

            "hi-IN": (
                f"नमस्ते! मैं {voice_name} {gender_words['hi-IN']} "
                f"Bharat Insurance Group से। मैं सही insurance plan चुनने में मदद कर सकता हूँ। "
                f"कृपया अपनी उम्र और family coverage needs बताइए।"
            ),

            "te-IN": (
                f"నమస్కారం! నేను {voice_name} {gender_words['te-IN']} "
                f"Bharat Insurance Group నుండి. సరైన insurance plan ఎంపికలో సహాయం చేస్తాను. "
                f"మీ వయస్సు మరియు family coverage అవసరాలు చెప్పండి."
            ),

            "kn-IN": (
                f"ನಮಸ್ಕಾರ! ನಾನು {voice_name} {gender_words['kn-IN']} "
                f"Bharat Insurance Group ಇಂದ. ಸರಿಯಾದ insurance plan ಆಯ್ಕೆ ಮಾಡಲು ಸಹಾಯ ಮಾಡುತ್ತೇನೆ. "
                f"ನಿಮ್ಮ ವಯಸ್ಸು ಮತ್ತು family coverage ಅಗತ್ಯಗಳನ್ನು ತಿಳಿಸಿ."
            ),
        },

        "ecommerce_support": {
            "en-IN": (
                f"Namaste! This is {voice_name} {gender_words['en-IN']} "
                f"from ShopEasy India. I can help with your order, refund, or delivery issue. "
                f"Please share your order details."
            ),

            "hi-IN": (
                f"नमस्ते! मैं {voice_name} {gender_words['hi-IN']} "
                f"ShopEasy India से। मैं आपके order, refund, या delivery issue में मदद कर सकता हूँ। "
                f"कृपया अपने order details बताइए।"
            ),

            "te-IN": (
                f"నమస్కారం! నేను {voice_name} {gender_words['te-IN']} "
                f"ShopEasy India నుండి. మీ order, refund లేదా delivery సమస్యలో సహాయం చేస్తాను. "
                f"దయచేసి మీ order వివరాలు చెప్పండి."
            ),

            "kn-IN": (
                f"ನಮಸ್ಕಾರ! ನಾನು {voice_name} {gender_words['kn-IN']} "
                f"ShopEasy India ಇಂದ. ನಿಮ್ಮ order, refund ಅಥವಾ delivery ಸಮಸ್ಯೆಯಲ್ಲಿ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ. "
                f"ದಯವಿಟ್ಟು ನಿಮ್ಮ order ವಿವರಗಳನ್ನು ತಿಳಿಸಿ."
            ),
        },
    }


def get_dynamic_greeting(
    assistant_type: str,
    language_code: str,
    selected_voice: str,
) -> str:
    voice_name = VOICE_NAME_MAP.get(
        selected_voice,
        "Vidya",
    )

    gender_words = _get_gender_word(selected_voice)

    greeting_map = _build_greeting_map(
        voice_name,
        gender_words,
    )

    return greeting_map.get(
        assistant_type,
        {},
    ).get(
        language_code,
        "Hello! How may I help you today?",
    )