export const isKeyEnter = (e: React.KeyboardEvent) =>
  e?.keyCode === 13 || e?.key === "Enter";
export const isKeyLowercaseE = (e: React.KeyboardEvent) =>
  e?.keyCode === 69 || e?.key === "e";
export const isKeyMinus = (e: React.KeyboardEvent) =>
  e?.keyCode === 189 || e?.key === "-";
export const isKeyDot = (e: React.KeyboardEvent) =>
  e?.keyCode === 190 || e?.key === ".";
