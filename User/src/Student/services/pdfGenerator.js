const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generateCertificatePDF(data) {
  return new Promise((resolve, reject) => {
    try {
      // Create a new PDF document in A4 landscape (842x595 points approx)
      const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margins: { top: 28, left: 28, bottom: 28, right: 28 } });

      // Save file path (adjust as needed)
      const fileName = `${data.studentName.replace(/\s+/g, '_')}_Certificate.pdf`;
      const filePath = path.resolve(__dirname, fileName);
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // Page dimensions and center
      const pageWidth = doc.page.width;
      const pageHeight = doc.page.height;
      const centerX = pageWidth / 2;
      const margin = 28;

      // Colors
      const primaryBlue = '#1e64c8';
      const accentGold = '#ffc107';
      const darkText = '#212529';
      const lightText = '#6c757d';

      // Outer border
      doc.lineWidth(3).strokeColor(primaryBlue)
        .rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin)
        .stroke();

      // Inner border
      doc.lineWidth(1).strokeColor(lightText)
        .rect(margin + 15, margin + 15, pageWidth - 2 * (margin + 15), pageHeight - 2 * (margin + 15))
        .stroke();

      // Corner Ornaments
      const cornerSize = 40;
      doc.lineWidth(1.5).strokeColor(primaryBlue);

      // Top-left corner
      doc.moveTo(margin + 20, margin + 20).lineTo(margin + 20 + cornerSize, margin + 20).stroke();
      doc.moveTo(margin + 20, margin + 20).lineTo(margin + 20, margin + 20 + cornerSize).stroke();

      // Top-right corner
      doc.moveTo(pageWidth - margin - 20, margin + 20).lineTo(pageWidth - margin - 20 - cornerSize, margin + 20).stroke();
      doc.moveTo(pageWidth - margin - 20, margin + 20).lineTo(pageWidth - margin - 20, margin + 20 + cornerSize).stroke();

      // Bottom-left corner
      doc.moveTo(margin + 20, pageHeight - margin - 20).lineTo(margin + 20 + cornerSize, pageHeight - margin - 20).stroke();
      doc.moveTo(margin + 20, pageHeight - margin - 20).lineTo(margin + 20, pageHeight - margin - 20 - cornerSize).stroke();

      // Bottom-right corner
      doc.moveTo(pageWidth - margin - 20, pageHeight - margin - 20).lineTo(pageWidth - margin - 20 - cornerSize, pageHeight - margin - 20).stroke();
      doc.moveTo(pageWidth - margin - 20, pageHeight - margin - 20).lineTo(pageWidth - margin - 20, pageHeight - margin - 20 - cornerSize).stroke();

      // Top decorative line
      doc.fillColor(primaryBlue)
        .rect(margin + 80, margin + 50, pageWidth - 2 * (margin + 80), 2)
        .fill();

      // Bottom decorative line
      doc.fillColor(accentGold)
        .rect(margin + 80, pageHeight - margin - 50, pageWidth - 2 * (margin + 80), 2)
        .fill();

      // Company logo background circle
      doc.fillColor('white').circle(centerX, margin + 70, 35).fill();
      doc.lineWidth(1).strokeColor(primaryBlue).circle(centerX, margin + 70, 35).stroke();

      // Logo placeholder circle
      doc.fillColor(primaryBlue).circle(centerX, margin + 70, 27).fill();

      // Logo text "PX"
      doc.fillColor('white').font('Helvetica-Bold').fontSize(28)
        .text('PX', centerX - 15, margin + 58, { width: 30, align: 'center' });

      // Company name
      doc.fillColor(primaryBlue).font('Helvetica-Bold').fontSize(36)
        .text('PROLEARNX', 0, margin + 110, { align: 'center', width: pageWidth });

      // Tagline
      doc.fillColor(lightText).font('Helvetica').fontSize(14)
        .text('L E A R N   S M A R T .   G R O W   F A S T', 0, margin + 135, { align: 'center', width: pageWidth });

      // Elegant divider with star placeholders
      doc.fillColor(accentGold)
        .rect(centerX - 60, margin + 155, 60, 3).fill();
      doc.rect(centerX + 5, margin + 155, 60, 3).fill();
      doc.circle(centerX, margin + 156.5, 8).fill();

      // Main title "CERTIFICATE"
      doc.fillColor(darkText).font('Times-Bold').fontSize(70)
        .text('CERTIFICATE', 0, margin + 200, { align: 'center', width: pageWidth });

      doc.fillColor(lightText).font('Helvetica').fontSize(26)
        .text('of Completion', 0, margin + 245, { align: 'center', width: pageWidth });

      // "This is to certify that"
      doc.fillColor(lightText).font('Helvetica').fontSize(24)
        .text('This is to certify that', 0, margin + 280, { align: 'center', width: pageWidth });

      // Student name box
      const nameBoxWidth = 350;
      const nameBoxHeight = 40;
      const nameBoxY = margin + 300;
      doc.roundedRect(centerX - nameBoxWidth / 2, nameBoxY, nameBoxWidth, nameBoxHeight, 10)
        .fillAndStroke('#f8f9fa', primaryBlue);

      doc.fillColor(primaryBlue).font('Times-Bold').fontSize(40)
        .text(data.studentName, 0, nameBoxY + 23, { align: 'center', width: pageWidth });

      // "has successfully completed the course"
      doc.fillColor(lightText).font('Helvetica').fontSize(24)
        .text('has successfully completed the course', 0, nameBoxY + 70, { align: 'center', width: pageWidth });

      // Course name box
      const courseBoxWidth = 290;
      const courseBoxHeight = 35;
      const courseBoxY = nameBoxY + 90;
      doc.roundedRect(centerX - courseBoxWidth / 2, courseBoxY, courseBoxWidth, courseBoxHeight, 10)
        .fillAndStroke('#fff8e1', accentGold);

      doc.fillColor(darkText).font('Times-Bold').fontSize(32)
        .text(data.courseName, 0, courseBoxY + 25, { align: 'center', width: pageWidth });

      // Date box
      const dateBoxWidth = 230;
      const dateBoxHeight = 28;
      const dateBoxY = courseBoxY + 60;
      const formattedDate = new Date(data.issueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      doc.roundedRect(centerX - dateBoxWidth / 2, dateBoxY, dateBoxWidth, dateBoxHeight, 10)
        .fillAndStroke('#f0f4ff', primaryBlue);
      doc.fillColor(lightText).font('Helvetica').fontSize(20)
        .text(`Issued on ${formattedDate}`, 0, dateBoxY + 18, { align: 'center', width: pageWidth });

      // Signature
      doc.fillColor(primaryBlue).font('Times-Italic').fontSize(36)
        .text('Dr. Sarah Mitchell', 0, dateBoxY + 90, { align: 'center', width: pageWidth });

      // Signature lines and dots
      doc.fillColor(primaryBlue).rect(centerX - 90, dateBoxY + 110, 70, 5).fill();
      doc.rect(centerX + 20, dateBoxY + 110, 70, 5).fill();
      doc.circle(centerX - 10, dateBoxY + 110, 7).fill();
      doc.circle(centerX + 10, dateBoxY + 110, 7).fill();

      // Academic Director Text
      doc.fillColor(lightText).font('Helvetica').fontSize(18)
        .text('Academic Director', 0, dateBoxY + 140, { align: 'center', width: pageWidth });

      // Finish and save
      doc.end();

      stream.on('finish', () => resolve(filePath));
      stream.on('error', (err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = generateCertificatePDF;
