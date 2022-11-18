import { useState, useCallback } from "react";
import { createContainer } from "unstated-next";
import { defaultDuration } from "../Modal/Modal";
import Dialogue from ".";
import type { ISuiDialogueProps } from "./typing";

export interface IDialogueItem extends Omit<ISuiDialogueProps, "open"> {
  _id: string;
  _open?: boolean;
}

let index = 0;
const generateDialogueID = () => `suiDialogue${++index}`;

const container = createContainer(() => {
  const [dialogues, setDialogues] = useState<IDialogueItem[]>([]);
  const showDialogue = useCallback(
    (args: ISuiDialogueProps): { id: string; dismiss: () => void } => {
      const id = generateDialogueID();
      const dismiss = () => {
        if (args.duration === 0) {
          setDialogues((v) => v.filter((i) => i._id !== id));
          return;
        }
        setDialogues((v) =>
          v.map((i) => {
            if (i._id === id) i._open = false;
            return i;
          })
        );
        setTimeout(() => {
          setDialogues((v) => v.filter((i) => i._id !== id));
        }, args.duration || defaultDuration);
      };
      const _handleOk = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined
      ) => {
        if (args.handleOk) args.handleOk(event, dismiss);
      };
      setDialogues((v) => [
        ...v,
        {
          ...args,
          _id: id,
          _open: true,
          handleCancel: dismiss,
          handleOk: _handleOk,
        },
      ]);
      return { id, dismiss };
    },
    []
  );
  const clearAll = useCallback(() => setDialogues([]), []);
  return { dialogues, clearAll, showDialogue };
});

export const SuiDialogueProvider = container.Provider;
export const useDialogue = container.useContainer;
export default container;

export function SuiDialogueLayer() {
  const { dialogues } = useDialogue();
  return (
    <>
      {dialogues.map(({ _id, _open, ...rest }) => (
        <Dialogue {...rest} open={_open} key={_id} />
      ))}
    </>
  );
}
