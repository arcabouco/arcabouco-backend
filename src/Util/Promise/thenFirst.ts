export type thenFirst = <A>(
  onSuccess: (a: A) => any
) => (promise: Promise<A>) => Promise<A>;

export const thenFirst: thenFirst = (onSuccess) => (promise) =>
  promise.then(async (a) => {
    await onSuccess(a);
    return promise;
  });
