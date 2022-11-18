const utils = <T>(resolveValue: T, rejectReason?: any) => {
  let resolveFn: Function | undefined;
  let rejectFn: Function | undefined;
  const promise = new Promise<T>((resolve, reject) => {
    resolveFn = resolve;
    rejectFn = reject;
  });
  const resolver = () => {
    resolveFn && resolveFn(resolveValue);
  };
  const rejector = () => {
    rejectFn && rejectFn(rejectReason);
  };

  return {
    promise,
    resolver,
    rejector,
  };
};

export default utils;
