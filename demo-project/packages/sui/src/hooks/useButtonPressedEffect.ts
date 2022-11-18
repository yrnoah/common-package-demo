import { useState, useCallback, useEffect } from "react";

function useButtonPressedEffect() {
  const [pressed, setPressed] = useState("");
  const onMouseDown = useCallback(() => setPressed("true"), []);
  const onMouseUp = useCallback(() => setPressed(""), []);
  useEffect(() => {
    return () => onMouseUp();
  }, [onMouseUp]);

  return {
    pressed,
    onMouseDown,
    onMouseUp,
  };
}

export default useButtonPressedEffect;
