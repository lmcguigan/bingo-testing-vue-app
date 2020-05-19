import {
  createCellObject,
  createArrayOfCells,
  createBingoCard
} from "../../src/utils/card-builder-utils";
import * as NumberPickeerModule from "../../src/utils/number-picker-utils";

describe("Testing building the Bingo card", () => {
  describe("Testing the method that creates an object for the cell", () => {
    it("should create an object with a value property that reflects the value passed in and a marked property with value false", () => {
      expect(createCellObject(4)).toEqual({ value: 4, marked: false });
      expect(createCellObject("green")).toEqual({
        value: "green",
        marked: false
      });
    });
  });
  describe("Testing the method that creates an array of cells", () => {
    it("should map the values of the array passed in to cell objects", () => {
      expect(createArrayOfCells([1, 2, 3])).toEqual([
        { value: 1, marked: false },
        { value: 2, marked: false },
        { value: 3, marked: false }
      ]);
    });
  });
  describe("Testing the method that builds a card", () => {
    it("should create a bingo card where any element in the array has a value between 1 and 75 and has a marked property of false", () => {
      const card = createBingoCard(5);
      expect(card).toHaveLength(25);
      const firstCellInCard = card[0];
      expect(firstCellInCard).toHaveProperty("value");
      expect(firstCellInCard).toHaveProperty("marked");
      expect(firstCellInCard.value).toBeGreaterThan(0);
      expect(firstCellInCard.value).toBeLessThan(75);
      expect(firstCellInCard.marked).toBeFalsy();
      expect(card.every(cell => cell.value <= 75)).toBeTruthy();
    });
    it("should call the method that builds an array of random numbers with the value we pass in for n", () => {
      const numberPickerSpy = jest.spyOn(
        NumberPickeerModule,
        "buildArrayOfRandomNumbers"
      );
      createBingoCard(5);
      expect(numberPickerSpy).toHaveBeenCalledWith(5);
    });
  });
});
