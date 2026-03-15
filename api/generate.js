import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { clientName, projectType, budget, timeline, deliverables, freelancerName, paymentInfo } = req.body;

  if (!clientName || !projectType || !budget || !timeline || !deliverables) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const prompt = `You are a professional freelance proposal writer. Write a confident, warm, and compelling project proposal.

Freelancer name: ${freelancerName || "the freelancer"}
Client name: ${clientName}
Project type: ${projectType}
Budget: ${budget}
Timeline: ${timeline}
Deliverables: ${deliverables}
${paymentInfo ? `Payment info: ${paymentInfo}` : ""}

Write the proposal in this exact JSON structure:
{
  "subject": "Project proposal subject line (exciting, specific)",
  "greeting": "Warm opening sentence addressing ${clientName}",
  "intro": "2 sentences — express excitement about the project and establish credibility. Sound human, not corporate.",
  "scopeItems": ["deliverable 1", "deliverable 2", "deliverable 3", "deliverable 4"],
  "processSteps": [
    { "step": "Step name", "description": "One sentence description" },
    { "step": "Step name", "description": "One sentence description" },
    { "step": "Step name", "description": "One sentence description" }
  ],
  "whyMe": "2 sentences about why this freelancer is the right choice. Confident but not arrogant.",
  "closingLine": "One warm, action-oriented closing line encouraging them to move forward.",
  "budgetBreakdown": [
    { "item": "line item name", "amount": "$X,XXX" },
    { "item": "line item name", "amount": "$X,XXX" }
  ],
  "total": "${budget}",
  "depositAmount": "50% deposit amount based on budget",
  "depositNote": "Short note about the deposit and what it unlocks"
}

Return ONLY valid JSON. No markdown, no explanation, just the JSON object.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const raw = completion.choices[0].message.content.trim();
    const proposal = JSON.parse(raw);

    return res.status(200).json({ proposal });
  } catch (err) {
    console.error("Generate error:", err);
    return res.status(500).json({ error: "Failed to generate proposal. Please try again." });
  }
}
