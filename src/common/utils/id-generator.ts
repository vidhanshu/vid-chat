const CHARS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export const generateId = (length: number): string => {
  let id = "";
  for (let i = 0; i < length; i++) {
    id += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return id;
};
