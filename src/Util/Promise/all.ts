type all = <T>(promises: Promise<T>[]) => Promise<T[]>;

export const all: all = (promises) => Promise.all(promises);
