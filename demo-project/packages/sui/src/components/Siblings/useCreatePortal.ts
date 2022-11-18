import { useRef, useEffect } from "react";
import { rootPortalID } from "./portalID";

export const rootID = rootPortalID;

function createRootElement(id: string) {
  const rootContainer = document.createElement("div");
  rootContainer.setAttribute("id", id);
  rootContainer.setAttribute("data-id", id);
  return rootContainer;
}

function addRootElement(rootElem: Node) {
  document.body.insertBefore(
    rootElem,
    document.body.lastElementChild!.nextElementSibling
  );
}

function usePortal(id: string = rootID) {
  const rootElemRef = useRef<HTMLDivElement | null>(null);

  useEffect(
    function setupElement() {
      const rootEL = rootElemRef.current;
      if (!rootEL) return;
      if (!id) return;
      // Look for existing target dom element to append to
      const existingParent =
        document.querySelector(`#${id}`) ||
        document.querySelector(`[data-id="${id}"]`);
      // Parent is either a new root or the existing dom element
      const parentElem = existingParent || createRootElement(id);

      // If there is no existing DOM element, add a new one.
      if (!existingParent) addRootElement(parentElem);

      // Add the detached element to the parent
      parentElem.appendChild(rootEL);

      return function removeElement() {
        rootEL.remove();
        if (!parentElem.childElementCount) {
          parentElem.remove();
        }
      };
    },
    [id]
  );

  /**
   * It's important we evaluate this lazily:
   * - We need first render to contain the DOM element, so it shouldn't happen
   *   in useEffect. We would normally put this in the constructor().
   * - We can't do 'const rootElemRef = useRef(document.createElement('div))',
   *   since this will run every single render (that's a lot).
   * - We want the ref to consistently point to the same DOM element and only
   *   ever run once.
   * @link https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
   */
  function getRootElem() {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement("div");
    }
    return rootElemRef.current;
  }

  return getRootElem();
}

export default usePortal;
