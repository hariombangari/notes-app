export const promisify = (fn) => {
  return new Promise(fn);
};

export const wait = (ms) => {
  return promisify((resolve) => {
    setTimeout(resolve, ms);
  });
};
