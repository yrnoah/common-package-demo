import { useRef } from "react";

function useCurrent<T>(value: T) {
  const valueRef = useRef(value);

  valueRef.current = value;

  return valueRef;
}

export default useCurrent;
