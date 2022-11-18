export function textAreaAnimationUpdate(
  element: EventTarget & HTMLTextAreaElement
) {
  element.style.height = "auto";
  element.style.height = element.scrollHeight + "px";
}
