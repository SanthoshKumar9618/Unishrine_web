from src.application.rag.services.rag_service import RAGService


if __name__ == "__main__":
    query = "Do you provide dental treatment?"

    rag = RAGService()

    context = rag.retrieve_context(query)

    print("\n===== RETRIEVED CONTEXT =====\n")
    print(context)