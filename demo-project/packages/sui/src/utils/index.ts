import React from "react";

export function toFixed(num: number, precision: number) {
  // 修复js toFixed精度bug
  return (+(Math.round(+(num + "e" + precision)) + "e" + -precision)).toFixed(
    precision
  );
}

export function formatCount(
  amount: string | number,
  decimalCount = 2,
  decimal = ".",
  thousands = ","
) {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)),
      10
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(parseFloat(amount) - parseInt(i, 10))
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
    return "-";
  }
}

type KeyFn = (item: any) => string;

const defaultKeyFn: KeyFn = (item) => item.id;

export const toObject = (array: any[], keyFn: KeyFn = defaultKeyFn) =>
  array.reduce((acc: any, val: any) => ({ ...acc, [keyFn(val)]: val }), {});

export const attachProps = (children?: React.ReactNode, props?: object) => {
  if (!children || !props) return children;
  if (children instanceof Array) {
    return children.map((child) => {
      if (React.isValidElement(child)) return React.cloneElement(child, props);
      return child;
    });
  }
  if (React.isValidElement(children))
    return React.cloneElement(children, props);
  return children;
};

export const stripParams = (
  params: Record<string, any>,
  strips = ["", null]
) => {
  const result: Record<string, any> = {};
  Object.keys(params).forEach((key) => {
    if (!strips.includes(params[key])) {
      result[key] = params[key];
    }
  });
  return result;
};

export const joinUrl = (...paths: string[]) => {
  if (!paths.length) return "";
  return paths.join("/").replace(/\/\//g, "/");
};
