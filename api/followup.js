import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { clientName, freelancerName, projectType, budget, tone, proposalSubject } = req.body;

  if (!clientName || !projectType) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const toneGuide = {
      professional: "professional and concise",
      friendly: "warm and conversational",
      bold: "confident and direct"
    }[tone || "professional"];

    const prompt = `Write a short follow-up email from a freelancer to a potential client who received a proposal 48 hours ago but hasn't responded. Tone: ${toneGuide}.

Freelancer: ${freelancerName || "the freelancer"}
Client: ${clientName}
Project: ${projectType}
Budget: ${budget || "as discussed"}
Original proposal subject: ${proposalSubject || projectType + " proposal"}

Rules:
- Under 80 words in the body
- Not pushy — just a warm check-in
- Reference the proposal specifically
- End with a clear, low-pressure call to action (reply with questions, quick call, etc.)
- Sound human, not like a template

Return ONLY valid JSON:
{
  "subject": "Re: [the original subject line]",
  "body": "the full email body"
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 300,
    });

    const raw = completion.choices[0].message.content.trim();
    const email = JSON.parse(raw);
    return res.status(200).json({ email });
  } catch (err) {
    console.error("Followup error:", err);
    return res.status(500).json({ error: "Failed to generate follow-up email" });
  }
}
