const fs = require("fs");
const path = require("path");

(async () => {
  const [fileName, valueType] = process.argv.splice(2);
  if (!fileName) {
    console.log(
      "Please run script with filename such as color or zindex. eg: 'yarn translateLess colors'"
    );
    console.log(
      "If values are number type, please run script such as 'yarn translateLess zindex number'"
    );
    return;
  }
  const lessFile = path.resolve(__dirname, `../src/styles/${fileName}.less`);
  const JsFile = path.resolve(__dirname, `../src/styles/${fileName}.ts`);
  const less = await fs.promises.readFile(lessFile, "utf-8");
  let jsContent = less;
  if (valueType === "number") {
    jsContent = jsContent
      .replace(/@(\w+)\s*:\s*@(.+?)\s*;/g, "export const $1 = $2;")
      .replace(/@(\w+)\s*:\s*(.+?)\s*;/g, "export const $1 = $2;");
  } else {
    jsContent = jsContent
      .replace(/@(\w+)\s*:\s*@(.+?)\s*;/g, "export const $1 = $2;")
      .replace(/@(\w+)\s*:\s*(.+?)\s*;/g, "export const $1 = `$2`;");
  }
  await fs.promises.writeFile(
    JsFile,
    `// 此文件时通过 ${fileName}.less 转换而来（yarn translateLess）\n// 不要手动更改此文件\n${jsContent}`
  );
})();
