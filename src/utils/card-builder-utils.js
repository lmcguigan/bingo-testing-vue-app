import { buildArrayOfRandomNumbers } from "./number-picker-utils";

export const createCellObject = value => {
  const obj = {
    value: value,
    marked: false
  };
  return obj;
};

export const createArrayOfCells = array => array.map(e => createCellObject(e));

export const createBingoCard = n => {
  const numbers = buildArrayOfRandomNumbers(n);
  return createArrayOfCells(numbers);
};
