from src.infrastructure.rag.ingestion import RAGIngestionService


if __name__ == "__main__":
    sample_text = """
    Our clinic provides dental treatments,
    skin care, laser therapy,
    insurance support,
    and appointment scheduling.
    """

    rag = RAGIngestionService()

    result = rag.ingest_text(
        raw_text=sample_text,
        source_name="clinic_test"
    )

    print(result)