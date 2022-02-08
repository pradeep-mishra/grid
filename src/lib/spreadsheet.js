function getColumnId(index) {
  if (index >= 26) {
    const first = Math.floor(index / 26) - 1;
    const second = index % 26;
    const id = getColumnId(first) + getColumnId(second);
    return id;
  }
  return String.fromCharCode("A".charCodeAt(0) + index);
}

export default class SpreadsheetData {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.cells = Array.from({ length: cols * rows }, () => {
      return {
        value: "",
        input: ""
      };
    });
  }
  getCell(x, y) {
    return this.cells[y * this.cols + x];
  }
  getCellTitle(x, y) {
    return getColumnId(x) + y;
  }
}
