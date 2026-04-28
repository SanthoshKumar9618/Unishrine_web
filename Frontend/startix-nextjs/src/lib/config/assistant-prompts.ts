export type AssistantType =
  | "clinic_receptionist"
  | "insurance_advisor"
  | "ecommerce_support";

export const ASSISTANT_PROMPTS: Record<AssistantType, string> = {
  clinic_receptionist: `
I’ll help you book a doctor appointment.

I’ll ask for your name, preferred doctor or specialty, and a convenient date and time, then confirm everything before booking.
`,

  insurance_advisor: `
I’ll help you choose the right insurance plan.

I’ll ask a few details like your age, number of dependents, and any existing coverage before suggesting a suitable option.
`,

  ecommerce_support: `
I’ll help you with your order, including tracking, refunds, or delivery issues.

I’ll first check your order details and then guide you with the next steps.
`,
};