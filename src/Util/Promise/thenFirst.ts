type PromiseReturnType<T> = T extends Promise<infer Return> ? Return : T;

export type thenFirst = <A>(
  onSuccess: (a: A) => any
) => (promise: Promise<A>) => Promise<A>;

export const thenFirst: thenFirst = (onSuccess) => (promise) =>
  promise.then(async (t) => {
    await onSuccess(t);
    return promise;
  });
