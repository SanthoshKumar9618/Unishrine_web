def classify_intent(text: str) -> str:
    text_lower = text.lower()

    info_keywords = [
        "what", "which", "how", "explain",
        "policy", "benefit", "coverage",
        "insurance plan", "premium"
    ]

    for word in info_keywords:
        if word in text_lower:
            return "info"

    return "collect"