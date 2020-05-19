export class BingoValidator {
  constructor(n) {
    if (n % 2 === 0) {
      throw new Error("Cannot create a bingo card with even n value");
    }
    this.diagonalLines = this.getDiagonalLines(n);
    this.verticalLines = this.getVerticalLines(n);
    this.horizontalLines = this.getHorizontalLines(n);
  }
  getDiagonalLines(n) {
    const leftToRight = [];
    for (let i = 0; i < n; i++) {
      leftToRight.push((n + 1) * i);
    }
    const rightToLeft = [];
    for (let i = 1; i < n + 1; i++) {
      rightToLeft.push((n - 1) * i);
    }
    return [leftToRight, rightToLeft];
  }
  getVerticalLine(n, i) {
    let line = [];
    for (let index = 0; index < n; index++) {
      line.push(n * index + i);
    }
    return line;
  }
  getVerticalLines(n) {
    const lines = [];
    for (let i = 0; i < n; i++) {
      lines.push(this.getVerticalLine(n, i));
    }
    return lines;
  }
  getHorizontalLine(n, i) {
    // creates an array of length n starting at i
    return [...Array(n).keys()].map(val => val + i);
  }
  getHorizontalLines(n) {
    let lines = [];
    for (let i = 0; i < n; i++) {
      lines.push(this.getHorizontalLine(n, n * i));
    }
    return lines;
  }
  filterByMarked(array) {
    return array.filter(cell => cell.marked === true);
  }
  getMarkedItemIndexes(card) {
    // we don't need the value, just the index and whether it is marked, to determine if they have a line
    const getIndexes = card.map((cell, index) => {
      return { index: index, marked: cell.marked };
    });
    return this.filterByMarked(getIndexes).map(object => object.index);
  }
  hasLine(markedItems, line) {
    return line.every(indexValue => markedItems.includes(indexValue));
  }
  hasLineMatchForOrientation(markedItems, orientationLines) {
    let hasMatch = false;
    let indexOfLineToCheck = 0;
    // only check until a match is found
    while (hasMatch === false && indexOfLineToCheck < orientationLines.length) {
      if (this.hasLine(markedItems, orientationLines[indexOfLineToCheck])) {
        hasMatch = true;
      } else {
        indexOfLineToCheck++;
      }
    }
    return hasMatch;
  }
  hasBingo(card) {
    const totalMarked = this.filterByMarked(card);
    // can't have bingo with less than 5 marked items
    if (totalMarked.length < 5) {
      return false;
    } else {
      const markedItems = this.getMarkedItemIndexes(card);
      // check diagonal lines first
      if (this.hasLineMatchForOrientation(markedItems, this.diagonalLines)) {
        return true;
      }
      // then vertical lines
      if (this.hasLineMatchForOrientation(markedItems, this.verticalLines)) {
        return true;
      }
      // then horizontal lines
      if (this.hasLineMatchForOrientation(markedItems, this.horizontalLines)) {
        return true;
      }
      return false;
    }
  }
}
