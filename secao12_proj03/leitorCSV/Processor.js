class Processor {
  static Process(data) {
    const rows = data.split('\r\n');
    const processedRows = []
    
    rows.forEach(row => {
      const item = row.split(',');
      processedRows.push(item);
    })

    return processedRows;
  }
}

module.exports = Processor;