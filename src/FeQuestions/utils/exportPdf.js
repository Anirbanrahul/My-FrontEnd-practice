import { jsPDF } from 'jspdf';

// Function to clean markdown syntax for raw PDF text generation
const cleanMarkdown = (text) => {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/```(?:[a-z]+)?\n?([\s\S]*?)```/g, '\n--- Code Snippet ---\n$1\n--------------------\n')
    .replace(/👉 Interview Tip:/gi, '💡 Tip:')
    .replace(/📌 Note:/gi, 'Note:');
};

// Method 1: Styled Printable PDF Document (Best formatting & colors)
export const exportStyledPrintPdf = (questions, sections) => {
  const printWindow = window.open('', '_blank');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Frontend Interview Bible - 405 Questions & Answers</title>
        <style>
          @page {
            size: A4;
            margin: 15mm;
          }
          body {
            font-family: 'Segoe UI', system-ui, -apple-system, Roboto, sans-serif;
            background: #ffffff;
            color: #1e293b;
            line-height: 1.5;
            padding: 0;
            margin: 0;
          }
          .pdf-header-banner {
            background: linear-gradient(135deg, #0f172a, #1e293b);
            color: #ffffff;
            padding: 24px 30px;
            border-radius: 10px;
            margin-bottom: 24px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          .pdf-header-title {
            font-size: 24px;
            font-weight: 800;
            margin: 0 0 6px 0;
            color: #38bdf8;
          }
          .pdf-header-subtitle {
            font-size: 13px;
            color: #94a3b8;
            margin: 0;
          }
          .pdf-badge {
            background: #10b981;
            color: #fff;
            font-weight: 700;
            font-size: 11px;
            padding: 4px 10px;
            border-radius: 12px;
            display: inline-block;
            margin-top: 8px;
          }
          .section-banner {
            background: #f1f5f9;
            border-left: 5px solid #6366f1;
            padding: 10px 16px;
            font-size: 16px;
            font-weight: 700;
            color: #0f172a;
            margin: 24px 0 14px 0;
            border-radius: 4px;
            page-break-after: avoid;
          }
          .q-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 14px 18px;
            margin-bottom: 14px;
            page-break-inside: avoid;
          }
          .q-header {
            font-size: 14px;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 8px;
          }
          .q-num {
            color: #6366f1;
            font-weight: 800;
            margin-right: 6px;
          }
          .q-answer {
            font-size: 12.5px;
            color: #334155;
            white-space: pre-wrap;
            background: #f8fafc;
            padding: 10px 14px;
            border-radius: 6px;
            border: 1px solid #f1f5f9;
            font-family: monospace;
          }
          .code-block {
            background: #0f172a;
            color: #e2e8f0;
            padding: 10px 14px;
            border-radius: 6px;
            font-family: 'Fira Code', Consolas, monospace;
            font-size: 11.5px;
            margin: 6px 0;
          }
          .footer {
            text-align: center;
            font-size: 10px;
            color: #94a3b8;
            margin-top: 30px;
            border-top: 1px solid #e2e8f0;
            padding-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="pdf-header-banner">
          <h1 class="pdf-header-title">📖 Frontend Interview Bible</h1>
          <p class="pdf-header-subtitle">Comprehensive 405 Frontend Core Questions & Detailed Solutions</p>
          <span class="pdf-badge">Official PDF Export | Passcode Verified: 70032</span>
        </div>

        ${sections
          .filter((s) => s.id !== 'all')
          .map((sec) => {
            const secQuestions = questions.filter((q) => q.section === sec.id);
            if (secQuestions.length === 0) return '';

            return `
              <div class="section-banner">${sec.title}</div>
              ${secQuestions
                .map(
                  (q) => `
                <div class="q-card">
                  <div class="q-header">
                    <span class="q-num">#${q.number}</span> ${q.question}
                  </div>
                  <div class="q-answer">${cleanMarkdown(q.answer)}</div>
                </div>
              `
                )
                .join('')}
            `;
          })
          .join('')}

        <div class="footer">
          Frontend Machine Coding & Interview Bible • 405 Questions & Answers • Exported ${new Date().toLocaleDateString()}
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 500);
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
};

// Method 2: jsPDF File Direct Exporter
export const exportDirectJsPdf = (questions) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 15;

  // Header Banner
  doc.setFillColor(15, 23, 42);
  doc.rect(10, y, pageWidth - 20, 25, 'F');

  doc.setTextColor(56, 189, 248);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Frontend Interview Bible - 405 Q&As', 15, y + 10);

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Passcode Verified: 70032 | Complete Questions & Detailed Solutions', 15, y + 18);

  y += 32;

  questions.forEach((q, index) => {
    if (y > pageHeight - 25) {
      doc.addPage();
      y = 15;
    }

    // Question title
    doc.setTextColor(99, 102, 241);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    const qTitle = `#${index + 1}. ${q.question}`;
    const splitTitle = doc.splitTextToSize(qTitle, pageWidth - 30);
    doc.text(splitTitle, 15, y);
    y += splitTitle.length * 5;

    // Question Answer
    doc.setTextColor(51, 65, 85);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');

    const cleanAns = cleanMarkdown(q.answer);
    const splitAns = doc.splitTextToSize(cleanAns, pageWidth - 30);

    for (let i = 0; i < splitAns.length; i++) {
      if (y > pageHeight - 15) {
        doc.addPage();
        y = 15;
      }
      doc.text(splitAns[i], 15, y);
      y += 4.5; // Line height
    }
    
    y += 8; // Extra padding between questions
  });

  doc.save('Frontend_Interview_Bible_405_QA.pdf');
};
