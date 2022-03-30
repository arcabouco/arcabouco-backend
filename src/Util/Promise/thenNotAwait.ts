export type thenNotAwait = <A>(
  onSuccess: (a: A) => any
) => (promise: Promise<A>) => Promise<A>;

export const thenNotAwait: thenNotAwait = (onSuccess) => (promise) =>
  promise.then((a) => {
    onSuccess(a);
    return promise;
  });
