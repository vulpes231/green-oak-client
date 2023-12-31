export const generateRandomHash = () => {
  const letters = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let rand = "";

  for (let i = 0; i < 8; i++) {
    rand += letters[Math.floor(Math.random() * letters.length)];
  }

  return rand;
};
