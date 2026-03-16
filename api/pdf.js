const THEMES = {
  indigo: `
    * { box-sizing:border-box; margin:0; padding:0; }
    body { font-family:'Inter',-apple-system,sans-serif; color:#1f2937; background:#fff; }
    .header { background:linear-gradient(135deg,#1e1b4b 0%,#3730a3 100%); padding:44px 52px 36px; position:relative; overflow:hidden; }
    .orb1 { position:absolute; top:-80px; right:-80px; width:280px; height:280px; border-radius:50%; background:rgba(255,255,255,0.04); }
    .orb2 { position:absolute; bottom:-60px; right:120px; width:180px; height:180px; border-radius:50%; background:rgba(99,102,241,0.15); }
    .header-meta { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:28px; position:relative; }
    .from-label,.to-label { font-size:9px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.45); margin-bottom:4px; }
    .from-name { font-size:20px; font-weight:700; color:white; letter-spacing:-0.01em; }
    .to-name { font-size:14px; font-weight:500; color:rgba(255,255,255,0.85); text-align:right; }
    .h-subject { font-size:28px; font-weight:700; color:white; line-height:1.25; letter-spacing:-0.02em; margin-bottom:18px; position:relative; }
    .h-chips { display:flex; gap:8px; flex-wrap:wrap; position:relative; }
    .h-chip { font-size:11px; font-weight:500; padding:4px 14px; border-radius:99px; background:rgba(255,255,255,0.1); color:rgba(255,255,255,0.8); border:1px solid rgba(255,255,255,0.18); }
    .body { padding:44px 52px; }
    .section { margin-bottom:36px; }
    .sl { font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#6366f1; display:flex; align-items:center; gap:10px; margin-bottom:14px; }
    .sl::after { content:''; flex:1; height:1px; background:#e0e7ff; }
    .body-text { font-size:13px; line-height:1.8; color:#4b5563; }
    .scope-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
    .sc-item { display:flex; align-items:flex-start; gap:10px; padding:11px 14px; background:#f5f3ff; border-radius:8px; border:1px solid #ddd6fe; }
    .sc-check { width:18px; height:18px; border-radius:5px; background:#6366f1; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:1px; }
    .sc-text { font-size:12px; color:#374151; font-weight:500; line-height:1.4; }
    .ps-item { display:flex; gap:16px; align-items:flex-start; padding:14px 0; border-bottom:1px solid #f3f4f6; }
    .ps-item:last-child { border-bottom:none; }
    .ps-num { width:30px; height:30px; border-radius:50%; background:linear-gradient(135deg,#6366f1,#4f46e5); color:white; font-size:12px; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .ps-body { flex:1; padding-top:4px; }
    .ps-name { font-size:13px; font-weight:600; color:#111827; margin-bottom:3px; }
    .ps-desc { font-size:12px; color:#6b7280; line-height:1.55; }
    .wm-block { background:linear-gradient(135deg,#f5f3ff,#ede9fe); border-left:3px solid #6366f1; padding:18px 22px; border-radius:0 10px 10px 0; font-size:13px; color:#374151; line-height:1.8; }
    .bud-row { display:flex; justify-content:space-between; padding:10px 14px; border-radius:6px; margin-bottom:4px; }
    .bud-row.alt { background:#f9fafb; }
    .bud-label { font-size:13px; color:#6b7280; }
    .bud-amount { font-size:13px; color:#111827; font-weight:500; }
    .bud-total { display:flex; justify-content:space-between; align-items:center; padding:16px 18px; background:linear-gradient(135deg,#1e1b4b,#3730a3); border-radius:10px; margin-top:10px; }
    .bud-total-label { font-size:13px; font-weight:600; color:rgba(255,255,255,0.8); }
    .bud-total-amt { font-size:22px; font-weight:700; color:white; }
    .pay-box { display:flex; justify-content:space-between; align-items:center; background:linear-gradient(135deg,#6366f1,#4f46e5); padding:20px 24px; border-radius:12px; margin-top:16px; gap:24px; }
    .pay-title { font-size:14px; font-weight:600; color:white; margin-bottom:4px; }
    .pay-note { font-size:11px; color:rgba(255,255,255,0.75); line-height:1.5; }
    .pay-link { display:inline-block; padding:10px 20px; background:white; color:#4f46e5; font-size:12px; font-weight:700; border-radius:8px; text-decoration:none; white-space:nowrap; }
    .closing-block { text-align:center; padding:32px 40px; background:#f9fafb; border-radius:14px; border:1px solid #f3f4f6; }
    .closing-text { font-size:14px; color:#4b5563; line-height:1.8; font-style:italic; margin-bottom:20px; }
    .closing-line { width:48px; height:2px; background:#6366f1; margin:0 auto 16px; border-radius:2px; }
    .closing-sig { font-size:15px; font-weight:700; color:#1e1b4b; }
    .sig-note { font-size:11px; color:#6b7280; line-height:1.6; margin-bottom:20px; }
    .sig-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:24px; }
    .sig-line { height:1px; background:#d1d5db; margin-bottom:6px; margin-top:32px; }
    .sig-lbl { font-size:10px; color:#9ca3af; letter-spacing:0.05em; }
    .footer { margin-top:40px; padding:16px 52px; border-top:1px solid #f3f4f6; display:flex; justify-content:space-between; background:#fafafa; }
    .footer span { font-size:10px; color:#9ca3af; }
    @media print { body { -webkit-print-color-adjust:exact; print-color-adjust:exact; } }
  `,
  dark: `
    * { box-sizing:border-box; margin:0; padding:0; }
    body { font-family:'Inter',-apple-system,sans-serif; color:#f5f2eb; background:#0c0b09; }
    .header { background:linear-gradient(135deg,#141310 0%,#1c1a16 100%); padding:44px 52px 36px; position:relative; overflow:hidden; border-bottom:1px solid rgba(232,197,71,0.2); }
    .orb1 { position:absolute; top:-80px; right:-80px; width:280px; height:280px; border-radius:50%; background:rgba(232,197,71,0.03); }
    .orb2 { position:absolute; bottom:-60px; right:120px; width:180px; height:180px; border-radius:50%; background:rgba(232,197,71,0.05); }
    .header-meta { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:28px; position:relative; }
    .from-label,.to-label { font-size:9px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.3); margin-bottom:4px; }
    .from-name { font-size:20px; font-weight:700; color:#f5f2eb; letter-spacing:-0.01em; }
    .to-name { font-size:14px; font-weight:500; color:rgba(255,255,255,0.7); text-align:right; }
    .h-subject { font-size:28px; font-weight:700; color:#e8c547; line-height:1.25; letter-spacing:-0.02em; margin-bottom:18px; position:relative; }
    .h-chips { display:flex; gap:8px; flex-wrap:wrap; position:relative; }
    .h-chip { font-size:11px; font-weight:500; padding:4px 14px; border-radius:99px; background:rgba(232,197,71,0.1); color:rgba(232,197,71,0.8); border:1px solid rgba(232,197,71,0.2); }
    .body { padding:44px 52px; background:#0c0b09; }
    .section { margin-bottom:36px; }
    .sl { font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#e8c547; display:flex; align-items:center; gap:10px; margin-bottom:14px; }
    .sl::after { content:''; flex:1; height:1px; background:rgba(232,197,71,0.2); }
    .body-text { font-size:13px; line-height:1.8; color:#a09c93; }
    .scope-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
    .sc-item { display:flex; align-items:flex-start; gap:10px; padding:11px 14px; background:#141310; border-radius:8px; border:1px solid rgba(255,255,255,0.08); }
    .sc-check { width:18px; height:18px; border-radius:5px; background:#e8c547; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:1px; }
    .sc-text { font-size:12px; color:#d4d0c8; font-weight:500; line-height:1.4; }
    .ps-item { display:flex; gap:16px; align-items:flex-start; padding:14px 0; border-bottom:1px solid rgba(255,255,255,0.06); }
    .ps-item:last-child { border-bottom:none; }
    .ps-num { width:30px; height:30px; border-radius:50%; background:#e8c547; color:#0c0b09; font-size:12px; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .ps-body { flex:1; padding-top:4px; }
    .ps-name { font-size:13px; font-weight:600; color:#f5f2eb; margin-bottom:3px; }
    .ps-desc { font-size:12px; color:#6b6860; line-height:1.55; }
    .wm-block { background:#141310; border-left:3px solid #e8c547; padding:18px 22px; border-radius:0 10px 10px 0; font-size:13px; color:#a09c93; line-height:1.8; }
    .bud-row { display:flex; justify-content:space-between; padding:10px 14px; border-radius:6px; margin-bottom:4px; }
    .bud-row.alt { background:#141310; }
    .bud-label { font-size:13px; color:#6b6860; }
    .bud-amount { font-size:13px; color:#d4d0c8; font-weight:500; }
    .bud-total { display:flex; justify-content:space-between; align-items:center; padding:16px 18px; background:#e8c547; border-radius:10px; margin-top:10px; }
    .bud-total-label { font-size:13px; font-weight:600; color:rgba(12,11,9,0.7); }
    .bud-total-amt { font-size:22px; font-weight:700; color:#0c0b09; }
    .pay-box { display:flex; justify-content:space-between; align-items:center; background:#141310; border:1px solid rgba(232,197,71,0.3); padding:20px 24px; border-radius:12px; margin-top:16px; gap:24px; }
    .pay-title { font-size:14px; font-weight:600; color:#e8c547; margin-bottom:4px; }
    .pay-note { font-size:11px; color:#6b6860; line-height:1.5; }
    .pay-link { display:inline-block; padding:10px 20px; background:#e8c547; color:#0c0b09; font-size:12px; font-weight:700; border-radius:8px; text-decoration:none; white-space:nowrap; }
    .closing-block { text-align:center; padding:32px 40px; background:#141310; border-radius:14px; border:1px solid rgba(255,255,255,0.06); }
    .closing-text { font-size:14px; color:#a09c93; line-height:1.8; font-style:italic; margin-bottom:20px; }
    .closing-line { width:48px; height:2px; background:#e8c547; margin:0 auto 16px; border-radius:2px; }
    .closing-sig { font-size:15px; font-weight:700; color:#f5f2eb; }
    .sig-note { font-size:11px; color:#6b6860; line-height:1.6; margin-bottom:20px; }
    .sig-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:24px; }
    .sig-line { height:1px; background:#2d2b27; margin-bottom:6px; margin-top:32px; }
    .sig-lbl { font-size:10px; color:#5a5750; letter-spacing:0.05em; }
    .footer { margin-top:40px; padding:16px 52px; border-top:1px solid rgba(255,255,255,0.06); display:flex; justify-content:space-between; background:#0c0b09; }
    .footer span { font-size:10px; color:#3d3b35; }
    @media print { body { -webkit-print-color-adjust:exact; print-color-adjust:exact; } }
  `,
  clean: `
    * { box-sizing:border-box; margin:0; padding:0; }
    body { font-family:'Inter',-apple-system,sans-serif; color:#111827; background:#fff; }
    .header { background:#fff; padding:44px 52px 32px; border-bottom:2px solid #111827; }
    .orb1,.orb2 { display:none; }
    .header-meta { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:24px; }
    .from-label,.to-label { font-size:9px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:#9ca3af; margin-bottom:4px; }
    .from-name { font-size:20px; font-weight:700; color:#111827; letter-spacing:-0.01em; }
    .to-name { font-size:14px; font-weight:500; color:#374151; text-align:right; }
    .h-subject { font-size:28px; font-weight:700; color:#111827; line-height:1.25; letter-spacing:-0.02em; margin-bottom:18px; }
    .h-chips { display:flex; gap:8px; flex-wrap:wrap; }
    .h-chip { font-size:11px; font-weight:500; padding:4px 14px; border-radius:3px; background:#f3f4f6; color:#374151; border:1px solid #e5e7eb; }
    .body { padding:44px 52px; }
    .section { margin-bottom:36px; }
    .sl { font-size:10px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:#111827; display:flex; align-items:center; gap:10px; margin-bottom:14px; }
    .sl::after { content:''; flex:1; height:1px; background:#e5e7eb; }
    .body-text { font-size:13px; line-height:1.8; color:#4b5563; }
    .scope-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
    .sc-item { display:flex; align-items:flex-start; gap:10px; padding:10px 0; border-bottom:1px solid #f3f4f6; }
    .sc-check { width:16px; height:16px; border-radius:3px; background:#111827; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:2px; }
    .sc-text { font-size:12px; color:#374151; font-weight:500; line-height:1.4; }
    .ps-item { display:flex; gap:16px; align-items:flex-start; padding:14px 0; border-bottom:1px solid #f3f4f6; }
    .ps-item:last-child { border-bottom:none; }
    .ps-num { width:28px; height:28px; border-radius:50%; background:none; border:2px solid #111827; color:#111827; font-size:12px; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .ps-body { flex:1; padding-top:3px; }
    .ps-name { font-size:13px; font-weight:600; color:#111827; margin-bottom:3px; }
    .ps-desc { font-size:12px; color:#6b7280; line-height:1.55; }
    .wm-block { border-left:3px solid #111827; padding:16px 20px; font-size:13px; color:#4b5563; line-height:1.8; }
    .bud-row { display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #f3f4f6; }
    .bud-row.alt { background:none; }
    .bud-label { font-size:13px; color:#6b7280; }
    .bud-amount { font-size:13px; color:#111827; font-weight:500; }
    .bud-total { display:flex; justify-content:space-between; align-items:center; padding:16px 0; border-top:2px solid #111827; margin-top:4px; }
    .bud-total-label { font-size:13px; font-weight:600; color:#111827; }
    .bud-total-amt { font-size:22px; font-weight:700; color:#111827; }
    .pay-box { display:flex; justify-content:space-between; align-items:center; border:2px solid #111827; padding:20px 24px; border-radius:4px; margin-top:16px; gap:24px; }
    .pay-title { font-size:14px; font-weight:600; color:#111827; margin-bottom:4px; }
    .pay-note { font-size:11px; color:#6b7280; line-height:1.5; }
    .pay-link { display:inline-block; padding:10px 20px; background:#111827; color:white; font-size:12px; font-weight:700; border-radius:3px; text-decoration:none; white-space:nowrap; }
    .closing-block { padding:28px 0; border-top:1px solid #e5e7eb; }
    .closing-text { font-size:14px; color:#4b5563; line-height:1.8; font-style:italic; margin-bottom:20px; }
    .closing-line { width:48px; height:2px; background:#111827; margin:0 0 16px; border-radius:2px; }
    .closing-sig { font-size:15px; font-weight:700; color:#111827; }
    .sig-note { font-size:11px; color:#6b7280; line-height:1.6; margin-bottom:20px; }
    .sig-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:24px; }
    .sig-line { height:1px; background:#d1d5db; margin-bottom:6px; margin-top:32px; }
    .sig-lbl { font-size:10px; color:#9ca3af; letter-spacing:0.05em; }
    .footer { margin-top:40px; padding:16px 0; border-top:1px solid #e5e7eb; display:flex; justify-content:space-between; }
    .footer span { font-size:10px; color:#9ca3af; }
    @media print { body { -webkit-print-color-adjust:exact; print-color-adjust:exact; } }
  `
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { proposal, clientName, projectType, budget, timeline, freelancerName, paymentInfo, template, expiry, logo } = req.body;

  if (!proposal) {
    return res.status(400).json({ error: "No proposal data provided" });
  }

  try {
    const theme = template || "indigo";
    const checkStroke = theme === "dark" ? "#0c0b09" : "white";

    const scopeHTML = (proposal.scopeItems || [])
      .map(item => `<div class="sc-item"><div class="sc-check"><svg viewBox="0 0 10 10" width="10" height="10"><polyline points="1.5,5 4,7.5 8.5,2.5" fill="none" stroke="${checkStroke}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div><span class="sc-text">${item}</span></div>`)
      .join("");

    const processHTML = (proposal.processSteps || [])
      .map((s, i) => `<div class="ps-item"><div class="ps-num">${i + 1}</div><div class="ps-body"><div class="ps-name">${s.step}</div><div class="ps-desc">${s.description}</div></div></div>`)
      .join("");

    const budgetHTML = (proposal.budgetBreakdown || [])
      .map((row, i) => `<div class="bud-row${i % 2 === 1 ? " alt" : ""}"><span class="bud-label">${row.item}</span><span class="bud-amount">${row.amount}</span></div>`)
      .join("");

    const paymentHTML = paymentInfo ? `
      <div class="pay-box">
        <div>
          <div class="pay-title">Deposit to get started — ${proposal.depositAmount || ""}</div>
          <div class="pay-note">${proposal.depositNote || ""}</div>
        </div>
        <a class="pay-link" href="${paymentInfo.startsWith("http") ? paymentInfo : "mailto:" + paymentInfo}">${paymentInfo.startsWith("http") ? "Pay deposit →" : paymentInfo}</a>
      </div>` : "";

    const subjectLine = proposal.subject || `${projectType || "Project"} Proposal`;
    const date = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${subjectLine}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>${THEMES[theme] || THEMES.indigo}</style>
</head>
<body>
  <div class="header">
    <div class="orb1"></div><div class="orb2"></div>
    ${logo ? `<img src="${logo}" style="height:44px;width:auto;object-fit:contain;max-width:140px;display:block;margin-bottom:14px;position:relative;" alt="Logo">` : ""}
    <div class="header-meta">
      <div>
        <div class="from-label">Proposal from</div>
        <div class="from-name">${freelancerName || "Your Name"}</div>
      </div>
      <div>
        <div class="to-label">Prepared for</div>
        <div class="to-name">${clientName || "Client"}</div>
      </div>
    </div>
    <div class="h-subject">${subjectLine}</div>
    <div class="h-chips">
      ${projectType ? `<span class="h-chip">${projectType}</span>` : ""}
      ${budget ? `<span class="h-chip">${budget}</span>` : ""}
      ${timeline ? `<span class="h-chip">${timeline}</span>` : ""}
      <span class="h-chip">${date}</span>
      ${expiry ? `<span class="h-chip">Valid until ${expiry}</span>` : ""}
    </div>
  </div>

  <div class="body">

    <div class="section">
      <div class="sl">Overview</div>
      <div class="body-text">${proposal.greeting || ""} ${proposal.intro || ""}</div>
    </div>

    <div class="section">
      <div class="sl">Scope of work</div>
      <div class="scope-grid">${scopeHTML}</div>
    </div>

    ${processHTML ? `<div class="section"><div class="sl">How I work</div>${processHTML}</div>` : ""}

    ${proposal.whyMe ? `<div class="section"><div class="sl">Why work with me</div><div class="wm-block">${proposal.whyMe}</div></div>` : ""}

    <div class="section">
      <div class="sl">Investment</div>
      ${budgetHTML}
      <div class="bud-total">
        <span class="bud-total-label">Total project investment</span>
        <span class="bud-total-amt">${proposal.total || budget}</span>
      </div>
      ${paymentHTML}
    </div>

    <div class="section">
      <div class="sl">Closing</div>
      <div class="closing-block">
        <div class="closing-text">${proposal.closingLine || "Looking forward to working together!"}</div>
        <div class="closing-line"></div>
        <div class="closing-sig">${freelancerName || ""}</div>
      </div>
    </div>

    <div class="section">
      <div class="sl">Client acceptance</div>
      <p class="sig-note">By signing below, the client agrees to the scope and investment outlined in this proposal and authorizes work to begin upon receipt of the deposit.</p>
      <div class="sig-grid">
        <div><div class="sig-line"></div><div class="sig-lbl">Client signature</div></div>
        <div><div class="sig-line"></div><div class="sig-lbl">Printed name</div></div>
        <div><div class="sig-line"></div><div class="sig-lbl">Date accepted</div></div>
      </div>
    </div>

  </div>

  <div class="footer">
    <span>Generated by SendItAlready.co</span>
    <span>${date}</span>
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
