export const stopPropagation = (e: React.MouseEvent) => {
  if (!e) return;
  e.stopPropagation();
};

export const preventDefault = (e: React.MouseEvent) => {
  if (!e) return;
  e.preventDefault();
};

export const preventDefaultAndPropagation = (e: React.MouseEvent) => {
  stopPropagation(e);
  preventDefault(e);
};

export const DefaultFunc = () => null;
