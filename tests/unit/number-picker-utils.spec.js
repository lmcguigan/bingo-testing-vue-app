import { getRandomNumber } from "../../src/utils/number-picker-utils";

describe("Testing the method that generates a random number", () => {
  it("should return a number that is greater than 1 and less than or equal to 75", () => {
    const number = getRandomNumber();
    expect(number).toBeGreaterThan(0);
    expect(number).toBeLessThan(76);
  });
});
