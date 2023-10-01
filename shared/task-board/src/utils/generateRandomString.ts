export const generateRandomString = () => {
  const randStr = () => Math.random().toString(36).substring(2, 9);
  return `${randStr()}-${randStr()}-${randStr()}`;
};
