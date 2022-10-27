export const getReadingTime = (wordsLength: number) => {
  const wordsPerMinute = 225;
  let result;

  if (wordsLength > 0) {
    let value = Math.ceil(wordsLength / wordsPerMinute);
    result = `~${value}`;
  }

  return result;
};
