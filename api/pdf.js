import PdfPrinter from "pdfmake";

const fonts = {
  Roboto: {
    normal: Buffer.from(require("pdfmake/build/vfs_fonts").pdfMake.vfs["Roboto-Regular.ttf"], "base64"),
    bold: Buffer.from(require("pdfmake/build/vfs_fonts").pdfMake.vfs["Roboto-Medium.ttf"], "base64"),
    italics: Buffer.from(require("pdfmake/build/vfs_fonts").pdfMake.vfs["Roboto-Italic.ttf"], "base64"),
    bolditalics: Buffer.from(require("pdfmake/build/vfs_fonts").pdfMake.vfs["Roboto-MediumItalic.ttf"], "base64"),
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { proposal, clientName, projectType, budget, timeline, freelancerName, paymentInfo } = req.body;

  if (!proposal) {
    return res.status(400).json({ error: "No proposal data provided" });
  }

  try {
    const printer = new PdfPrinter(fonts);

    const scopeItems = (proposal.scopeItems || []).map((item) => ({
      text: `✓  ${item}`,
      margin: [0, 4, 0, 0],
      color: "#374151",
    }));

    const budgetRows = (proposal.budgetBreakdown || []).map((row) => [
      { text: row.item, color: "#6b7280" },
      { text: row.amount, alignment: "right", color: "#374151" },
    ]);

    budgetRows.push([
      { text: "Total", bold: true, fontSize: 14, color: "#111827" },
      { text: proposal.total || budget, bold: true, fontSize: 14, alignment: "right", color: "#111827" },
    ]);

    const docDefinition = {
      pageMargins: [56, 56, 56, 56],
      defaultStyle: { font: "Roboto", fontSize: 11, color: "#374151", lineHeight: 1.5 },
      content: [
        // Header bar
        {
          canvas: [{ type: "rect", x: 0, y: 0, w: 483, h: 6, r: 3, color: "#4f46e5" }],
          margin: [0, 0, 0, 24],
        },

        // From / To
        {
          columns: [
            {
              stack: [
                { text: "PROPOSAL FROM", fontSize: 8, color: "#9ca3af", letterSpacing: 1 },
                { text: freelancerName || "Your Name", fontSize: 14, bold: true, color: "#111827", margin: [0, 4, 0, 0] },
              ],
            },
            {
              stack: [
                { text: "PREPARED FOR", fontSize: 8, color: "#9ca3af", letterSpacing: 1 },
                { text: clientName || "Client", fontSize: 14, bold: true, color: "#111827", margin: [0, 4, 0, 0] },
              ],
              alignment: "right",
            },
          ],
          margin: [0, 0, 0, 24],
        },

        // Divider
        { canvas: [{ type: "line", x1: 0, y1: 0, x2: 483, y2: 0, lineWidth: 1, lineColor: "#e5e7eb" }], margin: [0, 0, 0, 24] },

        // Project title
        { text: `${projectType || "Project"} Proposal`, fontSize: 24, bold: true, color: "#111827", margin: [0, 0, 0, 8] },

        // Chips row
        {
          columns: [
            { text: projectType || "", fontSize: 9, color: "#4f46e5", background: "#eef2ff", margin: [0, 0, 8, 0] },
            { text: budget || "", fontSize: 9, color: "#4f46e5", background: "#eef2ff", margin: [0, 0, 8, 0] },
            { text: timeline || "", fontSize: 9, color: "#4f46e5", background: "#eef2ff" },
            { text: "", fontSize: 9 },
          ],
          margin: [0, 0, 0, 24],
        },

        // Divider
        { canvas: [{ type: "line", x1: 0, y1: 0, x2: 483, y2: 0, lineWidth: 1, lineColor: "#e5e7eb" }], margin: [0, 0, 0, 20] },

        // Greeting
        { text: "Overview", fontSize: 9, color: "#9ca3af", bold: true, margin: [0, 0, 0, 8], letterSpacing: 1 },
        { text: `${proposal.greeting || ""} ${proposal.intro || ""}`, margin: [0, 0, 0, 24], color: "#4b5563" },

        // Scope
        { text: "Scope of Work", fontSize: 9, color: "#9ca3af", bold: true, margin: [0, 0, 0, 8], letterSpacing: 1 },
        { stack: scopeItems, margin: [0, 0, 0, 24] },

        // Why me
        ...(proposal.whyMe ? [
          { canvas: [{ type: "line", x1: 0, y1: 0, x2: 483, y2: 0, lineWidth: 1, lineColor: "#e5e7eb" }], margin: [0, 0, 0, 20] },
          { text: "Why Work With Me", fontSize: 9, color: "#9ca3af", bold: true, margin: [0, 0, 0, 8], letterSpacing: 1 },
          { text: proposal.whyMe, margin: [0, 0, 0, 24], color: "#4b5563" },
        ] : []),

        // Investment
        { canvas: [{ type: "line", x1: 0, y1: 0, x2: 483, y2: 0, lineWidth: 1, lineColor: "#e5e7eb" }], margin: [0, 0, 0, 20] },
        { text: "Investment", fontSize: 9, color: "#9ca3af", bold: true, margin: [0, 0, 0, 12], letterSpacing: 1 },
        {
          table: {
            widths: ["*", "auto"],
            body: budgetRows,
          },
          layout: {
            hLineWidth: (i, node) => (i === 0 || i === node.table.body.length ? 0 : 0.5),
            vLineWidth: () => 0,
            hLineColor: () => "#e5e7eb",
            paddingTop: () => 8,
            paddingBottom: () => 8,
          },
          margin: [0, 0, 0, 24],
        },

        // Deposit box
        ...(proposal.depositAmount ? [
          {
            table: {
              widths: ["*"],
              body: [[
                {
                  stack: [
                    { text: `Deposit to get started: ${proposal.depositAmount}`, bold: true, color: "#4f46e5", fontSize: 13 },
                    { text: proposal.depositNote || "Pay the deposit to kick things off.", color: "#6366f1", margin: [0, 4, 0, 0] },
                    ...(paymentInfo ? [{ text: `Pay here: ${paymentInfo}`, color: "#4f46e5", margin: [0, 8, 0, 0], decoration: "underline" }] : []),
                  ],
                  fillColor: "#eef2ff",
                  margin: [16, 16, 16, 16],
                },
              ]],
            },
            layout: { hLineWidth: () => 0, vLineWidth: () => 0 },
            margin: [0, 0, 0, 24],
          },
        ] : []),

        // Closing
        { canvas: [{ type: "line", x1: 0, y1: 0, x2: 483, y2: 0, lineWidth: 1, lineColor: "#e5e7eb" }], margin: [0, 0, 0, 20] },
        { text: proposal.closingLine || "Looking forward to working together!", color: "#4b5563", margin: [0, 0, 0, 32] },

        // Footer
        {
          columns: [
            { text: `Generated by SendItAlready.co`, fontSize: 9, color: "#d1d5db" },
            { text: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }), fontSize: 9, color: "#d1d5db", alignment: "right" },
          ],
        },
      ],
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const chunks = [];

    pdfDoc.on("data", (chunk) => chunks.push(chunk));
    pdfDoc.on("end", () => {
      const pdfBuffer = Buffer.concat(chunks);
      const filename = `proposal-${(clientName || "client").toLowerCase().replace(/\s+/g, "-")}.pdf`;
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Content-Length", pdfBuffer.length);
      res.status(200).send(pdfBuffer);
    });

    pdfDoc.end();
  } catch (err) {
    console.error("PDF error:", err);
    return res.status(500).json({ error: "Failed to generate PDF" });
  }
}
