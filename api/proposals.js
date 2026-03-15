import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    const { userId, clientName, projectType, proposal, paymentInfo } = req.body;

    const { data, error } = await supabase
      .from("proposals")
      .insert([{
        user_id: userId,
        client_name: clientName,
        project_type: projectType,
        proposal_json: proposal,
        payment_info: paymentInfo || null,
        status: "sent",
        created_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ id: data.id, proposal: data });
  }

  if (method === "GET") {
    const { userId } = req.query;

    const { data, error } = await supabase
      .from("proposals")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ proposals: data });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
