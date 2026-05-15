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
                f"Namaste! I'm {voice_name} from CarePlus Clinic. "
                f"How can I help you today?"
            ),

            "hi-IN": (
                f"नमस्ते! मैं {voice_name} CarePlus Clinic से। "
                f"मैं आपकी कैसे मदद कर सकती हूँ?"
            ),

            "te-IN": (
                f"నమస్కారం! నేను {voice_name}, CarePlus Clinic నుండి. "
                f"నేను మీకు ఎలా సహాయం చేయగలను?"
            ),

            "kn-IN": (
                f"ನಮಸ್ಕಾರ! ನಾನು {voice_name}, CarePlus Clinic ಇಂದ. "
                f"ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?"
            ),
        },

        "insurance_advisor": {

            "en-IN": (
                f"Namaste! I'm {voice_name} from Insurance group. "
                f"What kind of insurance are you looking for?"
            ),

            "hi-IN": (
                f"नमस्ते! मैं {voice_name}, Insurance group से। "
                f"आप किस प्रकार का insurance ढूंढ रहे हैं?"
            ),

            "te-IN": (
                f"నమస్కారం! నేను {voice_name}, Insurance group నుండి. "
                f"మీకు ఏ insurance కావాలి?"
            ),

            "kn-IN": (
                f"ನಮಸ್ಕಾರ! ನಾನು {voice_name}, Insurance group ಇಂದ. "
                f"ನಿಮಗೆ ಯಾವ insurance ಬೇಕು?"
            ),
        },

        "ecommerce_support": {

            "en-IN": (
                f"Hello! I'm {voice_name} from ShopEasy India. "
                f"How can I help with your order?"
            ),

            "hi-IN": (
                f"नमस्ते! मैं {voice_name}, ShopEasy India से। "
                f"मैं आपके order में कैसे मदद कर सकती हूँ?"
            ),

            "te-IN": (
                f"నమస్కారం! నేను {voice_name}, ShopEasy India నుండి. "
                f"మీ order గురించి ఎలా సహాయం చేయగలను?"
            ),

            "kn-IN": (
                f"ನಮಸ್ಕಾರ! ನಾನು {voice_name}, ShopEasy India ಇಂದ. "
                f"ನಿಮ್ಮ order ಬಗ್ಗೆ ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?"
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