import { getUpdatedCard } from "../../src/utils/update-card-utils";

describe("Testing the method that updates the bingo card", () => {
  it("should toggle the marked property of the element in the array whose index matches the index we pass in", () => {
    expect(getUpdatedCard(0, [{ value: 1, marked: false }])).toEqual([
      { value: 1, marked: true }
    ]);
  });
});
