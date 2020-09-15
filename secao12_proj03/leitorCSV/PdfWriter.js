const pdf = require('html-pdf');

class PdfWriter {
  static WritePdf(filename, file) {
    pdf.create(file, {})
      .toFile(filename, (err) => {});

    console.log("PDF criado!");
  }
}

module.exports = PdfWriter;