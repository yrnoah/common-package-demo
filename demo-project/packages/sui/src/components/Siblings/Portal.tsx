import React from "react";
import { createPortal } from "react-dom";
import usePortal, { rootID } from "./useCreatePortal";

/**
 * @example
 * <Portal id="modal">
 *   <p>Thinking with portals</p>
 * </Portal>
 */
export function Portal({
  id = rootID,
  children,
}: React.PropsWithChildren<{ id?: string }>) {
  const target = usePortal(id);
  return createPortal(children, target);
}

export default Portal;
