export const capitalizeFirstLetter = (sentence) => {
  return sentence.replace(/\b\w/g, (char) => char.toUpperCase());
}

