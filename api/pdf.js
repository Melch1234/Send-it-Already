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
      .map(item => `<div class="scope-item"><div class="scope-check"><svg viewBox="0 0 10 10" width="10" height="10"><polyline points="1.5,5 4,7.5 8.5,2.5" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div><span class="scope-text">${item}</span></div>`)
      .join("");

    const processHTML = (proposal.processSteps || [])
      .map((s, i) => `<div class="process-item"><div class="process-num">${i + 1}</div><div class="process-body"><div class="process-name">${s.step}</div><div class="process-desc">${s.description}</div></div></div>`)
      .join("");

    const budgetHTML = (proposal.budgetBreakdown || [])
      .map((row, i) => `<div class="budget-row${i % 2 === 1 ? " alt" : ""}"><span class="budget-label">${row.item}</span><span class="budget-amount">${row.amount}</span></div>`)
      .join("");

    const paymentHTML = paymentInfo ? `
      <div class="pay-box">
        <div class="pay-left">
          <div class="pay-title">Deposit to get started — ${proposal.depositAmount || ""}</div>
          <div class="pay-note">${proposal.depositNote || ""}</div>
        </div>
        <div class="pay-link-wrap">
          <a class="pay-link" href="${paymentInfo.startsWith("http") ? paymentInfo : "mailto:" + paymentInfo}">${paymentInfo.startsWith("http") ? "Pay deposit now →" : paymentInfo}</a>
        </div>
      </div>` : "";

    const subjectLine = proposal.subject || `${projectType || "Project"} Proposal`;
    const date = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${subjectLine}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; color: #1f2937; background: #fff; }

  /* HEADER */
  .header {
    background: linear-gradient(135deg, #1e1b4b 0%, #3730a3 100%);
    padding: 44px 52px 36px;
    position: relative;
    overflow: hidden;
  }
  .header-orb1 {
    position: absolute; top: -80px; right: -80px;
    width: 280px; height: 280px; border-radius: 50%;
    background: rgba(255,255,255,0.04);
  }
  .header-orb2 {
    position: absolute; bottom: -60px; right: 120px;
    width: 180px; height: 180px; border-radius: 50%;
    background: rgba(99,102,241,0.15);
  }
  .header-meta {
    display: flex; justify-content: space-between; align-items: flex-start;
    margin-bottom: 28px; position: relative;
  }
  .header-from-label, .header-to-label {
    font-size: 9px; font-weight: 600; letter-spacing: 0.12em;
    text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 4px;
  }
  .header-from-name {
    font-size: 20px; font-weight: 700; color: white; letter-spacing: -0.01em;
  }
  .header-to-name {
    font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.85); text-align: right;
  }
  .header-subject {
    font-size: 28px; font-weight: 700; color: white; line-height: 1.25;
    letter-spacing: -0.02em; position: relative; margin-bottom: 18px;
  }
  .header-chips { display: flex; gap: 8px; flex-wrap: wrap; position: relative; }
  .header-chip {
    font-size: 11px; font-weight: 500; padding: 4px 14px; border-radius: 99px;
    background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.8);
    border: 1px solid rgba(255,255,255,0.18);
  }

  /* BODY */
  .body { padding: 44px 52px; }

  /* SECTIONS */
  .section { margin-bottom: 36px; }
  .section-label {
    font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; color: #6366f1;
    display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
  }
  .section-label::after { content: ''; flex: 1; height: 1px; background: #e0e7ff; }
  .body-text { font-size: 13px; line-height: 1.8; color: #4b5563; }

  /* SCOPE */
  .scope-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .scope-item { display: flex; align-items: flex-start; gap: 10px; padding: 11px 14px; background: #f5f3ff; border-radius: 8px; border: 1px solid #ddd6fe; }
  .scope-check { width: 18px; height: 18px; border-radius: 5px; background: #6366f1; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
  .scope-text { font-size: 12px; color: #374151; font-weight: 500; line-height: 1.4; }

  /* PROCESS */
  .process-item { display: flex; gap: 16px; align-items: flex-start; padding: 14px 0; border-bottom: 1px solid #f3f4f6; }
  .process-item:last-child { border-bottom: none; }
  .process-num {
    width: 30px; height: 30px; border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    color: white; font-size: 12px; font-weight: 700;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .process-body { flex: 1; padding-top: 4px; }
  .process-name { font-size: 13px; font-weight: 600; color: #111827; margin-bottom: 3px; }
  .process-desc { font-size: 12px; color: #6b7280; line-height: 1.55; }

  /* WHY ME */
  .whyme-block {
    background: linear-gradient(135deg, #f5f3ff, #ede9fe);
    border-left: 3px solid #6366f1;
    padding: 18px 22px; border-radius: 0 10px 10px 0;
    font-size: 13px; color: #374151; line-height: 1.8;
  }

  /* BUDGET */
  .budget-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; border-radius: 6px; margin-bottom: 4px; }
  .budget-row.alt { background: #f9fafb; }
  .budget-label { font-size: 13px; color: #6b7280; }
  .budget-amount { font-size: 13px; color: #111827; font-weight: 500; }
  .budget-total {
    display: flex; justify-content: space-between; align-items: center;
    padding: 16px 18px;
    background: linear-gradient(135deg, #1e1b4b, #3730a3);
    border-radius: 10px; margin-top: 10px;
  }
  .budget-total-label { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.8); }
  .budget-total-amount { font-size: 22px; font-weight: 700; color: white; }

  /* PAYMENT */
  .pay-box {
    display: flex; justify-content: space-between; align-items: center;
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    padding: 20px 24px; border-radius: 12px; margin-top: 16px; gap: 24px;
  }
  .pay-title { font-size: 14px; font-weight: 600; color: white; margin-bottom: 4px; }
  .pay-note { font-size: 11px; color: rgba(255,255,255,0.75); line-height: 1.5; }
  .pay-link {
    display: inline-block; padding: 10px 20px; background: white; color: #4f46e5;
    font-size: 12px; font-weight: 700; border-radius: 8px; text-decoration: none; white-space: nowrap;
  }

  /* CLOSING */
  .closing-block {
    text-align: center; padding: 32px 40px;
    background: #f9fafb; border-radius: 14px; border: 1px solid #f3f4f6;
  }
  .closing-text { font-size: 14px; color: #4b5563; line-height: 1.8; font-style: italic; margin-bottom: 20px; }
  .closing-line { width: 48px; height: 2px; background: #6366f1; margin: 0 auto 16px; border-radius: 2px; }
  .closing-sig { font-size: 15px; font-weight: 700; color: #1e1b4b; }

  /* FOOTER */
  .footer {
    margin-top: 40px; padding: 16px 52px;
    border-top: 1px solid #f3f4f6;
    display: flex; justify-content: space-between; align-items: center;
    background: #fafafa;
  }
  .footer-brand { font-size: 10px; color: #9ca3af; }
  .footer-date { font-size: 10px; color: #9ca3af; }

  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
</head>
<body>
  <div class="header">
    <div class="header-orb1"></div>
    <div class="header-orb2"></div>
    <div class="header-meta">
      <div>
        <div class="header-from-label">Proposal from</div>
        <div class="header-from-name">${freelancerName || "Your Name"}</div>
      </div>
      <div>
        <div class="header-to-label">Prepared for</div>
        <div class="header-to-name">${clientName || "Client"}</div>
      </div>
    </div>
    <div class="header-subject">${subjectLine}</div>
    <div class="header-chips">
      ${projectType ? `<span class="header-chip">${projectType}</span>` : ""}
      ${budget ? `<span class="header-chip">${budget}</span>` : ""}
      ${timeline ? `<span class="header-chip">${timeline}</span>` : ""}
      <span class="header-chip">${date}</span>
    </div>
  </div>

  <div class="body">

    <div class="section">
      <div class="section-label">Overview</div>
      <div class="body-text">${proposal.greeting || ""} ${proposal.intro || ""}</div>
    </div>

    <div class="section">
      <div class="section-label">Scope of work</div>
      <div class="scope-grid">${scopeHTML}</div>
    </div>

    ${processHTML ? `
    <div class="section">
      <div class="section-label">How I work</div>
      <div>${processHTML}</div>
    </div>` : ""}

    ${proposal.whyMe ? `
    <div class="section">
      <div class="section-label">Why work with me</div>
      <div class="whyme-block">${proposal.whyMe}</div>
    </div>` : ""}

    <div class="section">
      <div class="section-label">Investment</div>
      ${budgetHTML}
      <div class="budget-total">
        <span class="budget-total-label">Total project investment</span>
        <span class="budget-total-amount">${proposal.total || budget}</span>
      </div>
      ${paymentHTML}
    </div>

    <div class="section">
      <div class="closing-block">
        <div class="closing-text">${proposal.closingLine || "Looking forward to working together!"}</div>
        <div class="closing-line"></div>
        <div class="closing-sig">${freelancerName || ""}</div>
      </div>
    </div>

  </div>

  <div class="footer">
    <span class="footer-brand">Generated by SendItAlready.co</span>
    <span class="footer-date">${date}</span>
  </div>
</body>
</html>`;

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);
  } catch (err) {
    console.error("PDF error:", err);
    return res.status(500).json({ error: "Failed to generate proposal file" });
  }
}
