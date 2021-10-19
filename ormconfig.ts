import { config } from "dotenv";
import { existsSync } from "fs";
import { ConnectionOptions } from "typeorm";
config();

const isDocker = existsSync("/.dockerenv");

const password = process.env.DB_PASSWORD;
const devPassword = process.env.DEV_DB_PASSWORD;

const options: ConnectionOptions[] = [
  {
    name: "default", //dev
    type: "postgres",
    host: isDocker ? "arcabouco-dev-database" : "localhost",
    port: 5432,
    username: "arcabouco",
    password: devPassword,
    database: "arcabouco",
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/database/migrations/*.ts"],
    cli: {
      migrationsDir: "src/database/migrations",
    },
  },
  {
    name: "test-dev",
    type: "postgres",
    host: isDocker ? "arcabouco-dev-database" : "localhost",
    port: 5432,
    username: "arcabouco",
    password: devPassword,
    database: "test",
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/database/migrations/*.ts"],
    cli: {
      migrationsDir: "src/database/migrations",
    },
  },
  {
    name: "prod",
    type: "postgres",
    host: isDocker ? "arcabouco-database" : "localhost",
    port: 5431,
    username: "arcabouco",
    password,
    database: "arcabouco",
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/database/migrations/*.ts"],
    cli: {
      migrationsDir: "src/database/migrations",
    },
  },
  {
    name: "test-prod",
    type: "postgres",
    host: isDocker ? "arcabouco-dev-database" : "localhost",
    port: 5432,
    username: "arcabouco",
    password: devPassword,
    database: "test",
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/database/migrations/*.ts"],
    cli: {
      migrationsDir: "src/database/migrations",
    },
  },
];

export default options;
