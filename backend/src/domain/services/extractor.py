def extract_entities(text: str, collected: dict, role: str):
    text_lower = text.lower()

    if role == "insurance_advisor":
        if "name" not in collected and "my name is" in text_lower:
            collected["name"] = text.split("is")[-1].strip()

        if "age" not in collected:
            for word in text.split():
                if word.isdigit():
                    collected["age"] = word

        if "requirement" not in collected and len(text) > 10:
            collected["requirement"] = text

    elif role == "clinic_receptionist":
        if "name" not in collected and "my name is" in text_lower:
            collected["name"] = text.split("is")[-1].strip()

        if "phone" not in collected:
            for word in text.split():
                if word.isdigit() and len(word) >= 10:
                    collected["phone"] = word

        if "appointment_date" not in collected:
            if "tomorrow" in text_lower or "today" in text_lower:
                collected["appointment_date"] = text

    elif role == "ecommerce_support":
        if "order_id" not in collected:
            for word in text.split():
                if word.isdigit() and len(word) >= 4:
                    collected["order_id"] = word

        if "issue" not in collected and len(text) > 10:
            collected["issue"] = text

    return collected