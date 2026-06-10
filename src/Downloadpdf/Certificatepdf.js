import html2pdf from 'html2pdf.js';

export const generateCertificatePDF = (cert) => {
    const element = document.createElement('div');

    element.innerHTML = `
        <div style="width: 297mm; height: 210mm; display: flex; align-items: center; justify-content: center; background: white; font-family: Georgia, 'Times New Roman', serif; box-sizing: border-box; padding: 8mm;">
            <div style="
                width: 100%; height: 100%;
                background: linear-gradient(160deg, #f0f6ff 0%, #ffffff 60%, #e8f0fe 100%);
                border-radius: 10px;
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                padding: 10mm; box-sizing: border-box; text-align: center;
                position: relative; overflow: hidden;
            ">
                <!-- Corner ornaments -->
                <div style="position: absolute; top: 6mm; left: 6mm; width: 18mm; height: 18mm; border-top: 2px solid #2563eb; border-left: 2px solid #2563eb; border-radius: 2px 0 0 0;"></div>
                <div style="position: absolute; top: 6mm; right: 6mm; width: 18mm; height: 18mm; border-top: 2px solid #2563eb; border-right: 2px solid #2563eb; border-radius: 0 2px 0 0;"></div>
                <div style="position: absolute; bottom: 6mm; left: 6mm; width: 18mm; height: 18mm; border-bottom: 2px solid #2563eb; border-left: 2px solid #2563eb; border-radius: 0 0 0 2px;"></div>
                <div style="position: absolute; bottom: 6mm; right: 6mm; width: 18mm; height: 18mm; border-bottom: 2px solid #2563eb; border-right: 2px solid #2563eb; border-radius: 0 0 2px 0;"></div>

                <!-- Trophy icon -->
                <div style="color: #2563eb; margin-bottom: 4mm;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />
                        <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />
                        <path d="M18 9h1.5a1 1 0 0 0 0-5H18" />
                        <path d="M4 22h16" />
                        <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />
                        <path d="M6 9H4.5a1 1 0 0 1 0-5H6" />
                    </svg>
                </div>

                <!-- Eyebrow label -->
                <p style="font-family: 'Arial', sans-serif; letter-spacing: 4px; font-size: 8pt; color: #2563eb; text-transform: uppercase; margin: 0 0 2mm 0; font-weight: 600;">Certificate of Achievement</p>

                <!-- Blue divider -->
                <div style="width: 40mm; height: 1px; background: linear-gradient(90deg, transparent, #2563eb, transparent); margin-bottom: 5mm;"></div>

                <p style="color: #64748b; font-family: 'Arial', sans-serif; font-size: 10pt; margin: 0 0 3mm 0; letter-spacing: 1px;">This is to certify that</p>

                <h2 style="font-size: 28pt; color: #0f172a; margin: 0 0 3mm 0; font-weight: 700; letter-spacing: 1px;">${cert.userName}</h2>

                <p style="font-family: 'Arial', sans-serif; font-size: 10pt; color: #64748b; margin: 0 0 2mm 0; letter-spacing: 1px;">has successfully demonstrated proficiency in</p>

                <h3 style="font-size: 20pt; margin: 0 0 4mm 0; color: #2563eb; font-weight: 600; font-style: italic;">${cert.title}</h3>

                <p style="font-family: 'Arial', sans-serif; color: #94a3b8; font-size: 9pt; max-width: 200mm; margin: 0 0 6mm 0; line-height: 1.6;">
                    A comprehensive assessment of foundational concepts, including structure and standards-compliant techniques, laying the groundwork for development.
                </p>

                <!-- Blue divider -->
                <div style="width: 80mm; height: 1px; background: linear-gradient(90deg, transparent, #2563eb44, transparent); margin-bottom: 5mm;"></div>

                <!-- Stat cards -->
                <div style="display: flex; justify-content: center; gap: 6mm;">
                    ${createCard('Final Score', cert.score + '%')}
                    ${createCard('Difficulty', 'Beginner')}
                    ${createCard('Issued', cert.date)}
                </div>

                <p style="font-family: 'Arial', sans-serif; font-size: 8pt; color: #94a3b8; margin-top: 5mm; letter-spacing: 2px;">CERTIFICATE ID: ${cert.hash}</p>
            </div>
        </div>
    `;

    function createCard(title, value) {
        return `
            <div style="
                background: #f0f6ff;
                padding: 8px 20px;
                border-radius: 6px;
                border: 1px solid #bfdbfe;
                min-width: 35mm;
            ">
                <p style="font-family: 'Arial', sans-serif; font-size: 7pt; color: #64748b; margin: 0; text-transform: uppercase; letter-spacing: 2px;">${title}</p>
                <p style="font-family: Georgia, serif; font-size: 12pt; font-weight: bold; color: #2563eb; margin: 2px 0 0 0;">${value}</p>
            </div>
        `;
    }

    const options = {
        margin: 0,
        filename: `Certificate_${cert.title}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
        pagebreak: { mode: 'avoid-all' }
    };

    html2pdf().set(options).from(element).save();
};