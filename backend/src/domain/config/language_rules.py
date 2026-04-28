def get_language_instruction(lang: str) -> str:
    rules = {
        "te-IN": """
Reply ONLY in pure Telugu script.
Never use English or Hindi.
Maximum 2 short sentences.
Be natural and professional.
""",

        "hi-IN": """
Reply ONLY in pure Hindi script.
Never use English or Telugu.
Maximum 2 short sentences.
Be natural and professional.
""",

        "kn-IN": """
Reply ONLY in pure Kannada script.
Never use English or Hindi.
Maximum 2 short sentences.
Be natural and professional.
""",

        "en-IN": """
Reply ONLY in English.
Keep replies short and professional.
Maximum 2 short sentences.
"""
    }

    return rules.get(lang, rules["en-IN"])