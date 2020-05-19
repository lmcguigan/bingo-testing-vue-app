import { BingoValidator } from "../../src/utils/check-bingo-utils";

//vertical === |
//horizontal === ----

// indices of all the cells in a bingo card:
// _____ _____ _____ _____ _____
//|  0  |  1  |  2  |  3  |  4  |
// _____ _____ _____ _____ _____
//|  5  |  6  |  7  |  8  |  9  |
// _____ _____ _____ _____ _____
//|  10 |  11 |  12 |  13 |  14 |
// _____ _____ _____ _____ _____
//|  15 |  16 |  17 |  18 |  19 |
// _____ _____ _____ _____ _____
//|  20 |  21 |  22 |  23 |  24 |
// _____ _____ _____ _____ _____

describe("Testing methods that build line indexes for comparison", () => {
  const validator = new BingoValidator(5);
  describe("Testing the methods that build single lines", () => {
    it("should build a vertical line as multiples of n plus the index passed in as the second param", () => {
      expect(validator.getVerticalLine(5, 0)).toEqual([0, 5, 10, 15, 20]);
      expect(validator.getVerticalLine(5, 1)).toEqual([1, 6, 11, 16, 21]);
      expect(validator.getVerticalLine(3, 0)).toEqual([0, 3, 6]);
      expect(validator.getVerticalLine(3, 1)).toEqual([1, 4, 7]);
      expect(validator.getVerticalLine(3, 2)).toEqual([2, 5, 8]);
    });
    it("should build a horizontal line as a range of length n, starting at the value passed in as the second param", () => {
      expect(validator.getHorizontalLine(5, 0)).toEqual([0, 1, 2, 3, 4]);
      expect(validator.getHorizontalLine(5, 5)).toEqual([5, 6, 7, 8, 9]);
      expect(validator.getHorizontalLine(5, 10)).toEqual([10, 11, 12, 13, 14]);
      expect(validator.getHorizontalLine(3, 0)).toEqual([0, 1, 2]);
    });
  });
  describe("Testing the methods that build arrays of lines", () => {
    it("should build an array of n correct vertical line arrays, each with length n", () => {
      const verticalLines = validator.getVerticalLines(5);
      expect(verticalLines).toHaveLength(5);
      expect(verticalLines.every(line => line.length === 5)).toBeTruthy();
      expect(verticalLines).toContainEqual([0, 5, 10, 15, 20]);
      expect(verticalLines).toContainEqual([1, 6, 11, 16, 21]);
      expect(verticalLines).toContainEqual([2, 7, 12, 17, 22]);
      expect(verticalLines).toContainEqual([3, 8, 13, 18, 23]);
      expect(verticalLines).toContainEqual([4, 9, 14, 19, 24]);
    });
    it("should build an an array of n correct horizontal line arrays, each with length n, starting at (0 + a multiple of n) and ending at (a multiple of n) minus 1", () => {
      const horizontalLines = validator.getHorizontalLines(5);
      expect(horizontalLines).toHaveLength(5);
      expect(horizontalLines.every(line => line.length === 5)).toBeTruthy();
      expect(horizontalLines).toContainEqual([0, 1, 2, 3, 4]);
      expect(horizontalLines).toEqual([
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24]
      ]);
    });
    it("should build an array of 2 correct vertical lines", () => {
      const diagonalLines = validator.getDiagonalLines(5);
      expect(diagonalLines).toHaveLength(2);
      expect(diagonalLines).toContainEqual([0, 6, 12, 18, 24]);
      expect(diagonalLines).toEqual([
        [0, 6, 12, 18, 24],
        [4, 8, 12, 16, 20]
      ]);
    });
  });
});

describe("Testing the constructor", () => {
  const bingoCardValidator = new BingoValidator(5);
  it("should have all the correct properties", () => {
    expect(bingoCardValidator).toHaveProperty("diagonalLines");
  });
  it("should throw an error if we try to use a number for n that is even", () => {
    function get4by4CardValidator() {
      return new BingoValidator(4);
    }
    expect(get4by4CardValidator).toThrow();
  });
  it("should contain the correct diagonal line matches in the diagonal lines property array", () => {
    const diagonals = bingoCardValidator.diagonalLines;
    expect(diagonals).toHaveLength(2);
    expect(diagonals).toContainEqual([0, 6, 12, 18, 24]);
    expect(diagonals).toContainEqual([4, 8, 12, 16, 20]);
  });
  it("should contain the correct vertical line matches in the vertical lines property array", () => {
    const verticals = bingoCardValidator.verticalLines;
    expect(verticals).toHaveLength(5);
    expect(verticals).toContainEqual([4, 9, 14, 19, 24]);
  });
  it("should contain the correct horizontal line matches in the horizontal lines property array", () => {
    const horizontals = bingoCardValidator.horizontalLines;
    expect(horizontals).toHaveLength(5);
    expect(horizontals).toContainEqual([20, 21, 22, 23, 24]);
  });
});
describe("Testing the validations line by line", () => {
  const validator = new BingoValidator(5);
  it("should correctly determine if the array of marked values is a match for a line", () => {
    expect(validator.hasLine([1, 7, 13, 19], [1, 6, 11, 16, 21])).toBeFalsy();
  });
  it("should correctly identify when the card has a diagonal line", () => {
    expect(
      validator.hasLineMatchForOrientation(
        [1, 7, 13, 19],
        validator.diagonalLines
      )
    ).toBeFalsy();
  });
  it("should correctly identify when the card has a vertical line", () => {
    expect(
      validator.hasLineMatchForOrientation(
        [1, 3, 7, 13, 18, 19, 23],
        validator.verticalLines
      )
    ).toBeFalsy();
    expect(
      validator.hasLineMatchForOrientation(
        [1, 3, 7, 8, 13, 18, 19, 23],
        validator.verticalLines
      )
    ).toBeTruthy();
  });
  it("should correctly identify when the card has a horizontal line", () => {
    expect(
      validator.hasLineMatchForOrientation(
        [1, 7, 9, 16, 17, 18, 19, 22],
        validator.horizontalLines
      )
    ).toBeFalsy();
    expect(
      validator.hasLineMatchForOrientation(
        [1, 7, 9, 15, 16, 17, 18, 19, 22],
        validator.horizontalLines
      )
    ).toBeTruthy();
  });
});
describe("Testing the method that determines if we have bingo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const validator = new BingoValidator(5);
  const lineMatchSpy = jest.spyOn(validator, "hasLineMatchForOrientation");
  const card = [
    { value: 21, marked: false },
    { value: 68, marked: false },
    { value: 10, marked: false },
    { value: 39, marked: true },
    { value: 54, marked: true },
    { value: 46, marked: false },
    { value: 15, marked: false },
    { value: 35, marked: false },
    { value: 45, marked: false },
    { value: 13, marked: false },
    { value: 56, marked: false },
    { value: 56, marked: false },
    { value: 75, marked: false },
    { value: 44, marked: false },
    { value: 73, marked: false },
    { value: 12, marked: false },
    { value: 56, marked: false },
    { value: 67, marked: false },
    { value: 72, marked: false },
    { value: 37, marked: false },
    { value: 56, marked: false },
    { value: 71, marked: false },
    { value: 6, marked: false },
    { value: 20, marked: false },
    { value: 57, marked: false }
  ];
  const cardWithDiagonalMatch = [
    { value: 70, marked: false },
    { value: 18, marked: false },
    { value: 69, marked: true },
    { value: 30, marked: false },
    { value: 32, marked: true },
    { value: 29, marked: false },
    { value: 46, marked: false },
    { value: 17, marked: false },
    { value: 22, marked: true },
    { value: 23, marked: false },
    { value: 69, marked: false },
    { value: 36, marked: true },
    { value: 65, marked: true },
    { value: 1, marked: true },
    { value: 2, marked: false },
    { value: 20, marked: false },
    { value: 41, marked: true },
    { value: 10, marked: false },
    { value: 12, marked: false },
    { value: 12, marked: true },
    { value: 43, marked: true },
    { value: 5, marked: false },
    { value: 1, marked: false },
    { value: 1, marked: false },
    { value: 51, marked: false }
  ];
  const cardWithVertMatch = [
    { value: 21, marked: false },
    { value: 32, marked: false },
    { value: 73, marked: false },
    { value: 69, marked: false },
    { value: 57, marked: true },
    { value: 17, marked: false },
    { value: 19, marked: false },
    { value: 42, marked: false },
    { value: 68, marked: false },
    { value: 38, marked: true },
    { value: 27, marked: false },
    { value: 40, marked: false },
    { value: 30, marked: false },
    { value: 11, marked: false },
    { value: 67, marked: true },
    { value: 47, marked: false },
    { value: 58, marked: false },
    { value: 45, marked: false },
    { value: 6, marked: false },
    { value: 6, marked: true },
    { value: 40, marked: false },
    { value: 73, marked: false },
    { value: 70, marked: false },
    { value: 63, marked: false },
    { value: 9, marked: true }
  ];
  const cardWithHorizontalMatch = [
    { value: 42, marked: false },
    { value: 58, marked: false },
    { value: 47, marked: false },
    { value: 49, marked: false },
    { value: 66, marked: false },
    { value: 15, marked: false },
    { value: 69, marked: false },
    { value: 5, marked: false },
    { value: 48, marked: true },
    { value: 17, marked: false },
    { value: 74, marked: true },
    { value: 2, marked: true },
    { value: 17, marked: true },
    { value: 74, marked: true },
    { value: 42, marked: true },
    { value: 43, marked: false },
    { value: 2, marked: false },
    { value: 72, marked: false },
    { value: 24, marked: false },
    { value: 60, marked: false },
    { value: 62, marked: false },
    { value: 4, marked: false },
    { value: 52, marked: false },
    { value: 61, marked: false },
    { value: 73, marked: false }
  ];
  const cardWithNoMatches = [
    { value: 54, marked: false },
    { value: 59, marked: true },
    { value: 13, marked: true },
    { value: 49, marked: true },
    { value: 41, marked: true },
    { value: 2, marked: true },
    { value: 22, marked: true },
    { value: 29, marked: false },
    { value: 59, marked: true },
    { value: 16, marked: false },
    { value: 58, marked: false },
    { value: 26, marked: false },
    { value: 17, marked: true },
    { value: 69, marked: false },
    { value: 61, marked: true },
    { value: 56, marked: true },
    { value: 17, marked: false },
    { value: 9, marked: true },
    { value: 58, marked: true },
    { value: 12, marked: false },
    { value: 28, marked: false },
    { value: 20, marked: true },
    { value: 20, marked: true },
    { value: 71, marked: true },
    { value: 23, marked: true }
  ];

  it("should return false if we have less than 5 marked cells", () => {
    expect(validator.hasBingo(card)).toBeFalsy();
    expect(lineMatchSpy).toHaveBeenCalledTimes(0);
  });
  it("should stop checking if we identify a diagonal match", () => {
    expect(validator.hasBingo(cardWithDiagonalMatch)).toBeTruthy();
    expect(lineMatchSpy).toHaveBeenCalledTimes(1);
    const marked = validator.getMarkedItemIndexes(cardWithDiagonalMatch);
    expect(lineMatchSpy).toHaveBeenCalledWith(marked, validator.diagonalLines);
    expect(lineMatchSpy).toHaveReturnedWith(true);
  });
  it("should continue by next checking vertical matches if we do not find a diagonal match", () => {
    expect(validator.hasBingo(cardWithVertMatch)).toBeTruthy();
    expect(lineMatchSpy).toHaveBeenCalledTimes(2);
    expect(lineMatchSpy).toHaveBeenLastCalledWith(
      validator.getMarkedItemIndexes(cardWithVertMatch),
      validator.verticalLines
    );
    expect(lineMatchSpy).toHaveLastReturnedWith(true);
  });
  it("should check for horizontal matches after checking diagnoal and vertical and not finding any matches", () => {
    expect(validator.hasBingo(cardWithHorizontalMatch)).toBeTruthy();
    expect(lineMatchSpy).toHaveBeenCalledTimes(3);
    expect(lineMatchSpy).toHaveLastReturnedWith(true);
  });
  it("should return false if there are no diagonal, vertical, or horizontal matches", () => {
    expect(validator.hasBingo(cardWithNoMatches)).toBeFalsy();
    expect(lineMatchSpy).toHaveBeenCalledTimes(3);
    expect(lineMatchSpy).toHaveLastReturnedWith(false);
  });
});
