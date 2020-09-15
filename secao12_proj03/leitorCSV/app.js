const Reader = require('./Reader');
const Processor = require('./Processor');
const Table = require('./Table');
const HtmlParser = require('./HtmlParser');
const Writer = require('./Writer');
const PdfWriter = require('./PdfWriter');

const csvReader = new Reader();
const dataWriter = new Writer();


async function main() {
  const data = await csvReader.Read('./planilha.csv');
  const processedData = Processor.Process(data);
  const usersTable = new Table(processedData);
  const html = await HtmlParser.Parse(usersTable);

  dataWriter.Write(`${Date.now()}.html`, html);
  PdfWriter.WritePdf(`${Date.now()}.pdf`, html);
}

main();