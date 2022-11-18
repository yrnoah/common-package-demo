// export const PhoneReg = new RegExp("^+[1-9]d{1,14}$");

export const SpicalCharacterReg = new RegExp("^[^!！^]+$"); // ！/!/^
export const OnlyAlphabetAndNumberReg = new RegExp("^[a-zA-Z0-9]+$"); // /^[a-zA-Z0-9]+$/
// eslint-disable-next-line no-control-regex
export const EmailReg = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+"); // [^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+
// eslint-disable-next-line no-control-regex
export const PositiveIntegerReg = new RegExp("[1-9][0-9]+");
