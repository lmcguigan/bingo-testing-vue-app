export const getRandomNumber = () => {
  const min = 1;
  const max = 75;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const buildArrayOfRandomNumbers = n => {
  const sqaure = Math.pow(n, 2);
  const array = [];
  for (let i = 0; i < sqaure; i++) {
    array.push(getRandomNumber());
  }
  return array;
};
