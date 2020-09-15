class Table {
  constructor(processedData) {
    this.header = processedData[0];
    processedData.shift();

    this.rows = processedData;
  }

  get RowCount() {
    return this.rows.length;
  }

  get ColumnCount() {
    return this.header.length;
  }
}

module.exports = Table;