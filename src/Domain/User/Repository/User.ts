import { User } from "Database/entities";
import { pipe } from "fp-ts/function";
import * as R from "ramda";
import { FindOneOptions, getRepository } from "typeorm";
import { P } from "Util";

const repository = () => getRepository(User);

type toSafeUser = (user: User) => Omit<User, "password">;

const toSafeUser: toSafeUser = R.omit(["password"]);

export const create = (user: User) =>
  pipe(repository().save(user), R.andThen(toSafeUser));

export const update = (user: Partial<User> & { id: string }) =>
  pipe(
    repository().save(user),
    R.andThen(() => repository().findOneOrFail(user.id)),
    R.andThen(toSafeUser)
  );

export const findOne = (option: FindOneOptions<User>) =>
  pipe(repository().findOne(option));

export const findOneOrFail = (option: FindOneOptions<User>) =>
  repository().findOneOrFail(option);
