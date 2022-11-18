import React, { useMemo } from "react";
import { Button, PrimaryButton } from "../../Buttons";
import { IconPlus } from "../../../icons";

interface IButtonProps {
  isPrimary?: boolean;
  text: string;
  action?: () => void;
}

const AddButton = React.memo(({ isPrimary, text, action }: IButtonProps) => {
  const ResultButton = useMemo(
    () => (isPrimary ? PrimaryButton : Button),
    [isPrimary]
  );
  const style = useMemo(
    () => (isPrimary ? { width: "auto", height: 32, padding: 8 } : undefined),
    [isPrimary]
  );
  return (
    <ResultButton prefixEl={<IconPlus />} style={style} onClick={action}>
      {text}
    </ResultButton>
  );
});

export default AddButton;
