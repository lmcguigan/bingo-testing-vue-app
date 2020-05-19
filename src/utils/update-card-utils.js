export const getUpdatedCard = (index, array) => {
  const copy = [...array];
  const newObj = {
    value: copy[index].value,
    marked: !copy[index].marked
  };
  copy[index] = newObj;
  return copy;
};
