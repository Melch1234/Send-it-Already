export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { proposal, clientName, projectType, budget, timeline, freelancerName, paymentInfo } = req.body;

  if (!proposal) {
    return res.status(400).json({ error: "No proposal data provided" });
  }

  try {
    const scopeHTML = (proposal.scopeItems || [])
      .map(item => `<div class="scope-item"><span class="check">&#10003;</span>${item}</div>`)
      .join("");

    const budgetRows = (proposal.budgetBreakdown || [])
      .map(row => `<tr><td class="label">${row.item}</td><td class="amount">${row.amount}</td></tr>`)
      .join("");

    const paymentHTML = paymentInfo ? `
      <div class="pay-box">
        <div class="pay-title">Deposit to get started: ${proposal.depositAmount || ""}</div>
        <div class="pay-note">${proposal.depositNote || ""}</div>
        <div class="pay-link">Pay here: ${paymentInfo}</div>
      </div>` : "";

    const date = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Proposal — ${clientName || "Client"}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Georgia, serif; color: #374151; padding: 56px; max-width: 700px; margin: 0 auto; font-size: 12px; line-height: 1.6; }
  .accent-bar { height: 6px; background: #4f46e5; border-radius: 3px; margin-bottom: 32px; }
  .header { display: flex; justify-content: space-between; margin-bottom: 32px; }
  .header-label { font-size: 9px; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; font-family: Arial, sans-serif; }
  .header-name { font-size: 16px; font-weight: bold; color: #111827; font-family: Arial, sans-serif; }
  .divider { height: 1px; background: #e5e7eb; margin: 20px 0; }
  .title { font-size: 26px; color: #111827; margin-bottom: 8px; font-family: Arial, sans-serif; font-weight: bold; }
  .chips { display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap; }
  .chip { background: #eef2ff; color: #4f46e5; font-size: 10px; padding: 3px 10px; border-radius: 99px; font-family: Arial, sans-serif; }
  .section-label { font-size: 9px; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; font-family: Arial, sans-serif; font-weight: bold; }
  .body-text { color: #4b5563; margin-bottom: 24px; line-height: 1.7; }
  .scope-item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; color: #374151; }
  .check { color: #16a34a; font-weight: bold; flex-shrink: 0; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
  td { padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-family: Arial, sans-serif; }
  td.label { color: #6b7280; }
  td.amount { text-align: right; color: #374151; }
  tr.total td { border-bottom: none; font-weight: bold; font-size: 15px; color: #111827; }
  .pay-box { background: #eef2ff; padding: 16px; border-radius: 8px; margin-top: 16px; }
  .pay-title { font-size: 14px; font-weight: bold; color: #4f46e5; margin-bottom: 6px; font-family: Arial, sans-serif; }
  .pay-note { color: #6366f1; font-size: 11px; margin-bottom: 8px; }
  .pay-link { color: #4f46e5; font-size: 11px; font-family: Arial, sans-serif; }
  .closing { color: #4b5563; margin: 24px 0 40px; line-height: 1.7; }
  .footer { display: flex; justify-content: space-between; font-size: 9px; color: #d1d5db; font-family: Arial, sans-serif; border-top: 1px solid #f3f4f6; padding-top: 16px; }
  @media print { body { padding: 0; } }
</style>
</head>
<body>
  <div class="accent-bar"></div>
  <div class="header">
    <div>
      <div class="header-label">Proposal from</div>
      <div class="header-name">${freelancerName || "Your Name"}</div>
    </div>
    <div style="text-align:right">
      <div class="header-label">Prepared for</div>
      <div class="header-name">${clientName || "Client"}</div>
    </div>
  </div>
  <div class="divider"></div>
  <div class="title">${projectType || "Project"} Proposal</div>
  <div class="chips">
    <span class="chip">${projectType || ""}</span>
    <span class="chip">${budget || ""}</span>
    <span class="chip">${timeline || ""}</span>
  </div>
  <div class="divider"></div>
  <div class="section-label">Overview</div>
  <div class="body-text">${proposal.greeting || ""} ${proposal.intro || ""}</div>
  <div class="section-label">Scope of work</div>
  <div style="margin-bottom:24px">${scopeHTML}</div>
  ${proposal.whyMe ? `<div class="divider"></div><div class="section-label">Why work with me</div><div class="body-text">${proposal.whyMe}</div>` : ""}
  <div class="divider"></div>
  <div class="section-label">Investment</div>
  <table>
    ${budgetRows}
    <tr class="total"><td class="label">Total</td><td class="amount">${proposal.total || budget}</td></tr>
  </table>
  ${paymentHTML}
  <div class="divider"></div>
  <div class="closing">${proposal.closingLine || "Looking forward to working together!"}</div>
  <div class="footer">
    <span>Generated by SendItAlready.co</span>
    <span>${date}</span>
  </div>
</body>
</html>`;

    const filename = `proposal-${(clientName || "client").toLowerCase().replace(/\s+/g, "-")}.html`;
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.status(200).send(html);
  } catch (err) {
    console.error("PDF error:", err);
    return res.status(500).json({ error: "Failed to generate proposal file" });
  }
}
