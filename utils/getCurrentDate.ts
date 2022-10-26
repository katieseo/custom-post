export const getCurrentDate = () => {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear().toString().slice(2);

  let currentDate = `${month}.${day}.${year}`;

  return currentDate;
};
