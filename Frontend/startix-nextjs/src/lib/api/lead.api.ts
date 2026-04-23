const BASE_URL = "http://localhost:8000";

export async function createLead(payload: {
  name: string;
  company: string;
  phone: string;
  email: string;
  requirement: string;
}) {
  const res = await fetch(`${BASE_URL}/api/v1/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  // 🔴 IMPORTANT: handle non-JSON safely
  const text = await res.text();

  let data: any;
  try {
    data = JSON.parse(text);
  } catch {
    console.error("Invalid response:", text);
    throw new Error("Backend did not return JSON");
  }

  if (!res.ok) {
    throw new Error(data?.detail || "Request failed");
  }

  // ✅ Normalize response HERE (single place fix)
  return {
    success: data?.success ?? true,
    id: data?.data?.id || data?.lead_id || data?.id,
  };
}