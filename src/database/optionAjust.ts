import { ConnectionOptions } from "typeorm";

type Env = typeof process.env.NODE_ENV;

// type Adjustment = Partial<ConnectionOptions>;

type optionAdjustment = (i: {
  nodeEnv: Env;
  isTest: boolean;
}) => Record<string, string>;

export const optionAdjustment: optionAdjustment = ({ isTest, nodeEnv }) => {
  const notTest = {
    dev: {
      database: "arcabouco",
      host: "arcabouco-dev-database",
      name: "default",
    },
    prod: {
      database: "arcabouco",
      host: "arcabouco-database",
      name: "default",
    },
  };

  const test = {
    dev: {
      host: "localhost",
      database: "test",
      name: "default",
    },
    prod: {
      database: "test",
      host: "arcabouco-dev-database",
      name: "default",
    },
  };

  return isTest ? test[nodeEnv] : notTest[nodeEnv];
};
